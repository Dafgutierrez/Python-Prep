const fs=require('fs');const {chromium}=require('playwright');
const C=JSON.parse(fs.readFileSync('carousels.json','utf8'));
const f=(p)=>fs.readFileSync(p).toString('base64');
const D=(process.env.FONT_DIR||'/home/user/heygen-com/hyperframes/skills/talking-head-recut/assets/fonts/').replace(/\/?$/,'/');
const f4=f(D+'Inter-400-latin.woff2'),f7=f(D+'Inter-700-latin.woff2');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const css=`@font-face{font-family:Inter;font-weight:400;src:url(data:font/woff2;base64,${f4}) format('woff2')}
@font-face{font-family:Inter;font-weight:700;src:url(data:font/woff2;base64,${f7}) format('woff2')}
@page{size:11.25in 14.0625in;margin:0}*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#050506}
.pg{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.w{position:absolute;inset:0;padding:96px 88px 88px;display:flex;flex-direction:column}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px}
.k{align-self:flex-start;font-size:28px;font-weight:700;letter-spacing:.16em;color:#B89BFF;border:2px solid #B89BFF;border-radius:999px;padding:12px 28px}
.k.big{font-size:30px}
h1{margin-top:0;font-weight:700;letter-spacing:-.045em;line-height:1.04;color:#F7F7F8;text-wrap:balance}
.r{margin:56px 0 44px;height:3px;width:120px;background:#8E6BE0;border-radius:3px}
.b{font-size:54px;line-height:1.32;color:#D4D4D8;letter-spacing:-.012em}
.n{position:absolute;right:88px;top:104px;font-size:28px;font-weight:700;color:#86868B;letter-spacing:.08em}
.f{margin-top:auto;font-size:30px;color:#B89BFF;font-weight:700}
.arrow{margin-top:auto;font-size:34px;color:#86868B}
`;
function page(s,i,n){
  const L=s.h.length, fs=s.cover?(L<=36?112:L<=52?100:88):(L<=24?124:L<=40?104:L<=56?90:78);
  return `<section class="pg"><div class="g1"></div><div class="g2"></div><div class="w"><div class="k${s.cover?' big':''}">${esc(s.k)}</div><div class="n">${i+1} / ${n}</div><div class="mid"><h1 style="font-size:${fs}px">${esc(s.h)}</h1><div class="r"></div><div class="b">${esc(s.b)}</div></div>${s.f?`<div class="f">${esc(s.f)}</div>`:s.cover?'<div class="arrow">Desliza →</div>':''}</div></section>`;
}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
fs.mkdirSync('carruseles',{recursive:true});
for(const [n,c] of Object.entries(C)){
  const html=`<!doctype html><html lang="es"><meta charset="utf-8"><title>${esc(c.file.replace(/-/g,' '))}</title><style>${css}</style><body>${c.slides.map((s,i)=>page(s,i,c.slides.length)).join('')}</body></html>`;
  const pg=await b.newPage({viewport:{width:1080,height:1350}});await pg.setContent(html);await pg.evaluate(()=>document.fonts.ready);
  await pg.pdf({path:`carruseles/${c.file}.pdf`,width:'11.25in',height:'14.0625in',printBackground:true,preferCSSPageSize:true});
  const rep=await pg.evaluate(()=>{const out=[];document.querySelectorAll('section.pg').forEach((sec,i)=>{const P=sec.getBoundingClientRect();const w=sec.querySelector('.w');const blocks=[...w.children].filter(e=>!e.classList.contains('n'));const R=blocks.map(e=>({c:e.className||e.tagName,r:e.getBoundingClientRect()}));const iss=[];
   R.forEach(a=>{const r=a.r;if(r.left-P.left<80||P.right-r.right<80||r.top-P.top<60||P.bottom-r.bottom<40)iss.push('margin '+a.c+' '+[r.left-P.left,P.right-r.right,r.top-P.top,P.bottom-r.bottom].map(Math.round));});
   for(let a=0;a<R.length;a++)for(let b=a+1;b<R.length;b++){const x=R[a].r,y=R[b].r;if(x.width&&y.width&&x.left<y.right&&y.left<x.right&&x.top<y.bottom-1&&y.top<x.bottom-1)iss.push('overlap '+R[a].c+' x '+R[b].c);}
   const mid=w.querySelector('.mid');if(mid&&mid.scrollHeight>mid.clientHeight+1)iss.push('mid overflow');
   const f=w.querySelector('.f'),m2=w.querySelector('.mid');if(f&&m2){const a=m2.querySelector('.b').getBoundingClientRect(),b=f.getBoundingClientRect();if(a.bottom>b.top-10)iss.push('body too close to footer');}
   if(iss.length)out.push((i+1)+': '+iss.join(' | '));});return out;});
  if(rep.length)console.log('AUDIT',n,rep.join(' || '));
  // PNG preview of every slide
  const secs=await pg.$$('section.pg');for(let i=0;i<secs.length;i++){await secs[i].screenshot({path:`carruseles/prev-${n}-${i+1}.png`});}
  console.log(n,c.slides.length,'slides');await pg.close();}
await b.close();})();
