const fs=require('fs');const {chromium}=require('playwright');
const f=(p)=>fs.readFileSync(p).toString('base64');
const D=process.env.FONT_DIR.replace(/\/?$/,'/');
const f4=f(D+'Inter-400-latin.woff2'),f7=f(D+'Inter-700-latin.woff2');
const V='#8E6BE0',VL='#B89BFF',G='#D4D4D8',GR='#86868B',LIME='#C6F135';
const css=`@font-face{font-family:Inter;font-weight:400;src:url(data:font/woff2;base64,${f4}) format('woff2')}
@font-face{font-family:Inter;font-weight:700;src:url(data:font/woff2;base64,${f7}) format('woff2')}
@page{size:11.25in 14.0625in;margin:0}*{margin:0;padding:0;box-sizing:border-box}html,body{background:#050506}
.pg{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.w{position:absolute;inset:0;padding:88px 88px 80px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:${VL};border:2px solid ${VL};border-radius:999px;padding:11px 26px}
.n{position:absolute;right:88px;top:96px;font-size:26px;font-weight:700;color:${GR};letter-spacing:.08em}
h1{font-weight:700;letter-spacing:-.045em;line-height:1.04;text-wrap:balance}
.b{font-size:46px;line-height:1.3;color:${G};letter-spacing:-.012em}
.src{margin-top:auto;font-size:24px;color:${GR}}
.f{margin-top:auto;font-size:30px;color:${VL};font-weight:700}
.vis{display:flex;justify-content:center;align-items:center}
.card{background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.14);border-radius:28px}
.bar{height:18px;border-radius:9px;background:rgba(255,255,255,.18)}
`;
const prog=(i)=>`<div style="display:flex;gap:14px;margin-bottom:34px">${[1,2,3,4].map(x=>`<div style="height:10px;flex:1;border-radius:5px;background:${x<=i?V:'rgba(255,255,255,.16)'}"></div>`).join('')}</div>`;
const wrap=(inner,i,k)=>`<section class="pg"><div class="g1"></div><div class="g2"></div><div class="w"><div class="k">${k}</div><div class="n">${i} / 10</div>${inner}</div></section>`;
const pages=[];
// 1 cover: venn
pages.push(wrap(`
<h1 style="font-size:112px;margin-top:70px">Tres siglas,<br>una sola tarea</h1>
<div class="vis" style="margin-top:20px;flex:1"><svg width="860" height="640" viewBox="0 0 900 670">
 <defs><radialGradient id="a"><stop offset="0" stop-color="${V}" stop-opacity=".55"/><stop offset="1" stop-color="${V}" stop-opacity=".25"/></radialGradient></defs>
 <circle cx="330" cy="240" r="205" fill="url(#a)" stroke="${VL}" stroke-width="3"/>
 <circle cx="570" cy="240" r="205" fill="url(#a)" stroke="${VL}" stroke-width="3"/>
 <circle cx="450" cy="420" r="205" fill="url(#a)" stroke="${VL}" stroke-width="3"/>
 <text x="225" y="200" font-size="68" font-weight="700" fill="#fff" font-family="Inter">SEO</text>
 <text x="585" y="200" font-size="68" font-weight="700" fill="#fff" font-family="Inter">AEO</text>
 <text x="385" y="520" font-size="68" font-weight="700" fill="#fff" font-family="Inter">GEO</text>
 <text x="450" y="322" font-size="34" font-weight="700" fill="${LIME}" text-anchor="middle" font-family="Inter">1 tarea</text>
</svg></div>
<div class="b" style="margin-bottom:6px">Mi postura: no necesitas tres estrategias.</div><div style="font-size:34px;color:${GR};margin-top:14px">Desliza →</div>`,1,'MI POSTURA'));
// 2 SEO
const row=(hl,w)=>`<div class="card" style="padding:22px 28px;${hl?`border-color:${V};background:rgba(142,107,224,.18)`:''}"><div class="bar" style="width:${w}%;background:${hl?VL:'rgba(255,255,255,.28)'};margin-bottom:12px"></div><div class="bar" style="width:92%;height:14px"></div></div>`;
pages.push(wrap(`
<h1 style="font-size:190px;margin-top:70px">SEO</h1><div class="b" style="margin-top:14px">Que te encuentren en Google y Bing.</div>
<div class="vis" style="flex:1"><div style="width:880px;display:flex;flex-direction:column;gap:20px">
 <div class="card" style="padding:26px 34px;font-size:40px;color:#fff;display:flex;gap:22px;align-items:center"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="${VL}" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M16 16l5 5"/></svg>qué es seo</div>
 ${row(1,60)}${row(0,48)}${row(0,54)}</div></div>`,2,'1'));
