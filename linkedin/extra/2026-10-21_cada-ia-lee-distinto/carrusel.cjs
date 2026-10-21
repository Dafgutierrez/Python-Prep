const fs = require('fs');
const { chromium } = require(process.env.NODE_PATH.split(':')[0] + '/playwright');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MAX = 40; // la escala de todas las barras: 0 a 40 % de las citas
const bars = (rows) => `<div class="bars">${rows.map((r) => `<div class="row"><div class="lab">${esc(r[0])}</div><div class="track"><div class="fill" style="width:${(r[1] / MAX) * 100}%"></div></div><div class="val">${r[1].toFixed(1)}%</div></div>`).join('')}</div>`;
const src = (t) => `<div class="src">${esc(t)}</div>`;
const S = [];
const eco = (rows) => `<div class="eco">${rows.map((r) => `<div class="er"><div class="ec">${esc(r[0])}</div><div class="ei">${esc(r[1])}</div></div>`).join('')}</div>`;
// 1 portada
S.push({ k: 'MI POSTURA', cover: true, body: `<h1 class="cv">¿Copilot, Grok y Meta AI recomiendan igual que ChatGPT?</h1><div class="r"></div><p class="b"><b style="color:#B89BFF">No.</b> Cada IA lee fuentes distintas. Qué cita cada una, con estudios cruzados, y qué hacer en México. Desliza.</p>` });
// 2 el reporte mexicano
S.push({ k: 'MÉXICO', body: `<h1>Un usuario mexicano ya lo vio</h1><div class="r"></div><blockquote>“a veces los LLMs jalan información de foros, reseñas viejas de Google Maps o directorios que uno ni pelaba, en lugar de la página principal que optimizaste”</blockquote>${src('Forobeta, 9 de octubre de 2026. Es el reporte de un usuario, no un estudio.')}` });
// 3 perplexity y grok
S.push({ k: 'LO QUE CITAN', body: `<h1>Perplexity y Grok: contenido de usuarios</h1><div class="sub">Perplexity</div>${bars([['YouTube', 32.4], ['Reddit', 16.6], ['Wikipedia', 8.2]])}<div class="sub">Grok</div>${bars([['Reddit', 16.3], ['YouTube', 15.1], ['Facebook', 13.9], ['x.com', 1.4]])}${src('Ahrefs, junio de 2026, consultas de EE. UU. Perplexity: 3.1 millones, vía fuentes secundarias.')}` });
// 4 chatgpt y copilot
S.push({ k: 'LO QUE CITAN', body: `<h1>ChatGPT y Copilot: no es lo mismo</h1><div class="sub">ChatGPT</div>${bars([['Reddit', 16.7], ['Wikipedia', 8.9]])}<div class="note">En enero y febrero iba arriba Wikipedia (13.15 %) y no Reddit (11.97 %). Cambia con el tiempo.</div><div class="sub">Copilot (compras)</div>${bars([['Amazon', 14.4], ['Walmart', 10.0], ['Wikipedia', 9.5]])}${src('Ahrefs, julio de 2026, consultas de EE. UU.')}` });
// 5 claude y gemini
S.push({ k: 'LO QUE CITAN', body: `<h1>Claude y Gemini: otra lógica</h1><div class="cards"><div class="card"><div class="big">86.7%</div><div class="t">de las citas de Claude coinciden con los primeros resultados de Brave</div><div class="s">Profound, 2025. Una prueba de 2026 con unas 400 consultas dio 79.2 % (sin verificar).</div></div><div class="card"><div class="big">52.15%</div><div class="t">de las citas de Gemini van a sitios de marca</div><div class="s">Everything-PR, 2026. No declara su muestra: poca confianza.</div></div></div>` });
// 6 meta
S.push({ k: 'META AI Y MUSE', body: `<h1>Meta: sin estudio público, pero sí sabemos de dónde lee</h1><ul class="ls"><li><b>Su propio rastreador.</b> Meta-WebIndexer existe para que Meta AI cite y enlace sitios, según Meta. Si lo bloqueas, no entra.</li><li><b>Publicaciones de Instagram, Facebook y Threads.</b> Meta dijo que Muse Spark aprovechará lo publicado en sus apps.</li><li><b>Compras:</b> contenido de creadores y comunidades que el usuario ya sigue, y Marketplace.</li></ul><div class="note">Un proveedor estima que Meta AI es la IA que más cita redes sociales (junio de 2026, sin verificar).</div><div class="conc">Por eso, en Meta, tu sitio solo no alcanza.</div>${src('Meta (documentación de rastreadores), eMarketer y reportes de prensa, 2025 y 2026. No hay estudio público de citas de Meta AI.')}` });
// 7 google no alcanza
S.push({ k: 'GOOGLE NO ALCANZA', body: `<h1>Salir primero en Google no alcanza</h1><div class="cards"><div class="card"><div class="big">12%</div><div class="t">de las URLs que cita una IA están en el top 10 de Google para esa pregunta</div><div class="s">Ahrefs, 15,000 consultas. En ChatGPT, 8.0 %.</div></div><div class="card"><div class="big">12.7%</div><div class="t">de las veces ChatGPT y Gemini citan el mismo dominio</div><div class="s">Mentionbird, 517 preguntas comerciales, abril a agosto de 2026. La misma página, 5.8 %.</div></div></div>` });
// 8 ecosistema
S.push({ k: 'EL SISTEMA COMPLETO', body: `<h1>No es una página. Es un ecosistema</h1><div class="sub">Dónde estar, y quién lo lee</div>${eco([['Sitio y blog rastreables', 'Claude (vía Brave), Copilot (vía Bing), Gemini, Google'], ['YouTube: título = la pregunta', 'Perplexity 32.4 %, Grok 15.1 %, AI Overviews'], ['Reddit, foros y Quora', 'ChatGPT, Perplexity y Grok: cerca de 16 %'], ['Facebook, Instagram, Threads', 'Meta AI y Grok (Facebook 13.9 %)'], ['Reseñas, ficha de Google y directorios', 'Gemini y el Modo IA de Google'], ['Catálogos de tiendas', 'Copilot, ChatGPT Shopping y Meta AI']])}${src('Cruce de nuestra investigación de canales por motor con los estudios de las láminas anteriores. Los porcentajes son de EE. UU.')}` });
// 9 mexico
S.push({ k: 'EN MÉXICO', body: `<h1>Todos estos números son de EE. UU.</h1><p class="b2">Para México no encontramos un estudio equivalente. En categorías que investigamos aquí, Reddit casi no aparece y pesan más los grupos de Facebook y TikTok (inferido).</p><div class="sub">Lo básico que sí es público</div><ul class="ls"><li>Que robots.txt no bloquee los rastreadores de búsqueda de las IA.</li><li>Que tus páginas estén indexadas en Google y en Bing.</li><li>Que tus datos digan lo mismo en tu sitio, tu ficha y tus perfiles.</li></ul>` });
// 10 cierre
S.push({ k: 'MI CIERRE', body: `<h1>Qué se sabe y qué no</h1><div class="two"><div class="col ok"><div class="h">Se sabe</div><p>Cada IA cita distinto. Reddit pesa cerca de 16 % en ChatGPT, Perplexity y Grok (EE. UU.).</p></div><div class="col no"><div class="h">No se sabe</div><p>Cuánto pesa cada fuente en una respuesta: ningún motor lo publica. Si es igual en México. Qué cita Meta AI.</p></div></div><div class="r"></div><p class="b2"><b>Mi orden:</b> haz una pregunta de tus clientes, mira qué fuentes cita cada IA y corrige lo que encuentres desactualizado.</p>${src('Cruce de estudios de Ahrefs, Profound, Mentionbird y Everything-PR (2025 y 2026), documentación de Meta y un reporte de usuario. Prioridad de trabajo, no predicción de citas.')}` });
const css = `*{margin:0;padding:0;box-sizing:border-box}html,body{background:#050506}
@page{size:11.25in 14.0625in;margin:0}
.pg{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.w{position:absolute;inset:0;padding:88px 84px 76px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:#B89BFF;border:2px solid #B89BFF;border-radius:999px;padding:12px 26px}
.n{position:absolute;right:84px;top:96px;font-size:26px;font-weight:700;color:#86868B;letter-spacing:.08em}
.body{flex:1;display:flex;flex-direction:column;justify-content:center;padding-top:26px}
h1{font-size:78px;line-height:1.05;font-weight:700;letter-spacing:-.045em;text-wrap:balance}
h1.cv{font-size:92px}
.r{margin:44px 0 36px;height:3px;width:120px;background:#8E6BE0;border-radius:3px}
.b{font-size:46px;line-height:1.32;color:#D4D4D8;letter-spacing:-.012em}
.b2{margin-top:30px;font-size:34px;line-height:1.38;color:#D4D4D8}
.b2 b{color:#B89BFF}
blockquote{font-size:50px;line-height:1.28;letter-spacing:-.02em;color:#F7F7F8;border-left:6px solid #8E6BE0;padding-left:34px}
.sub{margin-top:40px;font-size:30px;font-weight:700;letter-spacing:.08em;color:#B89BFF;text-transform:uppercase}
.bars{margin-top:14px;display:flex;flex-direction:column;gap:14px}
.row{display:grid;grid-template-columns:190px 1fr 120px;align-items:center;gap:20px}
.lab{font-size:34px;color:#F7F7F8}
.track{height:40px;border-radius:12px;background:rgba(255,255,255,.07);overflow:hidden}
.fill{height:100%;border-radius:12px;background:linear-gradient(90deg,#5E30B5,#B89BFF)}
.val{font-size:36px;font-weight:700;color:#B89BFF;text-align:right}
.conc{margin-top:26px;font-size:40px;font-weight:700;letter-spacing:-.02em;color:#B89BFF;line-height:1.2}
.eco{margin-top:16px;display:flex;flex-direction:column;gap:12px}
.er{border:2px solid rgba(184,155,255,.35);background:rgba(94,48,181,.13);border-radius:22px;padding:18px 26px}
.ec{font-size:32px;font-weight:700;letter-spacing:-.015em}
.ei{margin-top:4px;font-size:27px;color:#A1A1A6;line-height:1.28}
.note{margin-top:18px;font-size:27px;line-height:1.3;color:#FFC66B}
.src{margin-top:34px;font-size:25px;line-height:1.35;color:#86868B}
.cards{margin-top:40px;display:flex;flex-direction:column;gap:26px}
.card{border:2px solid rgba(184,155,255,.4);background:rgba(94,48,181,.16);border-radius:30px;padding:34px 38px}
.big{font-size:104px;font-weight:700;letter-spacing:-.04em;color:#B89BFF;line-height:1}
.card .t{margin-top:14px;font-size:36px;line-height:1.28}
.card .s{margin-top:14px;font-size:26px;line-height:1.35;color:#A1A1A6}
.ls{margin-top:20px;list-style:none;display:flex;flex-direction:column;gap:18px}
.ls li{font-size:33px;line-height:1.32;color:#D4D4D8;padding-left:34px;position:relative}
.ls li:before{content:'';position:absolute;left:0;top:15px;width:14px;height:14px;border-radius:50%;background:#8E6BE0}
.ls b{color:#F7F7F8}
.two{margin-top:36px;display:grid;grid-template-columns:1fr 1fr;gap:20px}
.col{border-radius:28px;padding:30px 30px 34px;font-size:32px;line-height:1.32}
.col .h{font-size:28px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}
.col.ok{border:2px solid rgba(184,155,255,.5);background:rgba(94,48,181,.18)}.col.ok .h{color:#B89BFF}
.col.no{border:2px solid rgba(255,198,107,.5);background:rgba(255,198,107,.07)}.col.no .h{color:#FFC66B}`;
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><title>Qué fuentes cita cada IA: ChatGPT, Perplexity, Grok, Copilot, Claude y Gemini (2026)</title><style>${css}</style><body>${S.map((s, i) => `<section class="pg"><div class="g1"></div><div class="g2"></div><div class="w"><div class="k">${esc(s.k)}</div><div class="n">${i + 1} / ${S.length}</div><div class="body">${s.body}</div></div></section>`).join('')}</body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: 'Que-fuentes-cita-cada-IA-ChatGPT-Perplexity-Grok-Copilot-Claude-Gemini-2026.pdf', width: '11.25in', height: '14.0625in', printBackground: true, preferCSSPageSize: true });
  const rep = await pg.evaluate(() => [...document.querySelectorAll('section.pg')].map((sec, i) => { const P = sec.getBoundingClientRect(); const body = sec.querySelector('.body'); const last = [...body.children].pop().getBoundingClientRect(); const first = body.children[0].getBoundingClientRect(); return `${i + 1}: top ${Math.round(first.top - P.top)} bottom-gap ${Math.round(P.bottom - last.bottom)} bodyOverflow ${body.scrollHeight > body.clientHeight + 1}`; }));
  console.log(rep.join('\n'));
  const secs = await pg.$$('section.pg'); for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: `lamina-${i + 1}.png` });
  await b.close();
})();
