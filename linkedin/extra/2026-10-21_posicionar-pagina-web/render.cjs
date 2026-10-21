const { chromium } = require(process.env.NODE_PATH.split(':')[0] + '/playwright');
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.wrap{position:absolute;inset:0;padding:80px 84px 70px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:#B89BFF;border:2px solid #B89BFF;border-radius:999px;padding:12px 26px}
h1{margin-top:38px;font-size:80px;line-height:1.04;font-weight:700;letter-spacing:-.045em;text-wrap:balance}
.sub{margin-top:18px;font-size:32px;color:#A1A1A6;line-height:1.3}
.flow{margin-top:40px;display:flex;flex-direction:column;gap:0}
.st{display:flex;align-items:center;gap:26px;border:2px solid rgba(184,155,255,.35);background:rgba(94,48,181,.14);border-radius:26px;padding:22px 30px}
.st .no{flex:0 0 62px;height:62px;border-radius:50%;border:3px solid #8E6BE0;background:#1a1330;font-size:30px;font-weight:700;display:grid;place-items:center}
.st b{display:block;font-size:40px;letter-spacing:-.02em}
.st small{display:block;font-size:26px;color:#A1A1A6;margin-top:4px;line-height:1.25}
.st.ok{border-color:#B89BFF;background:rgba(184,155,255,.2)}
.gap{display:flex;align-items:center;gap:22px;margin:0 0 0 62px;padding:12px 0;position:relative}
.gap:before{content:'';width:3px;height:100%;position:absolute;left:0;top:0;background:linear-gradient(#8E6BE0,rgba(142,107,224,.3))}
.gap div{margin-left:26px;font-size:27px;line-height:1.28;color:#FFC66B}
.gap div span{color:#D4D4D8}
.out{margin-top:30px;border-top:2px dashed rgba(184,155,255,.4);padding-top:26px}
.out .t{font-size:28px;color:#A1A1A6;margin-bottom:16px}
.pills{display:flex;gap:14px;flex-wrap:wrap}
.pill{font-size:30px;font-weight:700;border:2px solid #B89BFF;color:#F7F7F8;background:rgba(94,48,181,.28);border-radius:999px;padding:12px 26px}
.foot{margin-top:auto;font-size:25px;color:#86868B;line-height:1.35}
</style><body><div class="g1"></div><div class="g2"></div><div class="wrap">
<div class="k">MI POSTURA</div>
<h1>Indexada no es lo mismo que rastreada</h1>
<div class="sub">Dónde se queda tu página antes del Modo IA de Google</div>
<div class="flow">
 <div class="st"><div class="no">1</div><div><b>Descubierta</b><small>Google sabe que existe</small></div></div>
 <div class="gap"><div>Descubierta: actualmente sin indexar<br><span>aún no la visitó</span></div></div>
 <div class="st"><div class="no">2</div><div><b>Rastreada</b><small>Google la leyó. El robots.txt no es el problema.</small></div></div>
 <div class="gap"><div>Rastreada: actualmente sin indexar<br><span>la leyó y no la guardó</span></div></div>
 <div class="st ok"><div class="no">3</div><div><b>Indexada</b><small>Ya puede salir. Sin esto, nada de lo siguiente.</small></div></div>
</div>
<div class="out"><div class="t">Según Google, del mismo índice salen:</div><div class="pills"><span class="pill">Búsqueda</span><span class="pill">AI Overviews</span><span class="pill">Modo IA</span></div></div>
<div class="foot">“Posicionar mi página web en Google”: unas 2,400 búsquedas al mes en México. Semrush, base México, octubre de 2026.</div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  const m = await pg.evaluate(() => { const o = document.querySelector('.out').getBoundingClientRect(); const f = document.querySelector('.foot').getBoundingClientRect(); return { outBottom: Math.round(o.bottom), footTop: Math.round(f.top), footBottom: Math.round(f.bottom), over: [...document.querySelectorAll('b,small,.gap div,h1,.sub,.foot')].filter((e) => e.scrollWidth > e.clientWidth + 1).length }; });
  console.log(JSON.stringify(m));
  await pg.screenshot({ path: 'imagen.png' });
  await b.close();
})();
