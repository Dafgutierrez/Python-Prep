// Carrusel del post del 2026-10-29 (ES y EN), v2 con la skill design-premium adaptada a la marca de Geonos.
// 1080 x 1350, texto seleccionable. Sistema: negro #050506, papel #F7F7F8, violeta #5E30B5, lila #B89BFF, coral #FF9EC0,
// rampa de titulares cielo, lila, rosa. Espaciado en escala de 8. Sin lima (la lima es solo para la marca del cliente).
// Uso: NODE_PATH=$(npm root -g) FONT_DIR=<carpeta con inter-latin-{400,600,700}-normal.woff2> node carrusel.cjs
const fs = require('fs'); const path = require('path'); const { chromium } = require('playwright');
const D = process.env.FONT_DIR.replace(/\/?$/, '/'); const b64 = (p) => fs.readFileSync(p).toString('base64');
const F = { 400: b64(D + 'inter-latin-400-normal.woff2'), 600: b64(D + 'inter-latin-600-normal.woff2'), 700: b64(D + 'inter-latin-700-normal.woff2') };
const V = '#8E6BE0', VL = '#B89BFF', SKY = '#9CC8FF', PINK = '#FF9EC0', MUTE = '#A1A1AA', INK = '#F7F7F8';
const css = `${[400, 600, 700].map((w) => `@font-face{font-family:Inter;font-weight:${w};src:url(data:font/woff2;base64,${F[w]}) format('woff2')}`).join('\n')}
@page{size:1080px 1350px;margin:0}*{margin:0;padding:0;box-sizing:border-box}html,body{background:#050506}
.pg{width:1080px;height:1350px;background:#050506;color:${INK};font-family:Inter,sans-serif;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.w{position:absolute;inset:0;padding:80px 88px 72px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.k{font-size:24px;font-weight:700;letter-spacing:.16em;color:${VL};border:2px solid ${VL};border-radius:999px;padding:10px 24px}
.n{font-size:24px;font-weight:700;color:${MUTE};letter-spacing:.08em}
h1{font-weight:700;letter-spacing:-.045em;line-height:1.06;text-wrap:balance}
.rp{background:linear-gradient(90deg,${SKY} 0%,#C2A8FF 52%,${PINK} 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.14em;padding-right:.1em;display:inline-block}
.lead{font-size:40px;line-height:1.28;color:#D4D4D8;letter-spacing:-.012em}
.src{font-size:24px;color:${MUTE};line-height:1.4}
.body{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:32px;min-height:0}
.card{background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.14);border-radius:32px}
.sq{display:flex;gap:24px;align-items:center;padding:28px 40px;font-size:40px;color:#fff;border-radius:999px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.22)}
.sl{margin-top:16px;padding:8px 0;border-radius:32px;background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.12)}
.sr{display:flex;gap:24px;align-items:center;padding:16px 40px;font-size:38px;color:#E4E4E7}
.sr.hl{color:#fff;background:rgba(142,107,224,.24)}
.se{padding:32px 40px;font-size:36px;color:${MUTE};border:3px dashed rgba(184,155,255,.5);border-radius:24px;margin:16px 24px;text-align:center}
.pill{display:inline-flex;align-items:center;gap:16px;font-size:36px;font-weight:600;padding:16px 32px;border-radius:999px;border:2px solid rgba(184,155,255,.55);background:rgba(142,107,224,.18);color:#fff}
.pill.mute{border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#E4E4E7;font-weight:400}
.prog{display:flex;gap:8px;margin-top:32px}.prog i{flex:1;height:8px;border-radius:4px;background:rgba(255,255,255,.16)}.prog i.on{background:${V}}
.lab{font-size:24px;font-weight:700;letter-spacing:.14em;color:${VL};margin-bottom:16px}
`;
const ic = {
  mag: (c = VL, s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" style="flex:none"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>`,
  arrow: (s = 64) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${VL}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v15M6 13l6 6 6-6"/></svg>`,
  globe: (s = 280) => `<svg width="${s}" height="${s}" viewBox="0 0 200 200" fill="none" stroke="${VL}" stroke-width="5" stroke-linecap="round"><defs><radialGradient id="gl"><stop offset="0" stop-color="${V}" stop-opacity=".5"/><stop offset="1" stop-color="${V}" stop-opacity=".1"/></radialGradient></defs><circle cx="100" cy="100" r="86" fill="url(#gl)"/><ellipse cx="100" cy="100" rx="38" ry="86"/><path d="M14 100h172M26 62h148M26 138h148"/></svg>`,
  check: (s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${VL}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-7"/></svg>`,
  cross: (s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${PINK}" stroke-width="2.6" stroke-linecap="round" style="flex:none"><circle cx="12" cy="12" r="10"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg>`,
  tag: (s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${VL}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.4"/></svg>`,
  door: (s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${VL}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="15" cy="12" r="1.2"/></svg>`,
  rep: (s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${VL}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4"/></svg>`,
};
const box = (q, items, empty, hlAll) => `<div><div class="sq">${ic.mag()}<span>${q}</span></div>` + (items.length ? `<div class="sl">${items.map((t) => `<div class="sr${hlAll ? ' hl' : ''}">${ic.mag('#71717A', 32)}<span>${t}</span></div>`).join('')}</div>` : `<div class="sl"><div class="se">${empty}</div></div>`) + `</div>`;
const rp = (t) => `<span class="rp">${t}</span>`;
const stepCard = (n, h, d) => `<div class="card" style="display:flex;gap:32px;align-items:center;padding:32px 40px;flex:1"><div style="flex:none;width:80px;height:80px;border-radius:50%;background:${V};font-size:44px;font-weight:700;display:flex;align-items:center;justify-content:center">${n}</div><div><div style="font-size:40px;font-weight:700;letter-spacing:-.02em;line-height:1.15">${h}</div><div style="font-size:30px;color:#C4C4CC;line-height:1.3;margin-top:8px">${d}</div></div></div>`;

const L = {
  es: { lang: 'es', file: 'Le-pregunte-a-Google-y-a-Bing-sobre-SEO-para-IA-y-GEO', title: 'Le pregunté a Google y a Bing sobre SEO para IA y GEO',
    slides: [
      ['LO QUE VI', `<h1 style="font-size:116px">Le pregunté a Google y a Bing sobre ${rp('SEO para IA y GEO')}</h1>
<div class="body" style="justify-content:flex-end;gap:32px">${box('cómo saber si mi marca aparece en chatgpt', [], 'Google: sin sugerencias')}
<div class="lead">La pregunta que más le importa a una marca ni siquiera tiene sugerencias.</div>
<div class="src">Autocompletado sin sesión iniciada ni historial, parámetros de México, 28 de octubre de 2026.</div></div>`],
      ['GOOGLE · MÉXICO', `<div class="body" style="justify-content:flex-start;gap:0"><div style="font-size:400px;font-weight:700;letter-spacing:-.06em;line-height:.9">${rp('0')}</div>
<h1 style="font-size:88px;margin-top:8px">sugerencias de Google</h1>
<div class="lead" style="margin-top:24px">Para “cómo saber si mi marca aparece en ChatGPT”.</div>
<div style="margin-top:auto">${box('cómo saber si mi marca aparece en chatgpt', [], 'Sin sugerencias')}</div></div>`],
      ['BING · MÉXICO', `<h1 style="font-size:100px">Bing entiende ${rp('otra pregunta')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px">
<div class="card" style="padding:32px 40px"><div class="lab">ESCRIBISTE</div><div style="font-size:42px;color:#fff;line-height:1.2">cómo saber si mi marca aparece en chatgpt</div></div>
<div style="display:flex;justify-content:center">${ic.arrow()}</div>
<div class="card" style="padding:32px 40px;border-color:${V};background:rgba(142,107,224,.16)"><div class="lab">BING COMPLETA CON</div>${['cómo saber si está hecho con chatgpt', 'cómo detectar que se usó chatgpt', 'páginas para que no se detecte chatgpt'].map((t) => `<div style="font-size:38px;color:#fff;padding:12px 0;line-height:1.2">${t}</div>`).join('')}</div>
<div class="lead" style="margin-top:auto">Lo lee como detectar texto escrito por IA, no como medir tu marca.</div></div>`],
      ['“QUÉ ES GEO”', `<h1 style="font-size:100px">Para un buscador, GEO es ${rp('geografía')}</h1>
<div class="body" style="justify-content:center;gap:48px;margin-top:32px"><div style="display:flex;gap:40px;align-items:center"><div style="flex:none">${ic.globe(380)}</div><div style="display:flex;flex-direction:column;gap:24px">${['geografía', 'geometría', 'geología', 'geopolítica'].map((t) => `<span class="pill mute" style="font-size:42px;padding:22px 40px">${t}</span>`).join('')}</div></div>
<div class="lead">Google y Bing completan “qué es geo” con esto. No uses la sigla como si ya significara lo que tú quieres.</div></div>`],
      ['“SEO PARA IA”', `<h1 style="font-size:100px">La gente aún pregunta ${rp('cómo se llama')}</h1>
<div class="body" style="justify-content:flex-start;gap:32px;margin-top:32px">${box('seo para ia', ['seo para ia cómo se llama', 'seo para ia curso', 'seo para ia nombre', 'agencia seo para ia'], '', true)}
<div class="lead" style="margin-top:auto">Habla como pregunta tu cliente, no como se llama tu industria.</div></div>`],
      ['MÉXICO · EE. UU.', `<h1 style="font-size:80px">En EE. UU. la categoría ya tiene nombre. En México, ${rp('todavía no')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px"><div style="display:flex;gap:24px;align-items:flex-start">
<div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px;border-color:${V}"><div class="lab">EE. UU. · GOOGLE</div><div style="font-size:40px;font-weight:700;line-height:1.1;margin-bottom:8px">ai visibility</div>${['tools', 'score', 'checker', 'tracker'].map((t) => `<span class="pill" style="font-size:32px;align-self:flex-start">${t}</span>`).join('')}</div>
<div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px"><div class="lab">MÉXICO · GOOGLE</div><div style="font-size:40px;font-weight:700;line-height:1.1;margin-bottom:8px">visibilidad en ia</div><div class="se" style="margin:0;font-size:32px;padding:32px 24px">Nada parecido a una herramienta</div></div></div>
<div class="lead" style="margin-top:auto">En EE. UU. la frase ya significa algo. En México todavía no.</div><div class="src">Fuente: autocompletado de Google, 28 de octubre de 2026.</div></div>`],
      ['LAS TRES RESPUESTAS', `<h1 style="font-size:92px">Contesto las que el buscador ${rp('no entiende')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px">${[[ic.tag(), '¿Cómo se llama el SEO para IA?', 'GEO, AEO o “SEO para IA”. Es la misma tarea: que una IA te nombre o te cite.'], [ic.door(), '¿Cómo aparecer en ChatGPT?', 'No hay una lista donde subir de lugar. Su rastreador tiene que poder entrar y tu página debe contestar primero.'], [ic.rep(), '¿Cómo saber si mi marca aparece?', 'Repite la pregunta de tu cliente y guarda cada respuesta con fecha. Una sola no prueba nada.']].map(([i, q, a]) => `<div class="card" style="padding:32px 40px;flex:1;display:flex;gap:32px;align-items:center">${i}<div><div style="font-size:40px;font-weight:700;letter-spacing:-.02em;line-height:1.15">${q}</div><div style="font-size:30px;color:#C4C4CC;line-height:1.3;margin-top:8px">${a}</div></div></div>`).join('')}</div>`],
      ['LO QUE YO HARÍA', `<h1 style="font-size:100px">Esta semana, ${rp('cuatro pasos')}</h1>
<div class="body" style="justify-content:flex-start;gap:16px;margin-top:32px">${stepCard('1', 'Escribe como tu cliente', 'Tu servicio con sus palabras, no con las de tu industria.')}${stepCard('2', 'Búscalo en Google y en Bing', 'Anota qué completan. Si completan otra cosa, tu palabra significa otra cosa.')}${stepCard('3', 'Respóndelo en una página', 'En las primeras líneas y con sus palabras.')}${stepCard('4', 'Repítelo en un mes', 'Cambia: “el seo ha muerto” completaba el 10 de octubre y hoy ya no.')}</div>`],
      ['EL LÍMITE', `<h1 style="font-size:92px">El autocompletado ${rp('no es volumen')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px">
<div style="display:flex;gap:24px"><div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px;align-items:flex-start">${ic.check()}<div style="font-size:34px;font-weight:600;line-height:1.2">Muestra que la pregunta existe</div></div><div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px;align-items:flex-start">${ic.cross()}<div style="font-size:34px;font-weight:600;line-height:1.2">No dice cuánta gente la hace</div></div></div>
<div class="card" style="padding:40px;border-color:${V};background:rgba(142,107,224,.16);flex:1;display:flex;align-items:center"><div style="font-size:56px;font-weight:700;letter-spacing:-.03em;line-height:1.15">¿Qué completa Google cuando escribes la pregunta más importante de tu negocio?</div></div>
<div class="src">Cambia con el lugar y el tiempo, aun sin sesión ni historial. Fuentes: autocompletado de Google y Bing con parámetros de México y EE. UU. (28 de octubre de 2026); SparkToro y Gumshoe.ai (28 de enero de 2026); documentación de bots de OpenAI.</div></div>`],
    ] },
  en: { lang: 'en', file: 'I-asked-Google-and-Bing-about-GEO-AEO-and-AI-visibility', title: 'I asked Google and Bing about GEO, AEO and AI visibility',
    slides: [
      ['WHAT I SAW', `<h1 style="font-size:116px">I asked Google and Bing about ${rp('GEO, AEO and AI visibility')}</h1>
<div class="body" style="justify-content:flex-end;gap:32px">${box('how to know if chatgpt mentions my brand', [], 'Google: no suggestions')}
<div class="lead">The question a brand needs answered most does not get a single suggestion.</div>
<div class="src">Autocomplete, signed out, no history, 28 October 2026.</div></div>`],
      ['GOOGLE · US', `<div class="body" style="justify-content:flex-start;gap:0"><div style="font-size:400px;font-weight:700;letter-spacing:-.06em;line-height:.9">${rp('0')}</div>
<h1 style="font-size:88px;margin-top:8px">Google suggestions</h1>
<div class="lead" style="margin-top:24px">For “how to know if ChatGPT mentions my brand”.</div>
<div style="margin-top:auto">${box('how to know if chatgpt mentions my brand', [], 'No suggestions')}</div></div>`],
      ['BING · US', `<h1 style="font-size:100px">Bing splits the question ${rp('in two')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px">
<div class="card" style="padding:32px 40px"><div class="lab">YOU TYPED</div><div style="font-size:42px;color:#fff;line-height:1.2">how to know if chatgpt mentions my brand</div></div>
<div style="display:flex;justify-content:center">${ic.arrow()}</div>
<div class="card" style="padding:32px 40px;border-color:${V};background:rgba(142,107,224,.16)"><div class="lab">BING COMPLETES WITH</div>${['how to monitor brand mentions in chatgpt', 'how to see brand visibility in chatgpt', 'how to know if someone used chatgpt', 'can companies tell if you use chatgpt'].map((t) => `<div style="font-size:36px;color:#fff;padding:10px 0;line-height:1.2">${t}</div>`).join('')}</div>
<div class="lead" style="margin-top:auto">Half brand monitoring, half detecting AI-written text.</div></div>`],
      ['“HOW TO SHOW UP IN CHATGPT”', `<h1 style="font-size:92px">Ask Bing how to show up in ChatGPT: ${rp('Turnitin')}</h1>
<div class="body" style="justify-content:flex-start;gap:32px;margin-top:32px">${box('how to show up in chatgpt', ['does chatgpt show up on turnitin', 'does chatgpt show up on plagiarism checkers', 'how to detect chatgpt', 'how to check for chatgpt'], '', true)}
<div class="lead" style="margin-top:auto">Google completes it as results, searches and “a winning aeo playbook.”</div></div>`],
      ['“WHAT IS GEO”', `<h1 style="font-size:100px">To a search engine, GEO is ${rp('geography')}</h1>
<div class="body" style="justify-content:center;gap:48px;margin-top:32px"><div style="display:flex;gap:40px;align-items:center"><div style="flex:none">${ic.globe(380)}</div><div style="display:flex;flex-direction:column;gap:24px">${['geocaching', 'geography', 'geometry', 'geology'].map((t) => `<span class="pill mute" style="font-size:42px;padding:22px 40px">${t}</span>`).join('')}</div></div>
<div class="lead">AEO already got its own: “aeo vs seo” and “aeo and geo.”</div></div>`],
      ['“AI VISIBILITY”', `<h1 style="font-size:92px">Some words are ${rp('already claimed')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px"><div style="display:flex;gap:24px;align-items:flex-start">
<div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px;border-color:${V}"><div class="lab">GOOGLE US</div><div style="font-size:40px;font-weight:700;line-height:1.1;margin-bottom:8px">ai visibility</div>${['tools', 'score', 'checker', 'tracker', 'agency'].map((t) => `<span class="pill" style="font-size:32px;align-self:flex-start">${t}</span>`).join('')}</div>
<div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px"><div class="lab">GOOGLE US</div><div style="font-size:40px;font-weight:700;line-height:1.1;margin-bottom:8px">what is geo</div>${['geocaching', 'geography', 'geometry'].map((t) => `<span class="pill mute" style="font-size:32px;align-self:flex-start">${t}</span>`).join('')}</div></div>
<div class="lead" style="margin-top:auto">Words with their own meaning get found. GEO still means geography.</div><div class="src">Source: Google autocomplete, 28 October 2026.</div></div>`],
      ['THE THREE ANSWERS', `<h1 style="font-size:92px">Answers to the ones search engines ${rp('do not settle')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px">${[[ic.tag(), 'AEO or GEO?', 'Close to the same task: getting an AI to name or cite you. What matters is what you measure.'], [ic.door(), 'How do I show up in ChatGPT?', 'There is no list to climb. Its crawler has to get in, and your page should answer first.'], [ic.rep(), 'Does ChatGPT mention my brand?', 'Repeat your customer’s question and save each answer with its date. One run proves nothing.']].map(([i, q, a]) => `<div class="card" style="padding:32px 40px;flex:1;display:flex;gap:32px;align-items:center">${i}<div><div style="font-size:40px;font-weight:700;letter-spacing:-.02em;line-height:1.15">${q}</div><div style="font-size:30px;color:#C4C4CC;line-height:1.3;margin-top:8px">${a}</div></div></div>`).join('')}</div>`],
      ['WHAT I WOULD DO', `<h1 style="font-size:100px">This week, ${rp('four steps')}</h1>
<div class="body" style="justify-content:flex-start;gap:16px;margin-top:32px">${stepCard('1', 'Write it like your customer', 'Your service in their words, not your industry’s.')}${stepCard('2', 'Type it into Google and Bing', 'Note what they complete. If it is something else, your word means something else.')}${stepCard('3', 'Answer it on one page', 'In the first lines, in their words.')}${stepCard('4', 'Check again in a month', 'It moves: a Mexico suggestion from 10 October was gone on 28 October.')}</div>`],
      ['THE LIMIT', `<h1 style="font-size:92px">Autocomplete is ${rp('not search volume')}</h1>
<div class="body" style="justify-content:flex-start;gap:24px;margin-top:32px">
<div style="display:flex;gap:24px"><div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px;align-items:flex-start">${ic.check()}<div style="font-size:34px;font-weight:600;line-height:1.2">It shows a question exists</div></div><div class="card" style="flex:1;padding:32px;display:flex;flex-direction:column;gap:16px;align-items:flex-start">${ic.cross()}<div style="font-size:34px;font-weight:600;line-height:1.2">It does not say how many ask it</div></div></div>
<div class="card" style="padding:40px;border-color:${V};background:rgba(142,107,224,.16);flex:1;display:flex;align-items:center"><div style="font-size:56px;font-weight:700;letter-spacing:-.03em;line-height:1.15">What does Google complete when you type the most important question for your business?</div></div>
<div class="src">It changes with place and time, even with no sign-in or history. Sources: Google and Bing autocomplete with US and Mexico parameters (28 October 2026); SparkToro and Gumshoe.ai (28 January 2026); OpenAI bots documentation.</div></div>`],
    ] },
};

(async () => {
  const out = path.join(__dirname, 'carrusel'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const key of ['es', 'en']) {
    const c = L[key]; const N = c.slides.length;
    const pages = c.slides.map(([k, inner], i) => `<section class="pg"><div class="g1"></div><div class="g2"></div><div class="w"><div class="top"><div class="k">${k}</div><div class="n">${i + 1} / ${N}</div></div>${inner}<div class="prog">${c.slides.map((_, j) => `<i class="${j <= i ? 'on' : ''}"></i>`).join('')}</div></div></section>`);
    const html = `<!doctype html><html lang="${c.lang}"><meta charset="utf-8"><title>${c.title}</title><style>${css}</style><body>${pages.join('')}</body></html>`;
    const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
    await pg.pdf({ path: path.join(out, `${key}-${c.file}.pdf`), width: '1080px', height: '1350px', printBackground: true, preferCSSPageSize: true });
    const secs = await pg.$$('section.pg');
    for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: path.join(out, `${key}-lamina-${String(i + 1).padStart(2, '0')}.png`) });
    const rep = await pg.evaluate(() => {
      const o = [];
      document.querySelectorAll('section.pg').forEach((sec, i) => {
        const P = sec.getBoundingClientRect(); const w = sec.querySelector('.w'); const iss = [];
        const body = sec.querySelector('.body'); const prog = sec.querySelector('.prog').getBoundingClientRect();
        const kids = [...w.children].filter((e) => !e.classList.contains('top') && !e.classList.contains('prog'));
        let lastBottom = 0; sec.querySelectorAll('.w *').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && !e.closest('.prog') && !e.closest('.top')) lastBottom = Math.max(lastBottom, r.bottom - P.top); });
        const gap = prog.top - P.top - lastBottom; if (gap > 150) iss.push('dead space ' + Math.round(gap) + 'px above the progress bar');
        if (lastBottom > prog.top - P.top - 16) iss.push('content touches the progress bar');
        sec.querySelectorAll('.w *').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > P.right - 70 || r.left < P.left + 70) && !e.closest('.prog')) iss.push('side margin ' + (e.className || e.tagName)); if (e.scrollHeight > e.clientHeight + 2 && getComputedStyle(e).overflow !== 'visible') iss.push('clip ' + e.className); });
        o.push((i + 1) + ': ' + (iss.length ? [...new Set(iss)].slice(0, 4).join(' | ') : 'ok'));
      });
      return o;
    });
    console.log(key + '\n' + rep.join('\n'));
    await pg.close();
  }
  await b.close();
})();
