// Visual proposals for the Amazon-only (Alexa for Shopping and Amazon SEO) dashboard. EXAMPLE data, labelled as such. Kit tokens.
const { chromium } = require('playwright'); const path = require('path');
const { css, C } = require('../kit-visual/componentes.cjs');
const NAV = ['Resumen', 'Prompts de Alexa', 'Qué le importa a la gente', 'Keywords', 'Competidores', 'Optimizar por ASIN', 'Acciones'];
const chip = (t, o = {}) => `<span class="chip ${o.cls || ''}">${t}</span>`;
const shell = (active, eyebrow, title, desc, main) => `<!doctype html><meta charset="utf-8"><style>${css()}
*{box-sizing:border-box}body{background:${C.bg};color:${C.ink};font-family:Inter,sans-serif;font-size:15px;line-height:1.4;width:1440px}
.app{display:flex;min-height:900px;position:relative;overflow:hidden}
.glow{position:absolute;left:200px;top:-420px;width:1200px;height:900px;border-radius:50%;background:radial-gradient(circle,${C.glow1} 0%,rgba(94,48,181,0) 62%);pointer-events:none}
.sb{width:248px;flex:none;padding:26px 18px;border-right:1px solid ${C.hair};position:relative}
.logo{font-weight:700;font-size:22px;letter-spacing:-.03em;margin:0 10px 6px}.logo span{color:${C.lilac}}
.path{font-size:12px;color:${C.mute};margin:0 10px 22px;line-height:1.35}
.ni{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;font-size:14px;color:${C.sub};margin-bottom:2px}
.ni i{width:8px;height:8px;border-radius:2px;background:${C.gray};flex:none}
.ni.on{background:${C.hl2};color:${C.strong};font-weight:600}.ni.on i{background:${C.lilac}}
.sbx{margin:18px 10px 0;padding-top:14px;border-top:1px solid ${C.hair};font-size:12px;color:${C.mute}}
.mn{flex:1;min-width:0;padding:28px 34px 40px;position:relative}
.eb{font-size:12px;font-weight:700;letter-spacing:.14em;color:${C.lilac}}
.ttl{font-size:40px;font-weight:700;letter-spacing:-.04em;line-height:1.1;margin:6px 0 4px;padding-bottom:4px}
.desc{color:${C.soft};max-width:760px;font-size:15px}
.hd{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:20px}
.card{background:${C.card};border:1px solid ${C.hair};border-radius:18px;padding:20px 22px;box-shadow:${C.shadow}}
.card.hl{border-color:${C.violet};background:${C.hl}}
.lab{font-size:11.5px;font-weight:700;letter-spacing:.14em;color:${C.mute};margin-bottom:12px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:4px 11px;border-radius:999px;font-size:12.5px;font-weight:600;border:1px solid ${C.hair};color:${C.soft};white-space:nowrap}
.chip.v{background:${C.violet};border-color:${C.violet};color:#fff}.chip.ex{border-style:dashed;color:${C.mute}}.chip.ok{color:${C.d3};border-color:${C.d3}}.chip.no{color:${C.pink};border-color:${C.pink}}.chip.hl{background:${C.hl2};border-color:${C.violet};color:${C.strong}}
.grid{display:grid;gap:16px}.big{font-size:44px;font-weight:700;letter-spacing:-.04em;line-height:1}.sm{font-size:13px;color:${C.mute}}
.bar{height:10px;border-radius:5px;background:${C.progOff};overflow:hidden}.bar b{display:block;height:100%;border-radius:5px;background:${C.violet}}
.row{display:flex;align-items:center;gap:14px}.grow{flex:1;min-width:0}
table{width:100%;border-collapse:collapse}th{font-size:11.5px;letter-spacing:.12em;color:${C.mute};text-align:left;padding:0 10px 10px;border-bottom:1px solid ${C.hair};font-weight:700}
td{padding:13px 10px;border-bottom:1px solid ${C.hair};vertical-align:top;font-size:14px;color:${C.soft}}
.foot{margin-top:18px;font-size:12.5px;color:${C.mute}}
.btn{display:inline-block;padding:9px 16px;border-radius:999px;font-size:13px;font-weight:700;background:${C.violet};color:#fff}.btn.g{background:transparent;border:1px solid ${C.hair};color:${C.soft}}
mark{background:${C.hl2};color:${C.strong};padding:0 3px;border-radius:4px}
</style><div class="app"><div class="glow"></div>
<div class="sb"><div class="logo">Geo<span>nos</span></div><div class="path">Acme Outdoor<br>Alexa for Shopping y Amazon SEO</div>
${NAV.map((n) => `<div class="ni ${n === active ? 'on' : ''}"><i></i>${n}</div>`).join('')}
<div class="sbx">Seller Central: opcional<br>Conéctalo para ver ventas reales. Esta vista funciona sin él.</div></div>
<div class="mn"><div class="hd"><div><div class="eb">${eyebrow}</div><div class="ttl">${title}</div><div class="desc">${desc}</div></div>${chip('Datos de ejemplo', { cls: 'ex' })}</div>${main}</div></div>`;

