const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+__dirname+'/Mi-Clip-Complete-Audit-Geonos-V11-EN.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
// overflow check: any page whose content runs past the footer
const over=await p.evaluate(()=>[...document.querySelectorAll('.page')].map((pg,i)=>{const f=pg.querySelector('.bot');if(!f)return null;const fr=f.getBoundingClientRect().top;let m=0;pg.querySelectorAll(':scope > *:not(.bot):not(.glow)').forEach(el=>{m=Math.max(m,el.getBoundingClientRect().bottom)});return m>fr-4?(i+1)+':'+Math.round(m-fr):null}).filter(Boolean));
console.log('overflow',over);
await p.pdf({path:__dirname+'/Mi-Clip-Complete-Audit-Geonos-V11-EN.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});await b.close()})()
