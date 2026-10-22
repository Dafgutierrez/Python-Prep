const fs = require('fs');
const { chromium } = require(process.env.NODE_PATH.split(':')[0] + '/playwright');
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.wrap{position:absolute;inset:0;padding:84px 88px 72px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:#FF8A8A;border:2px solid #FF8A8A;border-radius:999px;padding:10px 26px}
h1{margin-top:34px;font-size:80px;line-height:1.04;font-weight:700;letter-spacing:-.045em;text-wrap:balance}
h1 span{color:#B89BFF}
.dash{margin-top:38px;display:flex;align-items:center;gap:30px;border:3px dashed #5a5a63;border-radius:28px;padding:22px 30px;opacity:.95}
.file{flex:0 0 84px;height:104px;border-radius:12px;border:3px solid #86868B;position:relative;padding:22px 14px}
.file:before{content:'';position:absolute;right:-3px;top:-3px;width:26px;height:26px;background:#050506;border-left:3px solid #86868B;border-bottom:3px solid #86868B;border-radius:0 0 0 10px}
.file i{display:block;height:6px;border-radius:3px;background:#86868B;margin-bottom:11px}
.file i:nth-child(2){width:70%}.file i:nth-child(3){width:85%}
.dt b{display:block;font-size:42px;letter-spacing:-.02em;color:#D4D4D8}
.dt span{display:block;margin-top:6px;font-size:28px;white-space:nowrap;line-height:1.28;color:#A1A1A8}
.tag{margin-left:auto;flex:0 0 auto;font-size:21px;font-weight:700;letter-spacing:.1em;color:#FFC66B;border:2px solid #FFC66B;border-radius:12px;padding:10px 14px;text-align:center;line-height:1.25}
.lab{margin-top:36px;font-size:28px;font-weight:700;letter-spacing:.14em;color:#B89BFF}
.steps{margin-top:22px;position:relative;display:flex;flex-direction:column;gap:18px}
.steps:before{content:'';position:absolute;left:35px;top:40px;bottom:40px;width:4px;background:linear-gradient(#8E6BE0,#B89BFF);border-radius:2px}
.s{display:flex;gap:30px;align-items:center;position:relative}
.n{flex:0 0 74px;height:74px;border-radius:50%;background:#5E30B5;border:4px solid #B89BFF;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700}
.c{flex:1;background:rgba(94,48,181,.18);border:2px solid rgba(184,155,255,.35);border-radius:22px;padding:16px 26px}
.c b{display:block;font-size:44px;letter-spacing:-.025em}
.c span{display:block;margin-top:4px;font-size:27px;line-height:1.28;color:#C9C9D0}
.foot{margin-top:auto;padding-top:18px;font-size:22px;color:#86868B;line-height:1.35}
</style><body><div class="g1"></div><div class="g2"></div><div class="wrap">
<div class="k">MITO</div>
<h1>llms.txt no es una estrategia. <span>Es un archivo.</span></h1>
<div class="dash"><div class="file"><i></i><i></i><i></i></div><div class="dt"><b>llms.txt</b><span>Google: ni ayuda ni perjudica</span></div><div class="tag">SIN CONFIRMACIÓN<br>EN LOS DEMÁS</div></div>
<div class="lab">LO QUE ANTES DECIDE SI TE LEEN</div>
<div class="steps">
<div class="s"><div class="n">1</div><div class="c"><b>Que te dejen entrar</b><span>Firewall o CDN pueden bloquear rastreadores</span></div></div>
<div class="s"><div class="n">2</div><div class="c"><b>Que te puedan leer</b><span>Texto en el HTML, no detrás de JavaScript</span></div></div>
<div class="s"><div class="n">3</div><div class="c"><b>Que tus datos coincidan</b><span>Lo mismo en tu sitio y en tus perfiles</span></div></div>
</div>
<div class="foot">Fuentes: guía de Google sobre IA en Search (mayo de 2026); SE Ranking*; reportes de usuarios en r/TechSEO (7 y 8 de octubre de 2026). *Estudio de un proveedor.</div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const m = await pg.evaluate(() => { const r = s => document.querySelector(s).getBoundingClientRect(); return { stepsBottom: Math.round(r('.steps').bottom), footTop: Math.round(r('.foot').top), footBottom: Math.round(r('.foot').bottom), h1Bottom: Math.round(r('h1').bottom), tagRight: Math.round(r('.tag').right), dashRight: Math.round(r('.dash').right) }; });
  console.log(JSON.stringify(m));
  await pg.screenshot({ path: process.argv[2] || 'img.png' });
  await b.close();
})();