const S1 = shell('Resumen', 'ACME OUTDOOR · ALEXA FOR SHOPPING Y AMAZON SEO', 'Resumen', 'Lo que Alexa dice cuando alguien pregunta por tus productos, y qué hacer primero.', `
<div class="card" style="margin-bottom:16px"><div class="row"><div class="grow"><div style="font-weight:700;font-size:15px">Construyendo historial · día 3 de 14</div><div class="sm">Las tendencias aparecen desde la segunda semana. Hoy ya tienes respuestas, recomendaciones y keywords.</div></div><div style="width:260px"><div class="bar"><b style="width:21%"></b></div></div></div></div>
<div class="grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
 <div class="card"><div class="lab">TE CITA EN</div><div class="big">6 <span style="font-size:22px;color:${C.mute};letter-spacing:0">de 15 prompts</span></div><div class="sm" style="margin-top:8px">Primera corrida · 7 nov 2026</div></div>
 <div class="card"><div class="lab">POSICIÓN CUANDO TE CITA</div><div class="big">2.3</div><div class="sm" style="margin-top:8px">1 es el primer producto de la respuesta</div></div>
 <div class="card"><div class="lab">SHARE OF VOICE</div><div style="font-size:21px;font-weight:700;line-height:1.2;margin-top:4px">Aún no se mide</div><div class="sm" style="margin-top:8px">Se calcula desde la 3.ª corrida (hoy 1 de 3)</div></div>
</div>
<div class="grid" style="grid-template-columns:1.25fr 1fr;margin-bottom:16px">
 <div class="card"><div class="lab">TE CITA, POR CATEGORÍA</div>
  ${[['Botas impermeables', 3, 5], ['Senderismo ligero', 2, 4], ['Trail running', 1, 3], ['Calcetines técnicos', 0, 3]].map(([n, a, b]) => `<div class="row" style="margin-bottom:12px"><div style="width:170px;font-size:14px;color:${C.strong}">${n}</div><div class="grow bar"><b style="width:${a / b * 100}%"></b></div><div style="width:48px;text-align:right;font-weight:700;font-size:14px">${a}/${b}</div></div>`).join('')}</div>
 <div class="card"><div class="lab">QUIÉN APARECE CUANDO TÚ NO</div>
  ${[['TrailForge', 7], ['Northbeam', 5], ['Ridgeline', 3]].map(([n, v]) => `<div class="row" style="margin-bottom:12px"><div style="width:100px;font-size:14px;color:${C.strong}">${n}</div><div class="grow bar"><b style="width:${v / 7 * 100}%;background:${C.d2}"></b></div><div style="width:70px;text-align:right;font-size:13px;color:${C.mute}">${v} prompts</div></div>`).join('')}</div>
</div>
<div class="card hl"><div class="row"><div class="grow"><div class="lab" style="color:${C.lilac}">QUÉ HACER PRIMERO</div><div style="font-size:17px;font-weight:700;letter-spacing:-.01em">En 5 prompts de "botas impermeables", Alexa nombra a TrailForge. Su ficha responde "¿aguanta lluvia fuerte?" y la tuya no.</div><div class="sm" style="margin-top:6px">Recomendación lista para el ASIN B0EXAMPLE1: título, bullets, backend y lista de tomas.</div></div><span class="btn">Ver recomendación</span></div></div>
<div class="foot">Las cifras de esta pantalla salen de las respuestas de Alexa que guardan tus agentes. Cada número abre las respuestas que lo respaldan.</div>`);