// 3 AEO
pages.push(wrap(`
<h1 style="font-size:190px;margin-top:70px">AEO</h1><div class="b" style="margin-top:14px">Que tu página conteste una pregunta de forma directa.</div>
<div class="vis" style="flex:1"><div style="width:880px;display:flex;flex-direction:column;gap:26px">
 <div style="align-self:flex-end;background:${V};border-radius:28px 28px 6px 28px;padding:24px 34px;font-size:40px">¿Qué es el SEO?</div>
 <div class="card" style="padding:30px 36px;border-radius:28px 28px 28px 6px"><div style="font-size:38px;font-weight:700;color:#fff;margin-bottom:20px">Que tu sitio se pueda encontrar en buscadores.</div><div class="bar" style="width:96%;margin-bottom:14px"></div><div class="bar" style="width:80%"></div></div>
 <div style="font-size:26px;color:${GR};text-align:center">La respuesta, en las primeras líneas. Ilustración.</div></div></div>`,3,'2'));
// 4 GEO
pages.push(wrap(`
<h1 style="font-size:190px;margin-top:70px">GEO</h1><div class="b" style="margin-top:14px">Que ChatGPT, Gemini o Perplexity te citen cuando responden.</div>
<div class="vis" style="flex:1"><div style="width:880px" class="card"><div style="padding:34px 36px">
 <div style="font-size:30px;color:${GR};margin-bottom:22px">Asistente de IA · ilustración</div>
 <div class="bar" style="width:94%;margin-bottom:16px"></div><div class="bar" style="width:86%;margin-bottom:16px"></div><div class="bar" style="width:72%;margin-bottom:30px"></div>
 <div style="font-size:26px;color:${GR};margin-bottom:14px">Fuentes</div>
 <div style="display:flex;gap:16px;flex-wrap:wrap"><span style="border:2px solid ${LIME};color:${LIME};border-radius:999px;padding:12px 26px;font-size:30px;font-weight:700">1 · tumarca.com</span><span style="border:2px solid rgba(255,255,255,.3);color:${G};border-radius:999px;padding:12px 26px;font-size:30px">2 · otra-fuente.com</span></div>
</div></div></div>`,4,'3'));
// steps
const steps=[
 {i:1,h:'Que te puedan leer',b:'Sin bloquear rastreadores ni esconder el texto detrás de JavaScript.',ic:`<svg width="520" height="360" viewBox="0 0 520 360" fill="none" stroke="${VL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="300" y="40" width="190" height="260" rx="22" fill="rgba(142,107,224,.18)"/><path d="M335 100h120M335 140h120M335 180h80" stroke="#fff" stroke-opacity=".6"/><circle cx="90" cy="170" r="50"/><path d="M70 160l10 10 22-26" stroke="${LIME}"/><path d="M150 170h130"/><path d="M262 150l22 20-22 20"/></svg>`},
 {i:2,h:'Contestar lo que preguntan',b:'Las preguntas reales de tus compradores, con la respuesta en las primeras líneas.',ic:`<svg width="520" height="360" viewBox="0 0 520 360" fill="none" stroke="${VL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M60 50h250a24 24 0 0 1 24 24v90a24 24 0 0 1-24 24H150l-50 44v-44H60a24 24 0 0 1-24-24V74a24 24 0 0 1 24-24z" fill="rgba(142,107,224,.18)"/><path d="M110 105c0-24 52-24 52 2 0 22-26 18-26 42" stroke="#fff"/><circle cx="136" cy="168" r="3" fill="#fff"/><path d="M360 210h110a24 24 0 0 1 24 24v50a24 24 0 0 1-24 24H440l-34 30v-30h-46a24 24 0 0 1-24-24v-50a24 24 0 0 1 24-24z"/><path d="M380 250l14 14 32-34" stroke="${LIME}"/></svg>`},
 {i:3,h:'Ser consistente',b:'Mismo nombre y mismos datos en tu sitio, tu ficha y tus perfiles.',ic:`<svg width="520" height="360" viewBox="0 0 520 360" fill="none" stroke="${VL}" stroke-width="5" stroke-linecap="round"><g fill="rgba(142,107,224,.18)"><rect x="20" y="120" width="140" height="120" rx="22"/><rect x="190" y="120" width="140" height="120" rx="22"/><rect x="360" y="120" width="140" height="120" rx="22"/></g><g stroke="#fff" stroke-opacity=".8"><path d="M45 165h90M45 195h60"/><path d="M215 165h90M215 195h60"/><path d="M385 165h90M385 195h60"/></g><path d="M90 275v30h340v-30M260 305v28" stroke="${LIME}"/></svg>`},
 {i:4,h:'Revisar qué dicen de ti',b:'De vez en cuando, con las mismas preguntas.',ic:`<svg width="520" height="360" viewBox="0 0 520 360" fill="none" stroke="${VL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="40" y="40" width="330" height="220" rx="26" fill="rgba(142,107,224,.18)"/><path d="M85 100h240M85 140h240M85 180h150" stroke="#fff" stroke-opacity=".6"/><circle cx="350" cy="220" r="62" fill="#050506"/><path d="M394 264l66 66"/><path d="M325 218l20 20 38-44" stroke="${LIME}"/></svg>`}
];
steps.forEach(s=>pages.push(wrap(`<div style="margin-top:46px">${prog(s.i)}</div><div style="font-size:30px;font-weight:700;letter-spacing:.14em;color:${VL}">LO QUE YO HARÍA · ${s.i} DE 4</div>
<h1 style="font-size:96px;margin-top:20px">${s.h}</h1><div class="b" style="margin-top:26px">${s.b}</div><div class="vis" style="flex:1">${s.ic.replace(/width="520" height="360"/,'style="width:820px;height:auto"')}</div>`,s.i+4,'EN ESTE ORDEN')));
// 9 google
pages.push(wrap(`
<h1 style="font-size:100px;margin-top:70px">Para Google, sigue siendo SEO</h1>
<div class="b" style="margin-top:26px">Su guía de mayo de 2026 lo dice. De los demás asistentes se sabe poco, y desconfío de quien promete lo contrario.</div>
<div class="vis" style="flex:1"><div style="width:900px;display:flex;flex-direction:column;gap:34px">
 <div><div style="font-size:30px;font-weight:700;color:#fff;margin-bottom:14px">Google · funciones de IA</div><div style="height:34px;border-radius:17px;background:${V}"></div><div style="font-size:26px;color:${GR};margin-top:10px">Documentado por Google</div></div>
 <div><div style="font-size:30px;font-weight:700;color:#fff;margin-bottom:14px">ChatGPT, Gemini, Perplexity…</div><div style="height:34px;border-radius:17px;border:3px dashed ${VL};width:46%"></div><div style="font-size:26px;color:${GR};margin-top:10px">Se sabe poco · estudios de terceros</div></div></div></div>
<div class="src">Fuente: guía de Google sobre funciones de IA en Search (mayo de 2026)</div>`,9,'SEGÚN GOOGLE'));
// 10 close
const chip=(t)=>`<div class="card" style="padding:26px 34px;font-size:44px;font-weight:700;text-align:center;border-color:${V};background:rgba(142,107,224,.16)">${t}</div>`;
pages.push(wrap(`
<h1 style="font-size:104px;margin-top:70px">No es SEO contra GEO.</h1>
<div class="vis" style="flex:1"><div style="width:880px;display:flex;flex-direction:column;gap:18px;align-items:stretch">
${chip('SEO bien hecho')}<div style="text-align:center;font-size:60px;color:${LIME};font-weight:700;line-height:1">+</div>${chip('Respuestas claras')}<div style="text-align:center;font-size:60px;color:${LIME};font-weight:700;line-height:1">+</div>${chip('Pruebas')}</div></div>
<div class="b" style="margin-bottom:10px">¿Qué cambiarías de esta lista?</div><div class="f" style="margin-top:20px">Guárdalo para cuando alguien pregunte</div>`,10,'EL FUTURO'));
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const html=`<!doctype html><html lang="es"><meta charset="utf-8"><title>Tres siglas, una sola tarea: SEO, AEO y GEO</title><style>${css}</style><body>${pages.join('')}</body></html>`;
const pg=await b.newPage({viewport:{width:1080,height:1350}});await pg.setContent(html);await pg.evaluate(()=>document.fonts.ready);
await pg.pdf({path:'2026-10-19_Tres-siglas-una-sola-tarea-SEO-AEO-GEO.pdf',width:'11.25in',height:'14.0625in',printBackground:true,preferCSSPageSize:true});
const secs=await pg.$$('section.pg');for(let i=0;i<secs.length;i++)await secs[i].screenshot({path:`lamina-${String(i+1).padStart(2,'0')}.png`});

