// X post image 1600 x 900 (16:9, shown uncropped in the feed). Same illustration and style as the LinkedIn cover.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { css, C } = require('../kit-visual/componentes.cjs');
const IMG = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, 'ilustracion.webp')).toString('base64');
const W = 1600, HT = 900, BG = 'rgb(23,27,30)';
const COVERS = [
  { file: 'x-portada-en.png', t1: 'The Last Question', t2: 'Is Still Unanswered', sub: 'And that is the point.' },
  { file: 'x-portada-es.png', t1: 'La última pregunta', t2: 'sigue sin respuesta', sub: 'Y ese es el punto.' },
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: HT }, deviceScaleFactor: 2 });
  const H = Math.round(W * 790 / 1854);
  for (const c of COVERS) {
    const html = `<!doctype html><meta charset="utf-8"><style>${css()}
      .cv{width:${W}px;height:${HT}px;background:${BG};color:${C.ink};font-family:Inter,sans-serif;position:relative;overflow:hidden}
      .ill{position:absolute;left:0;bottom:0;width:${W}px;height:${H}px;background:url(${IMG}) center/100% 100% no-repeat}
      .fade{position:absolute;left:0;top:0;width:${W}px;height:360px;background:linear-gradient(180deg,${BG} 0%,${BG} 34%,rgba(0,0,0,0) 100%)}
      .glow{position:absolute;left:-250px;top:-420px;width:1250px;height:920px;background:radial-gradient(closest-side,rgba(110,70,200,.38),rgba(110,70,200,0))}
      .tx{position:absolute;left:84px;top:34px}
      h1{font-size:92px;line-height:1.02;letter-spacing:-.045em;margin:28px 0 0;text-shadow:0 2px 26px rgba(0,0,0,.45)}
      .sub{position:absolute;right:84px;top:206px;text-align:right;font-size:38px;font-weight:600;color:#e4e0f0;letter-spacing:-.01em;text-shadow:0 2px 20px rgba(0,0,0,.6)}
      .by{position:absolute;right:84px;top:48px;font-size:28px;font-weight:600;color:#cfcade;letter-spacing:.04em;text-shadow:0 2px 16px rgba(0,0,0,.6)}
    </style><div class="cv"><div class="ill"></div><div class="fade"></div><div class="glow"></div>
      <div class="tx"><span class="k">NEWSLETTER</span><h1>${c.t1}<br><span class="rp">${c.t2}</span></h1></div><div class="sub">${c.sub}</div>
      <div class="by">Dafne Gutiérrez</div></div>`;
    await p.setContent(html); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, c.file) });
  }
  await b.close(); console.log('ok');
})();