const ans = `Para senderismo con lluvia, <mark>Acme TrailShield</mark> es una opción: sus reseñas mencionan que aguanta caminatas bajo lluvia. TrailForge Storm y Northbeam Peak también son populares…`;
const S2 = shell('Prompts de Alexa', 'ACME OUTDOOR · ALEXA FOR SHOPPING Y AMAZON SEO', 'Prompts de Alexa', 'La pregunta, lo que Alexa respondió y qué productos nombró, con fecha.', `
<div class="row" style="margin-bottom:14px;flex-wrap:wrap;gap:8px">${chip('Todas', { cls: 'hl' })}${chip('Descubrimiento')}${chip('Comparación')}${chip('Decisión')}${chip('Te cita: sí')}${chip('Te cita: no')}<span class="grow"></span><span class="sm">15 de 25 prompts de Alexa en uso</span></div>
<div class="card" style="padding:8px 8px 4px"><table><thead><tr><th style="width:36%">PROMPT</th><th>ETAPA</th><th>CATEGORÍA</th><th>¿TE CITA?</th><th>POS.</th><th>PRODUCTOS QUE NOMBRÓ</th></tr></thead><tbody>
${[
  ['¿Qué botas impermeables aguantan lluvia fuerte?', 'Comparación', 'Botas impermeables', 0, '—', ['TrailForge Storm', 'Northbeam Peak']],
  ['Botas para senderismo bajo $150', 'Decisión', 'Botas impermeables', 1, '2', ['Northbeam Peak', 'Acme TrailShield', 'Ridgeline 2']],
  ['¿Qué calcetines evitan ampollas en trail?', 'Descubrimiento', 'Calcetines técnicos', 0, '—', ['Ridgeline Sock', 'TrailForge Merino']],
  ['Zapatillas trail running para principiantes', 'Descubrimiento', 'Trail running', 1, '3', ['Northbeam Fly', 'Ridgeline Run', 'Acme TrailRun']],
].map(([p, s, c, y, pos, prods]) => `<tr><td style="color:${C.strong};font-weight:600">${p}</td><td>${s}</td><td>${c}</td><td>${y ? chip('Sí', { cls: 'ok' }) : chip('No', { cls: 'no' })}</td><td>${pos}</td><td><div style="display:flex;flex-wrap:wrap;gap:6px">${prods.map((x) => chip(x, { cls: x.startsWith('Acme') ? 'v' : '' })).join('')}</div></td></tr>`).join('')}
</tbody></table></div>
<div class="card hl" style="margin-top:16px"><div class="row" style="margin-bottom:10px"><div class="lab" style="margin:0;color:${C.lilac}">RESPUESTA GUARDADA · "Botas para senderismo bajo $150"</div><span class="grow"></span><span class="sm">Alexa for Shopping · EE. UU. · 7 nov 2026, 09:14 · captura adjunta</span></div>
<div style="font-size:16px;color:${C.strong};line-height:1.5;max-width:900px">${ans}</div>
<div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap"><span class="sm">Productos mostrados:</span>${chip('1 Northbeam Peak · $139')}${chip('2 Acme TrailShield · $129', { cls: 'v' })}${chip('3 Ridgeline 2 · $145')}${chip('Anuncio: Northbeam Peak', { cls: 'ex' })}</div>
<div class="sm" style="margin-top:10px">Búsquedas que Alexa mostró en pantalla: solo se guardan si Alexa las enseña (por verificar en una captura real).</div></div>
<div class="foot">Una respuesta es una muestra: Alexa puede cambiar entre corridas y entre compradores. Por eso se repite cada día antes de dar un porcentaje.</div>`);

