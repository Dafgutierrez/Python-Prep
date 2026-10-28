// Carrusel del post del 2026-10-29: "Le pregunté a Google y a Bing" (ES y EN). 1080 x 1350, texto seleccionable.
// Uso: NODE_PATH=$(npm root -g) FONT_DIR=<carpeta con inter-latin-400-normal.woff2 y inter-latin-700-normal.woff2> node carrusel.cjs
const fs = require('fs'); const path = require('path'); const { chromium } = require('playwright');
const D = process.env.FONT_DIR.replace(/\/?$/, '/');
const b64 = (p) => fs.readFileSync(p).toString('base64');
const f4 = b64(D + 'inter-latin-400-normal.woff2'), f7 = b64(D + 'inter-latin-700-normal.woff2');
const V = '#8E6BE0', VL = '#B89BFF', G = '#D4D4D8', GR = '#86868B', LIME = '#C6F135';
const css = `@font-face{font-family:Inter;font-weight:400;src:url(data:font/woff2;base64,${f4}) format('woff2')}
@font-face{font-family:Inter;font-weight:700;src:url(data:font/woff2;base64,${f7}) format('woff2')}
@page{size:11.25in 14.0625in;margin:0}*{margin:0;padding:0;box-sizing:border-box}html,body{background:#050506}
.pg{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.w{position:absolute;inset:0;padding:88px 88px 80px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:${VL};border:2px solid ${VL};border-radius:999px;padding:11px 26px}
.n{position:absolute;right:88px;top:96px;font-size:26px;font-weight:700;color:${GR};letter-spacing:.08em}
h1{font-weight:700;letter-spacing:-.045em;line-height:1.05;text-wrap:balance}
.b{font-size:42px;line-height:1.3;color:${G};letter-spacing:-.012em}
.src{margin-top:auto;font-size:24px;color:${GR};line-height:1.35}
.vis{display:flex;justify-content:center;align-items:center}
.card{background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.14);border-radius:28px}
.sb{width:900px}
.sbq{display:flex;gap:22px;align-items:center;padding:28px 36px;font-size:40px;color:#fff;border-radius:999px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.22)}
.sbl{margin-top:16px;padding:10px 0;border-radius:28px;background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.12)}
.sbr{display:flex;gap:22px;align-items:center;padding:17px 36px;font-size:38px;color:${G}}
.sbr.hl{color:#fff;background:rgba(142,107,224,.22)}
.sbe{padding:28px 36px;font-size:36px;color:${GR};border:3px dashed rgba(184,155,255,.5);border-radius:22px;margin:14px 20px;text-align:center}
.tag{font-size:26px;font-weight:700;letter-spacing:.14em;color:${LIME};margin-bottom:14px;margin-top:6px}
`;
const mag = (c, s = 36) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" style="flex:none"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>`;
const box = (q, items, empty, hlFrom) => `<div class="sb"><div class="sbq">${mag(VL, 44)}<span>${q}</span></div>` +
  (items.length ? `<div class="sbl">${items.map((t, i) => `<div class="sbr${hlFrom != null && i >= hlFrom ? ' hl' : ''}">${mag(GR, 30)}<span>${t}</span></div>`).join('')}</div>` : `<div class="sbl"><div class="sbe">${empty}</div></div>`) + `</div>`;
const lab = (t) => `<div class="tag">${t}</div>`;
const wrap = (inner, i, N, k) => `<section class="pg"><div class="g1"></div><div class="g2"></div><div class="w"><div class="k">${k}</div><div class="n">${i} / ${N}</div>${inner}</section>`.replace('</section>', '</div></section>');

