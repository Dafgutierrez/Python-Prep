const fs=require('fs');const {chromium}=require('playwright');
const D=(process.env.FONT_DIR||'/home/user/heygen-com/hyperframes/skills/talking-head-recut/assets/fonts/').replace(/\/?$/,'/');
const f=p=>fs.readFileSync(D+p).toString('base64');
const f4=f('Inter-400-latin.woff2'),f7=f('Inter-700-latin.woff2');
const html=`<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:400;src:url(data:font/woff2;base64,${f4}) format('woff2')}
@font-face{font-family:Inter;font-weight:700;src:url(data:font/woff2;base64,${f7}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1584px;height:396px;background:#050506;color:#F7F7F8;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(#121216 1px,transparent 1px),linear-gradient(90deg,#121216 1px,transparent 1px);background-size:44px 44px;
 -webkit-mask-image:radial-gradient(ellipse 60% 120% at 62% 50%,#000 0%,transparent 78%);mask-image:radial-gradient(ellipse 60% 120% at 62% 50%,#000 0%,transparent 78%)}
.g1{position:absolute;left:-120px;top:-520px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.55) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-360px;bottom:-640px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.22) 0%,rgba(184,155,255,0) 62%)}
.t{position:absolute;left:400px;top:0;height:396px;display:flex;flex-direction:column;justify-content:center;gap:0}
.rule{width:72px;height:4px;border-radius:4px;background:#8E6BE0;margin-bottom:30px}
h1{font-size:68px;line-height:1;font-weight:700;letter-spacing:-.04em;white-space:nowrap}
h1 i{font-style:normal;color:#B89BFF}
p{margin-top:24px;font-size:24px;line-height:1.3;color:#A1A1AA;letter-spacing:-.005em;white-space:nowrap}
p.p2{margin-top:10px}
p b{font-weight:400;color:#D4D4D8}
p s{text-decoration:none;color:#8E6BE0;padding:0 12px}
</style><body><div class="grid"></div><div class="g1"></div><div class="g2"></div>
<div class="t"><div class="rule"></div><h1>SEO <i>·</i> GEO <i>·</i> Amazon SEO</h1>
<p><b>ChatGPT</b><s>·</s><b>Gemini</b><s>·</s><b>Perplexity</b><s>·</s><b>Claude</b><s>·</s><b>Google AI Mode</b></p><p class="p2"><b>Copilot</b><s>·</s><b>Grok</b><s>·</s><b>Meta AI</b><s>·</s><b>Meta Muse</b><s>·</s><b>Alexa for Shopping</b></p></div></body>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [s,n] of [[1,'portada-linkedin-1584x396.png'],[2,'portada-linkedin-3168x792.png']]){
 const pg=await b.newPage({viewport:{width:1584,height:396},deviceScaleFactor:s});await pg.setContent(html);await pg.evaluate(()=>document.fonts.ready);
 if(s===1){console.log(JSON.stringify(await pg.evaluate(()=>{const r=e=>{const b=document.querySelector(e).getBoundingClientRect();return [Math.round(b.left),Math.round(b.right)]};return {h1:r('h1'),p:r('p')}})));}
 await pg.screenshot({path:n});}
// preview with mock profile photo (approx) and mobile crop
const pv=await b.newPage({viewport:{width:1584,height:700}});
const img='data:image/png;base64,'+fs.readFileSync('portada-linkedin-1584x396.png').toString('base64');
await pv.setContent(`<body style="margin:0;background:#1b1f23;font-family:sans-serif;color:#fff;width:1584px">
<div style="position:relative;width:1584px;height:396px"><img src="${img}" style="display:block"><div style="position:absolute;left:34px;top:286px;width:228px;height:228px;border-radius:50%;background:#8b8b94;border:8px solid #1b1f23"></div></div>
<div style="padding:130px 300px 0;font-size:22px;color:#aaa">Vista aproximada en computadora: el círculo gris simula tu foto de perfil.</div>
<div style="margin:40px 0 0 117px;width:1350px;overflow:hidden;height:396px;position:relative;opacity:.0"></div></body>`);
await pv.screenshot({path:'vista-previa-computadora.png',clip:{x:0,y:0,width:1584,height:560}});
await b.close();})();
