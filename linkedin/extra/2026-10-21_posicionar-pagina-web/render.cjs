const { chromium } = require(process.env.NODE_PATH.split(':')[0] + '/playwright');
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.wrap{position:absolute;inset:0;padding:80px 84px 70px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:#B89BFF;border:2px solid #B89BFF;border-radius:999px;padding:12px 26px}
h1{margin-top:38px;font-size:76px;line-height:1.05;font-weight:700;letter-spacing:-.045em;text-wrap:balance}
.cols{margin-top:42px;display:grid;grid-template-columns:1fr 1fr;gap:22px}
.c{border:2px solid rgba(184,155,255,.4);background:rgba(94,48,181,.15);border-radius:26px;padding:28px 28px 30px}
.c .h{font-size:25px;font-weight:700;letter-spacing:.1em;color:#B89BFF}
.c .d{margin-top:6px;font-size:23px;color:#86868B}
.c .t{margin-top:20px;font-size:32px;line-height:1.28;color:#F7F7F8;letter-spacing:-.015em}
.c ul{margin-top:18px;list-style:none;display:flex;flex-direction:column;gap:10px}
.c li{font-size:26px;color:#D4D4D8;line-height:1.25;padding-left:26px;position:relative}
.c li:before{content:'';position:absolute;left:0;top:11px;width:12px;height:12px;border-radius:50%;background:#8E6BE0}
.note{margin-top:18px;font-size:24px;color:#FFC66B;line-height:1.3}
.src{margin-top:30px;text-align:center;font-size:28px;color:#A1A1A6}
.pills{margin-top:16px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.pill{font-size:30px;font-weight:700;border:2px solid #B89BFF;background:rgba(94,48,181,.28);border-radius:999px;padding:12px 26px}
.steps{margin-top:34px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.s{border:2px solid rgba(184,155,255,.35);background:rgba(255,255,255,.03);border-radius:22px;padding:22px 22px 24px;position:relative}
.s .n{width:48px;height:48px;border-radius:50%;border:3px solid #8E6BE0;background:#1a1330;display:grid;place-items:center;font-size:26px;font-weight:700}
.s b{display:block;margin-top:14px;font-size:30px;letter-spacing:-.02em;line-height:1.15}
.s small{display:block;margin-top:6px;font-size:23px;color:#A1A1A6;line-height:1.28}
.q{margin-top:auto;border-top:2px dashed rgba(184,155,255,.4);padding-top:28px;font-size:36px;line-height:1.28;letter-spacing:-.02em}
.q s{color:#86868B;text-decoration-thickness:3px}
.q b{color:#B89BFF}
</style><body><div class="g1"></div><div class="g2"></div><div class="wrap">
<div class="k">MI POSTURA</div>
<h1>La IA no lee solo tu página</h1>
<div class="cols">
 <div class="c"><div class="h">EE. UU.</div><div class="d">Reddit, sept.–oct. 2026</div><div class="t">Primera hoja de Google no garantiza que la IA te cite.</div><ul><li>AI Overviews cita a Reddit antes que a la marca</li></ul></div>
 <div class="c"><div class="h">MÉXICO</div><div class="d">Forobeta, 9 oct. 2026</div><div class="t">La IA toma de fuera de la página del negocio.</div><ul><li>Reseñas viejas de Google Maps</li></ul></div>
</div>
<div class="note">Reportes de usuarios, no un estudio.</div>
<div class="src">Lo que la IA lee, según esos reportes:</div>
<div class="pills"><span class="pill">Foros</span><span class="pill">Reseñas</span><span class="pill">Directorios</span></div>
<div class="steps"><div class="s"><div class="n">1</div><b>Pregunta</b><small>La que más te hacen tus clientes. Anota la fecha.</small></div><div class="s"><div class="n">2</div><b>Anota fuentes</b><small>Repite varios días: las respuestas cambian.</small></div><div class="s"><div class="n">3</div><b>Corrige</b><small>Datos correctos y vigentes en las 3 que más se repiten.</small></div></div>
<div class="q"><s>¿Cómo optimizo mi página?</s><br><b>¿Qué dicen de mí las fuentes que la IA sí lee?</b></div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const m = await pg.evaluate(() => { const q = document.querySelector('.q').getBoundingClientRect(); const p = document.querySelector('.pills').getBoundingClientRect(); return { pillsBottom: Math.round(p.bottom), qTop: Math.round(q.top), qBottom: Math.round(q.bottom), over: [...document.querySelectorAll('.t,li,h1,.q')].filter((e) => e.scrollWidth > e.clientWidth + 1).length }; });
  console.log(JSON.stringify(m));
  await pg.screenshot({ path: 'imagen.png' });
  await b.close();
})();