const L = {
  es: {
    lang: 'es', file: 'Le-pregunte-a-Google-y-a-Bing-sobre-SEO-para-IA-y-GEO',
    title: 'Le pregunté a Google y a Bing sobre SEO para IA y GEO',
    slides: [
      ['LO QUE VI', `<h1 style="font-size:104px;margin-top:64px">Le pregunté a Google y a Bing sobre SEO para IA y GEO</h1>
<div class="vis" style="flex:1">${box('cómo saber si mi marca aparece en chatgpt', [], 'Google: sin sugerencias')}</div>
<div class="b" style="margin-bottom:6px">La pregunta que más le importa a una marca ni siquiera tiene sugerencias.</div><div style="font-size:28px;color:${GR};margin-top:8px">Autocompletado sin sesión iniciada ni historial, parámetros de México, 28 de octubre de 2026.</div><div style="font-size:34px;color:${GR};margin-top:16px">Desliza →</div>`],
      ['GOOGLE · MÉXICO', `<h1 style="font-size:150px;margin-top:40px">Nada.</h1>
<div class="b" style="margin-top:20px">La pregunta que más le importa a una marca no tiene ni una sugerencia.</div>
<div class="vis" style="flex:1">${box('cómo saber si mi marca aparece en chatgpt', [], 'Sin sugerencias')}</div>`],
      ['BING · MÉXICO', `<h1 style="font-size:96px;margin-top:40px">Bing entiende otra pregunta</h1>
<div class="vis" style="flex:1">${box('cómo saber si mi marca aparece en chatgpt', ['cómo saber si está hecho con chatgpt', 'cómo detectar que se usó chatgpt', 'páginas para que no se detecte chatgpt'], '', 0)}</div>
<div class="b">Lo lee como detectar texto escrito por IA.</div>`],
      ['“QUÉ ES GEO” · GOOGLE Y BING', `<h1 style="font-size:96px;margin-top:40px">Para un buscador, GEO es geografía</h1>
<div class="vis" style="flex:1">${box('qué es geo', ['qué es geografía', 'qué es geometría', 'qué es geología', 'qué es geopolítica'], '', null)}</div>
<div class="b">No uses la sigla como si ya significara lo que tú quieres.</div>`],
      ['“SEO PARA IA” · GOOGLE', `<h1 style="font-size:96px;margin-top:40px">La gente aún pregunta cómo se llama</h1>
<div class="vis" style="flex:1">${box('seo para ia', ['seo para ia cómo se llama', 'seo para ia curso', 'seo para ia nombre', 'agencia seo para ia'], '', 0)}</div>
<div class="b">Habla como pregunta tu cliente, no como se llama tu industria.</div>`],
      ['MÉXICO Y EE. UU.', `<h1 style="font-size:84px;margin-top:40px">En EE. UU. la categoría ya tiene nombre. En México, todavía no</h1>
<div class="vis" style="flex:1;flex-direction:column;gap:34px">
 <div class="sb">${lab('EE. UU. · GOOGLE')}<div class="sbq">${mag(VL, 44)}<span>ai visibility</span></div><div class="sbl"><div class="sbr hl">${mag(GR, 30)}<span>ai visibility tools · score · checker · tracker</span></div></div></div>
 <div class="sb">${lab('MÉXICO · GOOGLE')}<div class="sbq">${mag(VL, 44)}<span>visibilidad en ia</span></div><div class="sbl"><div class="sbe" style="margin:10px 20px;padding:20px 30px">Nada parecido a una herramienta</div></div></div>
</div><div class="src">Fuente: autocompletado de Google, 28 de octubre de 2026.</div>`],
      ['LAS TRES RESPUESTAS', `<h1 style="font-size:88px;margin-top:40px">Contesto las que el buscador no entiende</h1>
<div class="vis" style="flex:1"><div style="width:900px;display:flex;flex-direction:column;gap:22px">
${[['¿Cómo se llama el SEO para IA?', 'GEO, AEO o “SEO para IA”. Es la misma tarea: que una IA te nombre o te cite.'], ['¿Cómo aparecer en ChatGPT?', 'No hay una lista donde subir de lugar. Que su rastreador pueda entrar y que tu página conteste primero.'], ['¿Cómo saber si mi marca aparece?', 'Repite la pregunta de tu cliente y guarda cada respuesta con fecha. Una sola no prueba nada.']].map(([q, a]) => `<div class="card" style="padding:26px 34px"><div style="font-size:38px;font-weight:700;color:#fff;margin-bottom:10px">${q}</div><div style="font-size:32px;line-height:1.3;color:${G}">${a}</div></div>`).join('')}
</div></div>`],
      ['LO QUE YO HARÍA', `<h1 style="font-size:92px;margin-top:40px">Esta semana</h1>
<div class="vis" style="flex:1"><div style="width:900px;display:flex;flex-direction:column;gap:22px">
${[['1', 'Escribe tu servicio como lo diría tu cliente, no como lo llama tu industria.'], ['2', 'Búscalo en Google y en Bing y anota qué completan.'], ['3', 'Respóndelo en una página, en las primeras líneas, con sus palabras.'], ['4', 'Repítelo en un mes: el autocompletado cambia.']].map(([n, t]) => `<div class="card" style="padding:26px 34px;display:flex;gap:28px;align-items:center"><div style="flex:none;width:70px;height:70px;border-radius:50%;background:${V};font-size:38px;font-weight:700;display:flex;align-items:center;justify-content:center">${n}</div><div style="font-size:36px;line-height:1.28;color:#fff">${t}</div></div>`).join('')}
</div></div>`],
      ['EL LÍMITE', `<h1 style="font-size:88px;margin-top:40px">El autocompletado no es volumen</h1>
<div class="b" style="margin-top:24px">Sin sesión ni historial para personalizarlo, sigue cambiando con el lugar y el tiempo. Muestra que una pregunta existe, no cuánta gente la hace.</div>
<div class="vis" style="flex:1"><div class="card" style="width:900px;padding:40px 44px;border-color:${V};background:rgba(142,107,224,.16)"><div style="font-size:50px;font-weight:700;line-height:1.2">¿Qué completa Google cuando escribes la pregunta más importante de tu negocio?</div></div></div>
<div class="src">Fuentes: autocompletado de Google y Bing con parámetros de México y EE. UU. (28 de octubre de 2026); SparkToro y Gumshoe.ai (28 de enero de 2026); documentación de bots de OpenAI.</div>`],
    ],
  },
  en: {
    lang: 'en', file: 'I-asked-Google-and-Bing-about-GEO-AEO-and-AI-visibility',
    title: 'I asked Google and Bing about GEO, AEO and AI visibility',
    slides: [
      ['WHAT I SAW', `<h1 style="font-size:104px;margin-top:64px">I asked Google and Bing about GEO, AEO and AI visibility</h1>
<div class="vis" style="flex:1">${box('how to know if chatgpt mentions my brand', [], 'Google: no suggestions')}</div>
<div class="b" style="margin-bottom:6px">The question a brand needs answered most does not get a single suggestion.</div><div style="font-size:28px;color:${GR};margin-top:8px">Autocomplete, signed out, no history, 28 October 2026.</div><div style="font-size:34px;color:${GR};margin-top:16px">Swipe →</div>`],
      ['GOOGLE · US', `<h1 style="font-size:150px;margin-top:40px">Nothing.</h1>
<div class="b" style="margin-top:20px">The question a brand most needs answered does not get a single suggestion.</div>
<div class="vis" style="flex:1">${box('how to know if chatgpt mentions my brand', [], 'No suggestions')}</div>`],
      ['BING · US', `<h1 style="font-size:96px;margin-top:40px">Bing splits the question in two</h1>
<div class="vis" style="flex:1">${box('how to know if chatgpt mentions my brand', ['how to monitor brand mentions in chatgpt', 'how to see brand visibility in chatgpt', 'how to know if someone used chatgpt', 'can companies tell if you use chatgpt'], '', 2)}</div>
<div class="b">Half brand monitoring, half detecting AI-written text.</div>`],
      ['“HOW TO SHOW UP IN CHATGPT” · BING', `<h1 style="font-size:88px;margin-top:40px">Ask Bing how to show up in ChatGPT</h1>
<div class="vis" style="flex:1">${box('how to show up in chatgpt', ['does chatgpt show up on turnitin', 'does chatgpt show up on plagiarism checkers', 'how to detect chatgpt', 'how to check for chatgpt'], '', 0)}</div>
<div class="b">Google completes it as results, searches and “a winning aeo playbook.”</div>`],
      ['“WHAT IS GEO” · GOOGLE AND BING', `<h1 style="font-size:96px;margin-top:40px">To a search engine, GEO is geography</h1>
<div class="vis" style="flex:1">${box('what is geo', ['what is geocaching', 'what is geography', 'what is geometry', 'what is geology'], '', null)}</div>
<div class="b">AEO already got its own: “aeo vs seo” and “aeo and geo.”</div>`],
      ['“AI VISIBILITY”', `<h1 style="font-size:92px;margin-top:40px">Some words are already claimed</h1>
<div class="vis" style="flex:1;flex-direction:column;gap:34px">
 <div class="sb">${lab('GOOGLE US')}<div class="sbq">${mag(VL, 44)}<span>ai visibility</span></div><div class="sbl"><div class="sbr hl">${mag(GR, 30)}<span>tools · score · checker · tracker · agency</span></div></div></div>
 <div class="sb">${lab('GOOGLE US')}<div class="sbq">${mag(VL, 44)}<span>what is geo</span></div><div class="sbl"><div class="sbe" style="margin:10px 20px;padding:20px 30px">geocaching · geography · geometry</div></div></div>
</div><div class="src">Source: Google autocomplete, 28 October 2026.</div>`],
      ['THE THREE ANSWERS', `<h1 style="font-size:88px;margin-top:40px">Answers to the ones search engines do not settle</h1>
<div class="vis" style="flex:1"><div style="width:900px;display:flex;flex-direction:column;gap:22px">
${[['AEO or GEO?', 'Close to the same task: getting an AI to name or cite you. What matters is what you measure.'], ['How do I show up in ChatGPT?', 'There is no list to climb. Its crawler has to get in, and your page should answer first.'], ['Does ChatGPT mention my brand?', 'Repeat your customer’s question and save each answer with its date. One run proves nothing.']].map(([q, a]) => `<div class="card" style="padding:26px 34px"><div style="font-size:38px;font-weight:700;color:#fff;margin-bottom:10px">${q}</div><div style="font-size:32px;line-height:1.3;color:${G}">${a}</div></div>`).join('')}
</div></div>`],
      ['WHAT I WOULD DO', `<h1 style="font-size:92px;margin-top:40px">This week</h1>
<div class="vis" style="flex:1"><div style="width:900px;display:flex;flex-direction:column;gap:22px">
${[['1', 'Write your service the way your customer says it, not the way your industry names it.'], ['2', 'Type it into Google and Bing and note what they complete.'], ['3', 'Answer it on one page, in the first lines, in their words.'], ['4', 'Check again in a month: autocomplete moves.']].map(([n, t]) => `<div class="card" style="padding:26px 34px;display:flex;gap:28px;align-items:center"><div style="flex:none;width:70px;height:70px;border-radius:50%;background:${V};font-size:38px;font-weight:700;display:flex;align-items:center;justify-content:center">${n}</div><div style="font-size:36px;line-height:1.28;color:#fff">${t}</div></div>`).join('')}
</div></div>`],
      ['THE LIMIT', `<h1 style="font-size:88px;margin-top:40px">Autocomplete is not search volume</h1>
<div class="b" style="margin-top:24px">With no sign-in or history to personalize it, it still changes with place and time. It shows that a question exists, not how many people ask it.</div>
<div class="vis" style="flex:1"><div class="card" style="width:900px;padding:40px 44px;border-color:${V};background:rgba(142,107,224,.16)"><div style="font-size:50px;font-weight:700;line-height:1.2">What does Google complete when you type the most important question for your business?</div></div></div>
<div class="src">Sources: Google and Bing autocomplete with US and Mexico parameters (28 October 2026); SparkToro and Gumshoe.ai (28 January 2026); OpenAI bots documentation.</div>`],
    ],
  },
};

