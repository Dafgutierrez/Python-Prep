// Newsletter cover 1920 x 1080, ES and EN, with the premium kit (atmosphere, gradient title, name). Real figures only, with source.
const { chromium } = require('playwright'); const path = require('path');
const { css, atmos, C } = require('../kit-visual/componentes.cjs');
const COVERS = [
  { file: 'portada-es.png', k: 'NEWSLETTER · 6 NOV 2026', t1: 'La IA te mete en la lista.', t2: 'No te cierra la venta.', stat: '60%', statL: 'eligió una marca que no tenía en mente por una recomendación de IA', src: 'Encuesta de Amperity a 1,000 consumidores de EE. UU., mayo de 2026.' },
  { file: 'portada-en.png', k: 'NEWSLETTER · NOV 6, 2026', t1: 'AI gets you on the shortlist.', t2: 'It doesn’t close the sale.', stat: '60%', statL: 'chose a brand they hadn’t considered because of an AI recommendation', src: 'Amperity survey of 1,000 US consumers, May 2026.' },
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const c of COVERS) {
    const html = `<!doctype html><meta charset="utf-8"><style>${css()}
      .cv{width:1920px;height:1080px;background:${C.bg};color:${C.ink};font-family:Inter,sans-serif;position:relative;overflow:hidden}
      .cv .g1{width:2200px;height:2200px;left:-700px;top:-900px}.cv .atm{transform:scale(1.5);transform-origin:top right;right:-120px!important;top:-120px!important}
      .in{position:absolute;inset:0;padding:120px 140px;display:flex;flex-direction:column;justify-content:space-between}
    </style><div class="cv"><div class="g1"></div><div class="g2"></div>${atmos()}<div class="in">
      <div><span class="k">${c.k}</span>
      <h1 style="font-size:124px;margin-top:56px;max-width:1500px">${c.t1}<br><span class="rp">${c.t2}</span></h1></div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:60px">
        <div style="display:flex;align-items:center;gap:36px;max-width:1200px"><span style="font-size:150px;font-weight:700;letter-spacing:-.05em;line-height:.9" class="rp">${c.stat}</span>
          <div><div class="lead" style="font-size:40px;color:${C.strong};font-weight:600">${c.statL}</div><div class="src" style="margin-top:10px">${c.src}</div></div></div>
        <div style="font-size:30px;font-weight:600;color:${C.mute};letter-spacing:.04em;white-space:nowrap">Dafne Gutiérrez</div></div>
    </div></div>`;
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, c.file) });
  }
  await b.close(); console.log('ok');
})();
