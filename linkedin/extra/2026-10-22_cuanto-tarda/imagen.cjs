// Uso: NODE_PATH=$(npm root -g) node imagen.cjs salida.png [foto.jpg]
// Con foto: pantalla completa, muy oscurecida y con tinte violeta. Sin foto: fondo de la marca (para probar el diseño).
const fs = require('fs');
const { chromium } = require(process.env.NODE_PATH.split(':')[0] + '/playwright');
const photo = process.argv[3] ? 'data:image/jpeg;base64,' + fs.readFileSync(process.argv[3]).toString('base64') : null;
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.ph{position:absolute;inset:0;${photo ? `background:url(${photo}) center/cover;filter:saturate(.7) brightness(.55)` : 'background:radial-gradient(circle at 70% 30%,#2b1a55,#050506 70%)'}}
.tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,6,.78) 0%,rgba(40,20,90,.55) 45%,rgba(5,5,6,.92) 100%)}
.wrap{position:absolute;inset:0;padding:84px 88px 72px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:#FF8A8A;border:2px solid #FF8A8A;border-radius:999px;padding:10px 26px;background:rgba(5,5,6,.45)}
h1{margin-top:40px;font-size:84px;line-height:1.05;font-weight:700;letter-spacing:-.045em;text-wrap:balance;text-shadow:0 2px 24px rgba(0,0,0,.5)}
h1 span{color:#B89BFF}
.rule{margin:40px 0 0;height:3px;width:120px;background:#8E6BE0;border-radius:3px}
.rows{margin-top:auto;display:flex;flex-direction:column;gap:16px}
.r{display:flex;align-items:center;gap:22px;background:rgba(5,5,6,.62);border:2px solid rgba(184,155,255,.4);border-radius:20px;padding:20px 28px;backdrop-filter:blur(6px)}
.r.no{border-style:dashed;border-color:#FFC66B}
.t{flex:0 0 190px;font-size:23px;font-weight:700;letter-spacing:.1em;color:#B89BFF}
.r.no .t{color:#FFC66B}
.d{font-size:33px;line-height:1.22;letter-spacing:-.015em}
.foot{margin-top:26px;font-size:22px;color:#A1A1A8;line-height:1.35}
</style><body><div class="ph"></div><div class="tint"></div><div class="wrap">
<div class="k">MITO</div>
<h1>Nadie puede prometerte cuántos días tarda la IA en <span>reflejar un cambio.</span></h1>
<div class="rule"></div>
<div class="rows">
<div class="r"><div class="t">SE SABE</div><div class="d">Google: de días a semanas en reindexar un cambio</div></div>
<div class="r"><div class="t">SE SABE</div><div class="d">Google guarda el robots.txt hasta unas 24 horas</div></div>
<div class="r no"><div class="t">NO HAY DATO</div><div class="d">ChatGPT, Claude y Perplexity: sin estudio público</div></div>
</div>
<div class="foot">Fuentes: Google Search Central; IndexNow; documentación de Bing y Copilot.</div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const m = await pg.evaluate(() => { const r = s => document.querySelector(s).getBoundingClientRect(); return { h1Bottom: Math.round(r('h1').bottom), rowsTop: Math.round(r('.rows').top), footBottom: Math.round(r('.foot').bottom) }; });
  console.log(JSON.stringify(m));
  await pg.screenshot({ path: process.argv[2] || 'img.png' });
  await b.close();
})();
