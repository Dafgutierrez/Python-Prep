// LinkedIn newsletter cover 1920 x 1080 for the Buen Fin newsletter. Photo supplied by the owner, as a card; kit tokens; name only.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { css, C } = require('../kit-visual/componentes.cjs');
const IMG = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, 'foto.webp')).toString('base64');
const COVERS = [
  { file: 'portada-buen-fin-a.png', t1: 'El Buen Fin ya no se gana en Google.', t2: 'Se gana en la respuesta de la IA.' },
  { fs: 72, file: 'portada-buen-fin-b.png', t1: 'El Buen Fin ya no se gana solo en Google.', t2: 'También se gana en la respuesta de la IA.' },
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.setContent(`<img id=i src="${IMG}" style="position:absolute">`); await p.waitForFunction(() => document.getElementById('i').complete);
  const nat = await p.evaluate(() => [document.getElementById('i').naturalWidth, document.getElementById('i').naturalHeight]); console.log('photo', nat);
  const CH = 900, scale = CH / nat[1], CW = 980, shift = Math.round(330 * (nat[0] / 1920) * scale / (nat[0] / 1920) / 1);   // window starts at x = 330 of a 1920-wide photo
  const offset = Math.round(330 * (nat[0] / 1920) * scale);
  for (const c of COVERS) {
    const html = `<!doctype html><meta charset="utf-8"><style>${css()}
      .cv{width:1920px;height:1080px;background:${C.bg};color:${C.ink};font-family:Inter,sans-serif;position:relative;overflow:hidden}
      .g1{width:2000px;height:2000px;left:-700px;top:-900px}.glow2{position:absolute;right:-400px;bottom:-700px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.18) 0%,rgba(184,155,255,0) 62%)}
      .tx{position:absolute;left:110px;top:210px;width:720px}
      h1{font-size:${c.fs || 78}px;line-height:1.06;letter-spacing:-.045em;margin:34px 0 0}
      .card{position:absolute;right:90px;top:90px;width:${CW}px;height:${CH}px;border-radius:40px;overflow:hidden;border:2px solid ${C.hair};box-shadow:0 30px 80px rgba(0,0,0,.5)}
      .card img{position:absolute;height:${CH}px;width:auto;left:-${offset}px;top:0}
      .by{position:absolute;left:110px;bottom:90px;font-size:30px;font-weight:600;color:${C.mute};letter-spacing:.04em}
    </style><div class="cv"><div class="g1"></div><div class="glow2"></div>
      <div class="tx"><span class="k">NEWSLETTER · BUEN FIN 2026</span><h1>${c.t1}<br><span class="rp">${c.t2}</span></h1></div>
      <div class="card"><img src="${IMG}"></div><div class="by">Dafne Gutiérrez</div></div>`;
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, c.file) });
  }
  await b.close(); console.log('ok');
})();