const themes = [
  ['Impermeabilidad', 46, '“Aguantó una semana de lluvia sin mojarse.”', 'Reseñas públicas', 'Sí', '1,600/mes'],
  ['Comodidad en caminatas largas', 31, '“Después de 15 km seguía cómoda.”', 'Preguntas y respuestas', 'Parcial', '880/mes'],
  ['Agarre en terreno mojado', 22, '“¿La suela agarra en roca mojada?”', 'Preguntas y respuestas', 'No', 'No medido'],
  ['Ajuste y talla', 19, '“Corre media talla chica.”', 'Reseñas públicas', 'Parcial', '540/mes'],
  ['Precio frente a durabilidad', 12, '“Vale lo que cuestan si duran dos años.”', 'Reddit', 'No', 'No medido'],
];
const S3 = shell('Qué le importa a la gente', 'ACME OUTDOOR · ALEXA FOR SHOPPING Y AMAZON SEO', 'Qué le importa a la gente', 'Los temas que más aparecen en la evidencia pública de cada categoría, y si tu ficha los responde.', `
<div class="row" style="margin-bottom:14px;flex-wrap:wrap;gap:8px">${chip('Botas impermeables', { cls: 'hl' })}${chip('Senderismo ligero')}${chip('Trail running')}${chip('Calcetines técnicos')}<span class="grow"></span>${chip('Fuentes: reseñas, preguntas, Reddit, respuestas de Alexa', { cls: 'ex' })}</div>
<div class="card" style="padding:8px 8px 4px"><table><thead><tr><th style="width:22%">TEMA</th><th style="width:20%">FRAGMENTOS QUE LO MENCIONAN</th><th style="width:28%">UN EJEMPLO REAL</th><th>FUENTE</th><th>TU FICHA LO RESPONDE</th><th>KEYWORD (HELIUM 10)</th></tr></thead><tbody>
${themes.map(([t, n, q, s, a, v]) => `<tr><td style="color:${C.strong};font-weight:700">${t}</td><td><div class="row"><div class="grow bar"><b style="width:${n / 46 * 100}%"></b></div><b style="color:${C.strong}">${n}</b></div></td><td style="font-style:italic">${q}</td><td>${chip(s)}</td><td>${chip(a, { cls: a === 'Sí' ? 'ok' : a === 'No' ? 'no' : '' })}</td><td>${v === 'No medido' ? `<span class="sm">volumen no medido</span>` : `<b style="color:${C.strong}">${v}</b>`}</td></tr>`).join('')}
</tbody></table></div>
<div class="grid" style="grid-template-columns:1fr 1fr;margin-top:16px">
 <div class="card"><div class="lab">DE DÓNDE SALE ESTA VISTA</div><div style="font-size:14px">124 fragmentos de evidencia pública de los últimos 30 días, recogidos por tus agentes: reseñas visibles sin iniciar sesión, preguntas y respuestas, hilos de Reddit y lo que Alexa explica al recomendar. Cada tema abre sus fragmentos con enlace y fecha.</div></div>
 <div class="card hl"><div class="lab" style="color:${C.lilac}">LO QUE SIGNIFICA</div><div style="font-size:14px;color:${C.strong}">Es cuántas veces aparece cada tema en lo que la gente escribe, <b>no</b> volumen de búsqueda ni de conversaciones con Alexa. El volumen sale de Helium 10 y, si una keyword no tiene fila, dice "no medido".</div></div>
</div>
<div class="foot">Los dos temas sin respuesta en tu ficha (agarre en mojado, precio frente a durabilidad) pasan directo a la recomendación del ASIN.</div>`);

