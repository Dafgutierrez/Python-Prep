// LinkedIn profile cover, 1584 x 396 (and 2x). Premium style: black canvas, brand violet and lilac, Inter, 8pt rhythm.
// Text sits right of the profile photo corner (x from 392). No product name. Run: node banner2.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const COPY = {
  es: { file: 'portada-linkedin-v2-es', eyebrow: 'SEO · GEO · Amazon SEO', beats: [['Encontrado', 'En Google y en Bing'], ['Entendido', 'Por los motores de IA'], ['Recomendado', 'En sus respuestas y en Amazon']] },
  en: { file: 'portada-linkedin-v2-en', eyebrow: 'SEO · GEO · Amazon SEO', beats: [['Found', 'On Google and Bing'], ['Understood', 'By AI engines'], ['Recommended', 'In their answers and on Amazon']] }
};
const css = `
:root{--night:#050506;--paper:#F7F7F8;--violet:#5E30B5;--lilac:#B89BFF;--mute:rgba(247,247,248,.64);--line:rgba(255,255,255,.14);--sky:#9CC8FF;--lilac2:#C2A8FF;--pink:#FF9EC0}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1584px;height:396px;background:var(--night);color:var(--paper);font-family:Inter,"SF Pro Display",system-ui,sans-serif;-webkit-font-smoothing:antialiased;position:relative;overflow:hidden}
.glow1{position:absolute;left:-180px;top:-460px;width:1100px;height:1100px;border-radius:50%;background:radial-gradient(closest-side,rgba(94,48,181,.62),rgba(94,48,181,0))}
.glow2{position:absolute;right:-300px;bottom:-560px;width:1000px;height:1000px;border-radius:50%;background:radial-gradient(closest-side,rgba(184,155,255,.20),rgba(184,155,255,0))}
svg.rings{position:absolute;right:-230px;top:-82px;width:560px;height:560px;opacity:.9}
.t{position:absolute;left:392px;top:0;height:396px;display:flex;flex-direction:column;justify-content:center}
.eyebrow{font-size:18px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--lilac);margin-bottom:24px}
.row{display:flex;gap:0}
.beat{padding:0 32px 0 0;margin-right:32px;border-right:1px solid var(--line)}
.beat:last-child{border-right:0;margin-right:0;padding-right:0}
.beat h1{font-size:48px;line-height:1.05;font-weight:700;letter-spacing:-.035em;white-space:nowrap}
.beat h1 em{font-style:normal;background:linear-gradient(100deg,var(--sky),var(--lilac2) 55%,var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.08em}
.beat p{margin-top:14px;font-size:18px;line-height:1.35;color:var(--mute);font-weight:400;white-space:nowrap}
.engines{margin-top:30px;padding-top:22px;border-top:1px solid var(--line);font-size:17px;line-height:1.7;color:var(--mute);letter-spacing:.005em;white-space:nowrap}
.engines b{font-weight:500;color:rgba(247,247,248,.86)}
.engines s{text-decoration:none;color:#8E6BE0;padding:0 11px}
.bar{width:48px;height:4px;border-radius:4px;background:linear-gradient(90deg,#8A5CFF,var(--lilac));margin-bottom:20px}
`;
const rings = `<svg class="rings" viewBox="0 0 560 560" fill="none" aria-hidden="true">
<circle cx="280" cy="280" r="96" stroke="rgba(184,155,255,.34)" stroke-width="1.5"/>
<circle cx="280" cy="280" r="164" stroke="rgba(184,155,255,.22)" stroke-width="1.5"/>
<circle cx="280" cy="280" r="232" stroke="rgba(184,155,255,.14)" stroke-width="1.5"/>
<circle cx="280" cy="280" r="272" stroke="rgba(184,155,255,.08)" stroke-width="1.5"/>
<circle cx="376" cy="280" r="7" fill="#B89BFF"/><circle cx="376" cy="280" r="18" fill="rgba(184,155,255,.18)"/>
<circle cx="176" cy="152" r="5" fill="#9CC8FF"/><circle cx="226" cy="386" r="5" fill="#FF9EC0"/>
</svg>`;
const ENGINES = [['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Google AI Mode', 'Google AI Overviews'], ['Copilot', 'Grok', 'Meta AI', 'Meta Muse', 'Alexa for Shopping']];
const engines = `<div class="engines">${ENGINES.map((l) => l.map((e) => `<b>${e}</b>`).join('<s>·</s>')).join('<br>')}</div>`;
const page = (c) => `<!doctype html><meta charset="utf-8"><style>${css}</style><body><div class="glow1"></div><div class="glow2"></div>${rings}
<div class="t"><div class="eyebrow">${c.eyebrow}</div><div class="row">${c.beats.map(([h, p], i) => `<div class="beat"><div class="bar"></div><h1>${i === 1 ? `<em>${h}</em>` : h}</h1><p>${p}</p></div>`).join('')}</div>${engines}</div></body>`;
(async () => {
  const b = await chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
  for (const [k, c] of Object.entries(COPY)) {
    for (const [s, suf] of [[1, '1584x396'], [2, '3168x792']]) {
      const pg = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: s });
      await pg.setContent(page(c)); await pg.evaluate(() => document.fonts.ready);
      if (s === 1) console.log(k, JSON.stringify(await pg.evaluate(() => { const r = document.querySelector('.row').getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right), Math.round(r.top), Math.round(r.bottom)]; })));
      await pg.screenshot({ path: `${c.file}-${suf}.png` }); await pg.close();
    }
  }
  const img = (f) => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
  const pv = await b.newPage({ viewport: { width: 1584, height: 560 } });
  await pv.setContent(`<body style="margin:0;background:#1b1f23;width:1584px"><div style="position:relative;width:1584px;height:396px"><img src="${img(COPY.es.file + '-1584x396.png')}" style="display:block"><div style="position:absolute;left:34px;top:286px;width:228px;height:228px;border-radius:50%;background:#8b8b94;border:8px solid #1b1f23"></div></div></body>`);
  await pv.screenshot({ path: 'vista-previa-computadora-v2.png' });
  await b.close();
})();