(async () => {
  const out = path.join(__dirname, 'carrusel'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const key of ['es', 'en']) {
    const c = L[key]; const N = c.slides.length;
    const pages = c.slides.map(([k, inner], i) => wrap(inner, i + 1, N, k));
    const html = `<!doctype html><html lang="${c.lang}"><meta charset="utf-8"><title>${c.title}</title><style>${css}</style><body>${pages.join('')}</body></html>`;
    const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    await pg.setContent(html); await pg.evaluate(() => document.fonts.ready);
    await pg.pdf({ path: path.join(out, `${key}-${c.file}.pdf`), width: '11.25in', height: '14.0625in', printBackground: true, preferCSSPageSize: true });
    const secs = await pg.$$('section.pg');
    for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: path.join(out, `${key}-lamina-${String(i + 1).padStart(2, '0')}.png`) });
    const rep = await pg.evaluate(() => {
      const o = [];
      document.querySelectorAll('section.pg').forEach((sec, i) => {
        const P = sec.getBoundingClientRect(); const w = sec.querySelector('.w'); const iss = [];
        const blocks = [...w.children].filter((e) => !e.classList.contains('n'));
        const R = blocks.map((e) => ({ c: e.className || e.tagName, r: e.getBoundingClientRect() }));
        R.forEach((a) => { const r = a.r; if (r.left - P.left < 80 || P.right - r.right < 80 || r.top - P.top < 60 || P.bottom - r.bottom < 50) iss.push('margin ' + a.c + ' ' + [r.left - P.left, P.right - r.right, r.top - P.top, P.bottom - r.bottom].map(Math.round)); });
        for (let a = 0; a < R.length; a++) for (let c2 = a + 1; c2 < R.length; c2++) { const x = R[a].r, y = R[c2].r; if (x.width && y.width && x.left < y.right && y.left < x.right && x.top < y.bottom - 1 && y.top < x.bottom - 1) iss.push('overlap ' + R[a].c + ' x ' + R[c2].c); }
        sec.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > P.right + 1 || r.left < P.left - 1 || r.bottom > P.bottom + 1)) iss.push('outside ' + (e.className || e.tagName)); });
        o.push((i + 1) + ': ' + (iss.length ? iss.join(' | ') : 'ok'));
      });
      return o;
    });
    console.log(key + '\n' + rep.join('\n'));
    await pg.close();
  }
  await b.close();
})();