const S4 = shell('Optimizar por ASIN', 'ACME OUTDOOR · ALEXA FOR SHOPPING Y AMAZON SEO', 'Optimizar por ASIN', 'Una recomendación por producto, con los prompts y las keywords a las que apunta.', `
<div class="row" style="margin-bottom:14px;flex-wrap:wrap;gap:8px">${chip('B0EXAMPLE1 · TrailShield', { cls: 'hl' })}${chip('B0EXAMPLE2 · TrailRun')}${chip('B0EXAMPLE3 · Sock Pro')}<span class="grow"></span>${chip('Nivel de evidencia: práctica de mercado', { cls: 'ex' })}</div>
<div class="grid" style="grid-template-columns:1.35fr 1fr;align-items:start">
 <div class="grid">
  <div class="card"><div class="row" style="margin-bottom:8px"><div class="lab" style="margin:0">TÍTULO PROPUESTO</div><span class="grow"></span>${chip('75 de 75 caracteres', { cls: 'ok' })}</div>
   <div style="font-size:17px;font-weight:700;color:${C.strong};letter-spacing:-.01em">Acme TrailShield Botas Impermeables de Senderismo para Mujer, Lluvia Fuerte</div>
   <div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap"><span class="sm">Va por:</span>${chip('"¿Qué botas impermeables aguantan lluvia fuerte?"')}${chip('waterproof hiking boots · 1,600/mes')}</div></div>
  <div class="card"><div class="lab">BULLETS (2 DE 5)</div>
   <div style="font-size:14px;color:${C.strong};margin-bottom:8px"><b>Aguanta lluvia fuerte:</b> membrana sellada probada en caminatas de varios días bajo lluvia continua.</div>
   <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:14px"><span class="sm">Responde:</span>${chip('Impermeabilidad', { cls: 'v' })}${chip('keyword: rain hiking boots · volumen no medido', { cls: 'ex' })}</div>
   <div style="font-size:14px;color:${C.strong};margin-bottom:8px"><b>Agarre en roca mojada:</b> suela con tacos de 5 mm y compuesto antideslizante.</div>
   <div class="row" style="gap:8px;flex-wrap:wrap"><span class="sm">Responde:</span>${chip('Agarre en terreno mojado', { cls: 'v' })}${chip('keyword: slip resistant hiking boots · 540/mes')}</div></div>
  <div class="card"><div class="lab">BACKEND SEARCH TERMS</div><div style="font-size:14px;color:${C.strong}">botas trekking mujer calzado montaña lluvia botas senderismo sellado</div><div class="sm" style="margin-top:6px">68 caracteres, separados por espacios, sin repetir palabras del título.</div></div>
 </div>
 <div class="grid">
  <div class="card"><div class="lab">LISTA DE TOMAS (IMÁGENES): DIRECCIÓN, NO IMAGEN</div>
   ${[['Principal', 'Bota completa sobre fondo blanco, sin accesorios.', ''], ['Estilo de vida', 'Caminata bajo lluvia, mostrando el agua resbalar.', 'Impermeabilidad'], ['Suela', 'Primer plano de la suela sobre roca mojada.', 'Agarre en mojado'], ['Tallas', 'Guía de talla con la nota "corre media talla chica".', 'Ajuste y talla']].map(([a, b, c], i) => `<div class="row" style="align-items:flex-start;margin-bottom:10px"><div style="width:26px;height:26px;border-radius:50%;background:${C.violet};color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex:none">${i + 1}</div><div class="grow"><div style="font-size:14px;color:${C.strong};font-weight:600">${a}</div><div class="sm">${b}</div>${c ? `<div style="margin-top:4px">${chip('Responde: ' + c)}</div>` : ''}</div></div>`).join('')}
   <div class="sm">En el tono de la marca: cercano, técnico y sin exagerar. Sin regla probada de Amazon sobre imágenes.</div></div>
  <div class="card"><div class="lab">PREGUNTAS Y RESPUESTAS (APARTE, NO VAN EN LA DESCRIPCIÓN)</div><div style="font-size:14px;color:${C.strong}"><b>¿Aguanta lluvia fuerte?</b><div class="sm" style="margin-top:2px">Sí. Membrana sellada, probada en lluvia continua de varios días.</div></div></div>
 </div>
</div>
<div class="card" style="margin-top:16px"><div class="row"><div class="lab" style="margin:0;width:150px">ACCIONES</div>
 ${[['Registradas', 12, false], ['Publicadas', 5, false], ['Citadas por Alexa', 1, true]].map(([n, v, h]) => `<div class="grow" style="${h ? `color:${C.lilac}` : ''}"><div style="font-size:26px;font-weight:700;letter-spacing:-.03em">${v}</div><div class="sm">${n}</div></div>`).join('')}
 <span class="btn g">Marcar como publicado</span><span class="btn">Aprobar y exportar</span></div></div>
<div class="foot">"Publicada" lo marcas tú cuando subes el cambio en Seller Central. "Citada" lo confirma Geonos en las siguientes corridas de Alexa.</div>`);

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  for (const [f, h] of [['1-resumen', S1], ['2-prompts', S2], ['3-que-le-importa', S3], ['4-optimizar-asin', S4]]) {
    await p.setContent(h); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, `${f}.png`), fullPage: true }); console.log(f);
  }
  await b.close();
})();
