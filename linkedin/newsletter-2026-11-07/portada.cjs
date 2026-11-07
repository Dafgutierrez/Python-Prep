// LinkedIn newsletter cover 1920 x 1080 with the supplied illustration (rocket, Earth-to-Mars arc). Kit premium: gradient title, byline.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { css, C } = require('../kit-visual/componentes.cjs');
const IMG = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, 'ilustracion.webp')).toString('base64');
const COVERS = [
  { file: 'portada-en.png', k: 'NEWSLETTER · NOV 7, 2026', t1: 'The Last Question', t2: 'Is Still Unanswered', sub: 'And that is the point.' },
  { file: 'portada-es.png', k: 'NEWSLETTER · 7 NOV 2026', t1: 'La última pregunta', t2: 'sigue sin respuesta', sub: 'Y ese es el punto.' },
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  // sample the sky color of the illustration so the background melts into it
  await p.setContent(`<img id="i" src="${IMG}">`); await p.waitForFunction(() => document.getElementById('i').complete);
  const sky = await p.evaluate(() => { const i = document.getElementById('i'); const c = document.createElement('canvas'); c.width = i.naturalWidth; c.height = i.naturalHeight; const x = c.getContext('2d'); x.drawImage(i, 0, 0);
    const avg = (a, bb, w, h) => { const d = x.getImageData(a, bb, w, h).data; let r = 0, g = 0, bl = 0, n = d.length / 4; for (let k = 0; k < d.length; k += 4) { r += d[k]; g += d[k + 1]; bl += d[k + 2]; } return [r / n, g / n, bl / n].map(Math.round); };
    return { w: i.naturalWidth, h: i.naturalHeight, tl: avg(0, 0, 300, 40), tr: avg(c.width - 300, 0, 300, 40) }; });
  console.log('sky', JSON.stringify(sky));
  const rgb = (a) => `rgb(${a.join(',')})`; const BG = rgb(sky.tl);
  for (const c of COVERS) {
    const H = Math.round(1920 * sky.h / sky.w);   // illustration scaled to full width
    const html = `<!doctype html><meta charset="utf-8"><style>${css()}
      .cv{width:1920px;height:1080px;background:${BG};color:${C.ink};font-family:Inter,sans-serif;position:relative;overflow:hidden}
      .ill{position:absolute;left:0;bottom:0;width:1920px;height:${H}px;background:url(${IMG}) center/100% 100% no-repeat}
      .fade{position:absolute;left:0;top:0;width:1920px;height:430px;background:linear-gradient(180deg,${BG} 0%,${BG}34%,rgba(0,0,0,0) 100%)}
      .glow{position:absolute;left:-300px;top:-500px;width:1500px;height:1100px;background:radial-gradient(closest-side,rgba(110,70,200,.38),rgba(110,70,200,0));}
      .tx{position:absolute;left:120px;top:56px}
      h1{font-size:104px;line-height:1.02;letter-spacing:-.045em;margin:34px 0 0;text-shadow:0 2px 30px rgba(0,0,0,.45)}
      .sub{position:absolute;right:120px;top:240px;text-align:right;font-size:44px;font-weight:600;color:#e4e0f0;letter-spacing:-.01em;text-shadow:0 2px 20px rgba(0,0,0,.6)}
      .by{position:absolute;right:120px;top:74px;font-size:30px;font-weight:600;color:#cfcade;letter-spacing:.04em;text-shadow:0 2px 16px rgba(0,0,0,.6)}
    </style><div class="cv"><div class="ill"></div><div class="fade"></div><div class="glow"></div>
      <div class="tx"><span class="k">${c.k}</span><h1>${c.t1}<br><span class="rp">${c.t2}</span></h1></div><div class="sub">${c.sub}</div>
      <div class="by">Dafne Gutiérrez</div></div>`;
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, c.file) });
  }
  await b.close(); console.log('ok');
})();
