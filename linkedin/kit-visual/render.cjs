// Renderiza un módulo de láminas a PDF + PNG y corre chequeos automáticos (desborde, margen, espacio muerto).
// Uso: NODE_PATH=$(npm root -g) FONT_DIR=<carpeta con inter-latin-{400,600,700}-normal.woff2> node render.cjs ejemplo-datos-reales.cjs
// El módulo exporta { file, slides: [html, ...] } con las funciones de componentes.cjs.
const fs = require('fs'); const path = require('path'); const { chromium } = require('playwright');
const { css } = require('./componentes.cjs');
(async () => {
  const mod = require(path.resolve(process.argv[2]));
  const name = mod.file + (process.env.THEME === 'light' ? '-claro' : ''); const out = path.join(__dirname, 'salida', name); fs.mkdirSync(out, { recursive: true });
  const html = `<!doctype html><meta charset="utf-8"><style>${css()}</style>${mod.slides.join('')}`;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready);
  const issues = await p.evaluate(() => [...document.querySelectorAll('.pg')].flatMap((pg, i) => {
    const o = []; const r0 = pg.getBoundingClientRect(); const w = pg.querySelector('.w'); const prog = pg.querySelector('.prog');
    let bottom = 0;
    for (const e of w.querySelectorAll('*')) {
      if (prog && prog.contains(e)) continue;
      const r = e.getBoundingClientRect(); if (!r.width || !r.height) continue;
      if (r.right - r0.left > 1080 - 88 + 2 && !e.closest('.g1,.g2')) o.push(`lámina ${i + 1}: «${(e.textContent || e.tagName).trim().slice(0, 40)}» se sale del margen derecho`);
      if (e.children.length === 0 && (e.scrollWidth > e.clientWidth + 1)) o.push(`lámina ${i + 1}: texto cortado «${e.textContent.trim().slice(0, 40)}»`);
      bottom = Math.max(bottom, r.bottom - r0.top);
    }
    const lim = prog.getBoundingClientRect().top - r0.top;
    if (bottom > lim) o.push(`lámina ${i + 1}: contenido invade la barra de avance (${Math.round(bottom)} > ${Math.round(lim)})`);
    const body = pg.querySelector('.body'); const kids = [...body.children]; const last = kids[kids.length - 1].getBoundingClientRect();
    const gap = prog.getBoundingClientRect().top - last.bottom - 32;
    if (gap > 150) o.push(`lámina ${i + 1}: espacio muerto de ${Math.round(gap)} px antes de la barra de avance`);
    return o;
  }));
  const pages = await p.$$('.pg');
  for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: path.join(out, `lamina-${String(i + 1).padStart(2, '0')}.png`) });
  // PDF seguro para visores móviles (iPhone): el degradado recortado al texto sale como bloques de color y la sombra difusa como un rectángulo.
  // En el PDF el acento va en color sólido y las tarjetas sin sombra; los PNG conservan el degradado.
  await p.addStyleTag({ content: `.rp{background:none !important;-webkit-background-clip:border-box !important;background-clip:border-box !important;-webkit-text-fill-color:currentColor !important;color:${require('./componentes.cjs').C.lilac} !important}.card{box-shadow:none !important}` });
  await p.pdf({ path: path.join(out, name + '.pdf'), width: '1080px', height: '1350px', printBackground: true });
  await b.close();
  console.log(issues.length ? 'REVISAR:\n' + issues.join('\n') : 'Chequeos automáticos: sin problemas');
  console.log('Salida:', out);
})();
