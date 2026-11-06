// X (Twitter) header for Dafne, 1500 x 500 (exported at 2x). Brand look: night, violet to pink, orb of light. Her name only, no product.
// Safe areas: the profile photo covers roughly the bottom-left 260 x 200 px on desktop; mobile crops about 60 px top and bottom.
const { chromium } = require('playwright'); const path = require('path');
const { css, C } = require('../kit-visual/componentes.cjs');
const V = {
  en: { file: 'x-header-en.png', h: ['Found.', 'Understood.', 'Recommended.'], sub: 'Brand visibility in Google and AI answers', tags: ['SEO', 'GEO', 'Amazon SEO'], place: 'Guadalajara, MX' },
  es: { file: 'x-header-es.png', h: ['Encontrada.', 'Entendida.', 'Recomendada.'], sub: 'Que tu marca aparezca en Google y en las respuestas de la IA', tags: ['SEO', 'GEO', 'Amazon SEO'], place: 'Guadalajara, MX' },
};
const ENGINES = [['Google AI Overviews', 'Google AI Mode', 'ChatGPT', 'Gemini', 'Perplexity'], ['Claude', 'Copilot', 'Grok', 'Meta AI', 'Meta Muse', 'Alexa for Shopping']]; // the eleven engines the product names, two lines
const orb = () => { // rings + soft core, drawn larger than the kit's so it reads at banner scale
  const rings = Array.from({ length: 12 }, (_, k) => `<ellipse cx="0" cy="0" rx="${210 + k * 30}" ry="${96 + k * 19}" transform="rotate(${-24 + k * 6})" fill="none" stroke="${k % 3 === 2 ? '#FF9EC0' : '#B89BFF'}" stroke-opacity="${0.12 + (k % 4) * 0.06}" stroke-width="${k % 2 ? 1.4 : 2.2}"/>`).join('');
  return `<svg width="1100" height="1100" viewBox="-550 -550 1100 1100" style="position:absolute;right:-250px;top:-300px">
<defs><radialGradient id="c" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(330)"><stop offset="0" stop-color="#FF9EC0" stop-opacity=".55"/><stop offset=".4" stop-color="#8E6BE0" stop-opacity=".42"/><stop offset="1" stop-color="#5E30B5" stop-opacity="0"/></radialGradient>
<filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>
<circle cx="0" cy="0" r="330" fill="url(#c)" filter="url(#b)"/>${rings}
<circle cx="180" cy="-110" r="4" fill="#fff" fill-opacity=".9"/><circle cx="230" cy="70" r="3" fill="#FF9EC0"/><circle cx="-40" cy="100" r="2.5" fill="#B89BFF"/></svg>`;
};
const html = (v, preview) => `<!doctype html><meta charset="utf-8"><style>${css()}
body{margin:0;background:#050506}
.x{width:1500px;height:500px;position:relative;overflow:hidden;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif}
.glow1{position:absolute;left:-300px;top:-520px;width:1300px;height:1300px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.55) 0%,rgba(94,48,181,0) 60%)}
.glow2{position:absolute;left:520px;bottom:-760px;width:1100px;height:1100px;border-radius:50%;background:radial-gradient(circle,rgba(214,90,138,.18) 0%,rgba(214,90,138,0) 60%)}
.grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1.2px);background-size:26px 26px;mask-image:linear-gradient(90deg,transparent 0%,#000 35%,#000 60%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 35%,#000 60%,transparent 100%)}
.txt{position:absolute;left:300px;top:96px;width:760px}
.h{font-size:66px;font-weight:700;letter-spacing:-.045em;line-height:1.02}
.h span{display:block}
.g{background:linear-gradient(90deg,#9CC8FF 0%,#C2A8FF 50%,#FF9EC0 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.08em}
.sub{margin-top:18px;font-size:23px;color:#D4D4D8;letter-spacing:-.01em}
.row{margin-top:22px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.tag{font-size:16px;font-weight:700;letter-spacing:.14em;color:#B89BFF;border:1.5px solid rgba(184,155,255,.55);border-radius:999px;padding:6px 14px}
.eng{position:absolute;right:56px;bottom:74px;display:flex;flex-direction:column;align-items:flex-end;gap:10px}.eng div{display:flex;gap:14px}.eng{font-size:15px;font-weight:600;letter-spacing:.08em;color:rgba(247,247,248,.55)}
.eng i{width:4px;height:4px;border-radius:50%;background:rgba(184,155,255,.6);align-self:center}
.place{position:absolute;right:56px;top:78px;font-size:15px;font-weight:600;letter-spacing:.14em;color:rgba(247,247,248,.5)}
.av{position:absolute;left:40px;bottom:-60px;width:200px;height:200px;border-radius:50%;background:#2a2a30;border:5px solid #000}
.crop{position:absolute;left:0;right:0;height:60px;background:rgba(255,0,0,.12)}
</style><div class="x"><div class="glow1"></div><div class="glow2"></div><div class="grid"></div>${orb()}
<div class="place">${v.place.toUpperCase()}</div>
<div class="txt"><div class="h"><span>${v.h[0]}</span><span>${v.h[1]}</span><span class="g">${v.h[2]}</span></div>
<div class="sub">${v.sub}</div><div class="row">${v.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div></div>
<div class="eng">${ENGINES.map((line) => '<div>' + line.map((e, i) => (i ? '<i></i>' : '') + `<span>${e.toUpperCase()}</span>`).join('') + '</div>').join('')}</div>
${preview ? '<div class="av"></div><div class="crop" style="top:0"></div><div class="crop" style="bottom:0"></div>' : ''}</div>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1500, height: 500 }, deviceScaleFactor: 2 });
  for (const k of Object.keys(V)) {
    for (const preview of [false, true]) {
      await p.setContent(html(V[k], preview)); await p.evaluate(() => document.fonts.ready);
      const over = await p.evaluate(() => { const t = document.querySelector('.txt').getBoundingClientRect(); return { right: Math.round(t.right), bottom: Math.round(t.bottom), top: Math.round(t.top), left: Math.round(t.left) }; });
      await p.screenshot({ path: path.join(__dirname, preview ? 'preview-' + V[k].file : V[k].file) });
      if (!preview) console.log(k, 'text box', JSON.stringify(over));
    }
  }
  await b.close();
})();
