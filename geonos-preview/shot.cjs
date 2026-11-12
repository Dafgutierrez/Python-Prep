const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();
const d=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});const errs=[];d.on('pageerror',e=>errs.push(e.message));
await d.goto('file://'+__dirname+'/index.html',{waitUntil:'networkidle'});await d.evaluate(()=>document.fonts.ready);
await d.screenshot({path:__dirname+'/preview-desktop.png',fullPage:true});
const ov=await d.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
const m=await b.newPage({...devices['iPhone 14 Pro']});await m.goto('file://'+__dirname+'/index.html',{waitUntil:'networkidle'});await m.evaluate(()=>document.fonts.ready);
await m.screenshot({path:__dirname+'/preview-mobile.png',fullPage:true});
const ovm=await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
// logo tile like the reference
const t=await b.newPage({viewport:{width:300,height:300},deviceScaleFactor:2});
await t.setContent('<body style="margin:0;background:#0A0A0F;display:grid;place-items:center;height:300px"><svg width="170" height="170" viewBox="0 0 100 100"><g fill="none" stroke="#F5F5F7" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"><path d="M34 16H84"/><path d="M16 38H38"/><path d="M16 60H38"/><path d="M60 60H84V82H34"/></g></svg></body>');
await t.screenshot({path:__dirname+'/logo-tile.png'});
console.log('overflow desktop',ov,'mobile',ovm,'errors',errs.length);await b.close()})()
