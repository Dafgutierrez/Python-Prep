const fs=require('fs');const {chromium}=require('playwright');
const posts=JSON.parse(fs.readFileSync('posts.json','utf8'));
const f=(p)=>fs.readFileSync(p).toString('base64');
const D=(process.env.FONT_DIR||'/home/user/heygen-com/hyperframes/skills/talking-head-recut/assets/fonts/').replace(/\/?$/,'/');
const f4=f(D+'Inter-400-latin.woff2'),f7=f(D+'Inter-700-latin.woff2');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const KC={change:'#B89BFF',myth:'#FF8A8A',question:'#B89BFF'};
function html(p){
  const h=p.headline, fs=h.length<=36?104:h.length<=52?92:h.length<=64?80:72;
  const lines=p.lines.map((l,i)=>{const k=l.indexOf(':');const lab=(p.type!=='question'&&k>0&&k<20)?l.slice(0,k):null;
    const body=lab?l.slice(k+1).trim():l;
    return `<li><span class="n">${p.type==='question'&&/^\d\./.test(l)?'':''}</span><div>${lab?`<b style="color:${p.type==='myth'?'#FFC66B':'#B89BFF'}">${esc(lab)}:</b> `:''}${esc(body)}</div></li>`;}).join('');
  const kc=p.kicker==='DATO CON ASTERISCO'?'#FFC66B':KC[p.type];
  return `<!doctype html><html lang="es"><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:400;src:url(data:font/woff2;base64,${f4}) format('woff2')}
@font-face{font-family:Inter;font-weight:700;src:url(data:font/woff2;base64,${f7}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.wrap{position:absolute;inset:0;padding:96px 88px 88px;display:flex;flex-direction:column}
.k{align-self:flex-start;font-size:26px;font-weight:700;letter-spacing:.16em;color:${kc};border:2px solid ${kc};border-radius:999px;padding:12px 26px}
h1{margin-top:56px;font-size:${fs}px;line-height:1.04;font-weight:700;letter-spacing:-.045em;color:#F7F7F8;text-wrap:balance}
.rule{margin:52px 0 40px;height:3px;width:120px;background:#8E6BE0;border-radius:3px}
ul{list-style:none;display:flex;flex-direction:column;gap:36px}
li{font-size:41px;line-height:1.32;color:#D4D4D8;letter-spacing:-.012em;display:flex;gap:22px}
li:before{content:'';flex:0 0 14px;height:14px;margin-top:19px;border-radius:50%;background:#8E6BE0}
li b{font-weight:700}
.foot{margin-top:auto;font-size:26px;color:#86868B;letter-spacing:-.005em;line-height:1.3}
</style><body><div class="g1"></div><div class="g2"></div><div class="wrap"><div class="k">${esc(p.kicker)}</div><h1>${esc(h)}</h1><div class="rule"></div><ul>${lines}</ul><div class="foot">${esc(p.foot||'')}</div></div></body></html>`;}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const pg=await b.newPage({viewport:{width:1080,height:1350}});
for(const p of posts){await pg.setContent(html(p));await pg.evaluate(()=>document.fonts.ready);
 const over=await pg.evaluate(()=>{const w=document.querySelector('.wrap');const f=document.querySelector('.foot');const ul=document.querySelector('ul');return {ulBottom:Math.round(ul.getBoundingClientRect().bottom),footTop:Math.round(f.getBoundingClientRect().top),sh:document.body.scrollHeight}});
 const n=String(p.n).padStart(2,'0');await pg.screenshot({path:`img-${n}.png`});console.log(n,JSON.stringify(over));}
await b.close();})();
