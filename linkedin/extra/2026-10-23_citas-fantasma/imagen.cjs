// Uso: NODE_PATH=$(npm root -g) node imagen.cjs salida.png
// Diagrama sin foto: dos fallas distintas (te enlazan sin nombrarte / te nombran sin enlazarte), solo con las cifras del texto.
const { chromium } = require(process.env.NODE_PATH.split(':')[0] + '/playwright');
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.bg{position:absolute;inset:0;background:radial-gradient(circle at 80% 8%,#2b1a55,#050506 62%)}
.wrap{position:absolute;inset:0;padding:84px 88px 70px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:#FF8A8A;border:2px solid #FF8A8A;border-radius:999px;padding:10px 26px}
h1{margin-top:34px;font-size:72px;line-height:1.05;font-weight:700;letter-spacing:-.045em;text-wrap:balance}
h1 span{color:#B89BFF}
.cards{margin-top:72px;display:flex;flex-direction:column;gap:36px}
.c{border:2px solid rgba(184,155,255,.45);border-radius:26px;padding:42px 38px;background:rgba(94,48,181,.14)}
.c.b{border-color:#FFC66B;background:rgba(255,198,107,.07)}
.top{display:flex;align-items:center;justify-content:space-between;gap:20px}
.lab{font-size:22px;font-weight:700;letter-spacing:.12em;color:#B89BFF}
.c.b .lab{color:#FFC66B}
.num{font-size:112px;line-height:1;font-weight:700;letter-spacing:-.05em}
.t{margin-top:8px;font-size:36px;line-height:1.2;font-weight:600;letter-spacing:-.02em}
.sub{margin-top:12px;font-size:27px;line-height:1.3;color:#C9C9D0}
.bar{margin-top:22px;height:16px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden}
.bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#8E6BE0,#B89BFF)}
.c.b .bar i{background:linear-gradient(90deg,#FFB347,#FFC66B)}
.foot{margin-top:auto;font-size:21px;color:#A1A1A8;line-height:1.35}
</style><body><div class="bg"></div><div class="wrap">
<div class="k">DOS FALLAS DISTINTAS</div>
<h1>Que te citen no es lo mismo que <span>te nombren.</span></h1>
<div class="cards">
<div class="c"><div class="top"><div class="lab">TE ENLAZAN, NO TE NOMBRAN</div><div class="num">≈40%*</div></div>
<div class="t">de las citas no dicen el nombre de la marca</div>
<div class="sub">Perplexity 52% · ChatGPT 37%</div><div class="bar"><i style="width:40%"></i></div></div>
<div class="c b"><div class="top"><div class="lab">TE NOMBRAN, NO TE ENLAZAN</div><div class="num">28%*</div></div>
<div class="t">de las menciones de marca llevan enlace</div>
<div class="sub">Más de 31,000 menciones analizadas</div><div class="bar"><i style="width:28%"></i></div></div>
</div>
<div class="foot">*Estudios de proveedores, de EE. UU. y en inglés; no encontré uno para México. Fuentes: Writesonic vía Search Engine Land (julio de 2026); Ahrefs.</div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const m = await pg.evaluate(() => { const r = s => document.querySelector(s).getBoundingClientRect(); const cs = [...document.querySelectorAll('.c')].map(e => e.getBoundingClientRect()); return { h1Bottom: Math.round(r('h1').bottom), cardsBottom: Math.round(cs[1].bottom), footTop: Math.round(r('.foot').top), footBottom: Math.round(r('.foot').bottom), overflowX: [...document.querySelectorAll('.num,.lab,.t')].some(e => e.scrollWidth > e.clientWidth + 1) }; });
  console.log(JSON.stringify(m));
  await pg.screenshot({ path: process.argv[2] || 'img.png' });
  await b.close();
})();