const rep=await pg.evaluate(()=>{const out=[];document.querySelectorAll('section.pg').forEach((sec,i)=>{const P=sec.getBoundingClientRect();const w=sec.querySelector('.w');
 const blocks=[...w.children].filter(e=>!e.classList.contains('n'));const R=blocks.map(e=>({c:e.className||e.tagName,r:e.getBoundingClientRect()}));
 const iss=[];
 R.forEach(a=>{const r=a.r;if(r.left-P.left<80||P.right-r.right<80||r.top-P.top<60||P.bottom-r.bottom<50)iss.push('margin '+a.c+' '+[r.left-P.left,P.right-r.right,r.top-P.top,P.bottom-r.bottom].map(Math.round));});
 for(let a=0;a<R.length;a++)for(let b=a+1;b<R.length;b++){const x=R[a].r,y=R[b].r;if(x.width&&y.width&&x.left<y.right&&y.left<x.right&&x.top<y.bottom-1&&y.top<x.bottom-1)iss.push('overlap '+R[a].c+' x '+R[b].c);}
 sec.querySelectorAll('*').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')iss.push('clip '+e.className);const r=e.getBoundingClientRect();if(r.width&&(r.right>P.right+1||r.left<P.left-1||r.bottom>P.bottom+1))iss.push('outside '+(e.tagName)+' '+Math.round(r.right-P.right)+','+Math.round(r.bottom-P.bottom));});
 out.push((i+1)+': '+(iss.length?iss.join(' | '):'ok'));});return out;});
console.log(rep.join('\n'));
await b.close();console.log('ok',secs.length);})();
