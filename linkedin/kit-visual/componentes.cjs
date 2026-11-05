// Kit visual de LinkedIn de Geonos: piezas reutilizables para láminas 1080 x 1350 con la skill design-premium
// adaptada a la marca y las reglas de la skill dataviz. Cada pieza es una función que devuelve HTML.
// Colores de datos validados con validate_palette.js (modo oscuro, superficie #050506): violeta, rosa, azul pasan los 5 chequeos.
const fs = require('fs');
const FONT_DIR = (process.env.FONT_DIR || '').replace(/\/?$/, '/');
const b64 = (p) => fs.readFileSync(p).toString('base64');

// Marca (titulares y adornos) y datos (marcas de las gráficas). La rampa clara de la marca NO se usa en marcas de datos.
const LIGHT = process.env.THEME === 'light';
// Tema oscuro (por defecto) y tema claro. Datos del tema claro validados con validate_palette.js (modo claro, superficie #F7F7F8): #5E30B5, #C2417A, #1F6FB5 pasan los 5 chequeos.
const C = LIGHT ? {
  bg: '#F7F7F8', ink: '#050506', strong: '#050506', soft: '#3F3F46', sub: '#3F3F46', mute: '#52525B', dim: '#71717A',
  violet: '#5E30B5', lilac: '#5E30B5', sky: '#5E30B5', pink: '#D65A8A',
  d1: '#5E30B5', d2: '#C2417A', d3: '#1F6FB5', gray: '#A1A1AA', hair: 'rgba(5,5,6,.14)',
  card: '#FFFFFF', hl: 'rgba(94,48,181,.09)', hl2: 'rgba(94,48,181,.14)', progOff: 'rgba(5,5,6,.12)',
  glow1: 'rgba(94,48,181,.14)', glow2: 'rgba(184,155,255,.34)', shadow: '0 1px 2px rgba(5,5,6,.06),0 12px 28px rgba(94,48,181,.07)',
  grad: 'linear-gradient(90deg,#5E30B5 0%,#8E6BE0 52%,#D65A8A 100%)',
} : {
  bg: '#050506', ink: '#F7F7F8', strong: '#fff', soft: '#D4D4D8', sub: '#C4C4CC', mute: '#A1A1AA', dim: '#71717A',
  violet: '#8E6BE0', lilac: '#B89BFF', sky: '#9CC8FF', pink: '#FF9EC0',
  d1: '#8E6BE0', d2: '#D65A8A', d3: '#3E94D1', gray: '#52525B', hair: 'rgba(255,255,255,.14)',
  card: 'rgba(255,255,255,.06)', hl: 'rgba(142,107,224,.16)', hl2: 'rgba(142,107,224,.20)', progOff: 'rgba(255,255,255,.16)',
  glow1: 'rgba(94,48,181,.5)', glow2: 'rgba(184,155,255,.2)', shadow: 'none',
  grad: 'linear-gradient(90deg,#9CC8FF 0%,#C2A8FF 52%,#FF9EC0 100%)',
};

const fonts = () => [400, 600, 700].map((w) => `@font-face{font-family:Inter;font-weight:${w};src:url(data:font/woff2;base64,${b64(FONT_DIR + `inter-latin-${w}-normal.woff2`)}) format('woff2')}`).join('\n');

const css = () => `${fonts()}
@page{size:1080px 1350px;margin:0}*{margin:0;padding:0;box-sizing:border-box}html,body{background:${C.bg}}
.pg{width:1080px;height:1350px;background:${C.bg};color:${C.ink};font-family:Inter,sans-serif;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,${C.glow1} 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,${C.glow2} 0%,rgba(184,155,255,0) 62%)}
.w{position:absolute;inset:0;padding:80px 88px 72px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.k{font-size:24px;font-weight:700;letter-spacing:.16em;color:${C.lilac};border:2px solid ${C.lilac};border-radius:999px;padding:10px 24px}
.n{font-size:24px;font-weight:700;color:${C.mute};letter-spacing:.08em}
h1{font-weight:700;letter-spacing:-.045em;line-height:1.06;text-wrap:balance}
.rp{background:${C.grad};-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.14em;padding-right:.1em;display:inline-block}
.lead{font-size:38px;line-height:1.28;color:${C.soft};letter-spacing:-.012em}
.src{font-size:24px;color:${C.mute};line-height:1.4}
.body{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:32px;min-height:0;margin-top:32px}
.card{background:${C.card};border:2px solid ${C.hair};border-radius:32px;box-shadow:${C.shadow}}
.lab{font-size:24px;font-weight:700;letter-spacing:.14em;color:${C.lilac};margin-bottom:16px}
.hair{height:1px;background:${C.hair}}
.leg{display:flex;flex-wrap:wrap;gap:16px 40px;font-size:28px;color:${C.soft};align-items:center}
.leg span{display:inline-flex;gap:14px;align-items:center}
.prog{display:flex;gap:8px;margin-top:32px}.prog i{flex:1;height:8px;border-radius:4px;background:${C.progOff}}.prog i.on{background:${C.violet}}
table.t{width:100%;border-collapse:collapse}
table.t th{font-size:24px;font-weight:700;letter-spacing:.12em;color:${C.mute};text-align:left;padding:0 16px 16px;border-bottom:2px solid ${C.hair}}
table.t td{font-size:34px;padding:22px 16px;border-bottom:1px solid ${C.hair};color:${C.soft}}
table.t td.hl,table.t th.hl{background:${C.hl};color:${C.strong};font-weight:700}
table.t .num{text-align:right;font-variant-numeric:tabular-nums}
`;

const rp = (t) => `<span class="rp">${t}</span>`;

// Marcas por estado: la forma cambia además del color (nunca solo color).
// abierta = anillo, entendida = círculo lleno violeta, otro significado = rombo relleno rosa.
const mark = {
  open: (s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="flex:none"><circle cx="12" cy="12" r="8" fill="none" stroke="${C.mute}" stroke-width="2.6"/></svg>`,
  understood: (s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="flex:none"><circle cx="12" cy="12" r="9" fill="${C.d1}" stroke="${C.bg}" stroke-width="2"/></svg>`,
  other: (s = 40) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="flex:none"><rect x="4.5" y="4.5" width="15" height="15" rx="2.5" transform="rotate(45 12 12)" fill="${C.d2}" stroke="${C.bg}" stroke-width="2"/></svg>`,
};
const STATE_COLOR = { open: C.gray, understood: C.d1, other: C.d2 };

// Estructura de lámina: kicker, numeración, título y cuerpo. footer = fuente (opcional). Barra de avance al final.
const slide = ({ kicker, i, total, title, size = 92, body, src }) => `<div class="pg"><div class="g1"></div><div class="g2"></div><div class="w">
<div class="top"><span class="k">${kicker}</span><span class="n">${i} / ${total}</span></div>
<h1 style="font-size:${size}px">${title}</h1>
<div class="body">${body}${src ? `<div class="src">${src}</div>` : ''}</div>
<div class="prog">${Array.from({ length: total }, (_, k) => `<i${k < i ? ' class="on"' : ''}></i>`).join('')}</div></div></div>`;

// CIFRA GRANDE: un solo dato que es el titular. num y den dan "5 de 12".
const hero = ({ num, of, label, sub, size = 340, ofWord = 'de' }) => `<div style="display:flex;flex-direction:column;gap:8px">
<div style="display:flex;align-items:baseline;gap:24px"><span style="font-size:${size}px;font-weight:700;letter-spacing:-.06em;line-height:.9">${rp(num)}</span>${of ? `<span style="font-size:96px;font-weight:600;color:${C.mute};letter-spacing:-.03em">${ofWord} ${of}</span>` : ''}</div>
<div class="lead" style="font-size:46px;color:${C.strong};font-weight:600;letter-spacing:-.02em;line-height:1.2">${label}</div>${sub ? `<div class="lead">${sub}</div>` : ''}</div>`;

// BARRAS HORIZONTALES con énfasis: una barra en violeta, el resto en gris. Valor en la punta, extremo redondeado.
// items: [{label, value, hl}] ; max: el valor total (por ejemplo 12).
const bars = ({ items, max, unit = '', labelW = 318, thick = false }) => `<div style="display:flex;flex-direction:column;gap:${thick ? 44 : 28}px">${items.map((it) => {
  const w = Math.max(2, (it.value / max) * 100);
  return `<div style="display:flex;align-items:center;gap:24px"><div style="flex:none;width:${labelW}px;font-size:31px;color:${it.hl ? C.strong : C.soft};font-weight:${it.hl ? 700 : 400};line-height:1.15">${it.label}</div>
<div style="flex:1;position:relative;height:${thick ? 72 : 44}px"><div style="position:absolute;left:0;top:0;bottom:0;right:0;border-bottom:2px solid ${C.hair}"></div><div style="position:absolute;left:0;top:0;height:${thick ? 72 : 44}px;width:${w}%;background:${it.hl ? C.d1 : C.gray};border-radius:0 8px 8px 0"></div></div>
<div style="flex:none;width:210px;white-space:nowrap;font-size:44px;font-weight:700;letter-spacing:-.02em;color:${C.strong};text-align:right">${it.shown ?? it.value}<span style="font-size:26px;color:${C.mute};font-weight:600"> ${unit}</span></div></div>`;
}).join('')}</div>`;

// BARRA APILADA al 100 % por fila, tres estados, hueco de 3 px entre segmentos, conteo dentro solo si cabe.
// rows: [{label, open, understood, other}] con n = total de frases.
const stacked = ({ rows, n }) => {
  const seg = (k, v) => v ? `<div style="flex:${v} 1 0;min-width:0;background:${STATE_COLOR[k]};height:64px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;color:#fff;${k === 'open' ? 'background:transparent;border:3px solid ' + C.mute + ';border-radius:8px' : 'border-radius:8px'}">${v / n >= 0.08 ? v : ''}</div>` : '';
  return `<div style="display:flex;flex-direction:column;gap:28px">${rows.map((r) => `<div><div style="font-size:30px;color:${C.soft};margin-bottom:12px">${r.label}</div><div style="display:flex;gap:3px">${seg('understood', r.understood)}${seg('other', r.other)}${seg('open', r.open)}</div></div>`).join('')}</div>`;
};

// MATRIZ DE PUNTOS por fila: una fila por frase, una columna por motor. cols: ['Google','Bing'] ; rows: [{label, states:[...]}]
const matrix = ({ cols, rows, rowH = 60, font = 29 }) => `<div style="display:flex;flex-direction:column">
<div style="display:flex;align-items:flex-end;padding:0 0 12px;border-bottom:2px solid ${C.hair}"><div style="flex:1"></div>${cols.map((c) => `<div style="flex:none;width:150px;text-align:center;font-size:24px;font-weight:700;letter-spacing:.12em;color:${C.mute}">${c}</div>`).join('')}</div>
${rows.map((r) => `<div style="display:flex;align-items:center;height:${rowH}px;border-bottom:1px solid ${C.hair}"><div style="flex:1;font-size:${font}px;color:${C.soft};white-space:nowrap">${r.label}</div>${r.states.map((s) => `<div style="flex:none;width:150px;display:flex;justify-content:center">${mark[s](38)}</div>`).join('')}</div>`).join('')}</div>`;

const legend = (items) => `<div class="leg">${items.map(([k, t]) => `<span>${mark[k](34)}${t}</span>`).join('')}</div>`;

// TABLA: head ['', 'GOOGLE', ...] ; rows [[...]] ; hlCol = índice de la columna resaltada ; la primera columna es texto, el resto numéricas.
const table = ({ head, rows, hlCol }) => `<table class="t"><thead><tr>${head.map((h, j) => `<th class="${j ? 'num' : ''}${j === hlCol ? ' hl' : ''}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, j) => `<td class="${j ? 'num' : ''}${j === hlCol ? ' hl' : ''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

// DOS TARJETAS lado a lado (comparar dos cosas). hl = 0|1 para resaltar una.
const compare = ({ left, right, hl = 0 }) => `<div style="display:flex;gap:24px">${[left, right].map((c, k) => `<div class="card" style="flex:1;padding:32px;${k === hl ? `border-color:${C.violet};background:${C.hl}` : ''}"><div class="lab">${c.lab}</div><div style="font-size:84px;font-weight:700;letter-spacing:-.04em;line-height:1">${c.big}</div><div style="font-size:30px;color:${C.soft};line-height:1.3;margin-top:12px">${c.text}</div></div>`).join('')}</div>`;

const callout = (t, o = {}) => `<div class="card" style="padding:40px;border-color:${C.violet};background:${C.hl};${o.grow ? 'flex:1;display:flex;align-items:center;' : ''}"><div style="font-size:${o.size || 50}px;font-weight:700;letter-spacing:-.03em;line-height:1.15">${t}</div></div>`;
const note = (t) => `<div class="card" style="padding:28px 40px;font-size:30px;line-height:1.35;color:${C.soft}">${t}</div>`;

// FICHA DE DATOS: filas "etiqueta + valor" para leer la letra chica de un estudio. rows: [{k, v, hl}] ; hl resalta la fila clave.
const facts = (rows, compact) => `<div class="card" style="padding:8px 0;overflow:hidden">${rows.map((r, i) => `<div style="padding:${compact ? 14 : 20}px 40px;${i ? 'border-top:1px solid ' + C.hair + ';' : ''}${r.hl ? `background:${C.hl2};` : ''}"><div style="font-size:22px;font-weight:700;letter-spacing:.14em;color:${r.hl ? C.lilac : C.mute};margin-bottom:6px">${r.k}</div><div style="font-size:${compact ? 30 : 33}px;line-height:1.2;color:${C.strong};font-weight:${r.hl ? 700 : 400}">${r.v}</div></div>`).join('')}</div>`;

// PASOS numerados (Lo que yo haría): items [[titulo, detalle], ...]
const steps = (items) => `<div style="display:flex;flex-direction:column;gap:16px;flex:1">${items.map(([h, d], i) => `<div class="card" style="display:flex;gap:32px;align-items:center;padding:28px 40px;flex:1"><div style="flex:none;width:80px;height:80px;border-radius:50%;background:${C.violet};color:#fff;font-size:44px;font-weight:700;display:flex;align-items:center;justify-content:center">${i + 1}</div><div><div style="font-size:38px;font-weight:700;letter-spacing:-.02em;line-height:1.15">${h}</div><div style="font-size:29px;color:${C.sub};line-height:1.3;margin-top:8px">${d}</div></div></div>`).join('')}</div>`;

// ---------------------------------------------------------------------------------------------------------------------
// PREMIUM (2026-11-05): fondo con profundidad, firma y gráfica de tiempo protagonista.
// Todo lo que lleva desenfoque tiene la clase "fx": el PDF la oculta (el visor del iPhone dibuja mal el blur). Los PNG la conservan.

// ATMÓSFERA: orbe de luz arriba a la derecha (anillos finos + núcleo difuso) en violeta y rosa de la marca. Sin imágenes.
const atmos = () => {
  const a = LIGHT ? 0.55 : 1;
  const rings = Array.from({ length: 9 }, (_, k) => {
    const rx = 230 + k * 26, ry = 120 + k * 18, rot = -28 + k * 7;
    return `<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" transform="rotate(${rot})" fill="none" stroke="${k % 3 === 2 ? C.pink : C.lilac}" stroke-opacity="${(0.10 + (k % 4) * 0.05) * a}" stroke-width="${k % 2 ? 1.5 : 2.5}"/>`;
  }).join('');
  return `<svg class="atm" width="760" height="760" viewBox="-380 -380 760 760" style="position:absolute;right:-250px;top:-250px">
<defs><radialGradient id="core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(300)"><stop offset="0" stop-color="${C.pink}" stop-opacity="${0.55 * a}"/><stop offset=".45" stop-color="${C.violet}" stop-opacity="${0.35 * a}"/><stop offset="1" stop-color="${C.violet}" stop-opacity="0"/></radialGradient>
<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter></defs>
<circle class="fx" cx="0" cy="0" r="300" fill="url(#core)" filter="url(#soft)"/>${rings}</svg>`;
};

// Lámina premium: igual que slide(), con atmósfera y firma (nombre, sin marca antes del lanzamiento).
const BY = process.env.BYLINE || 'Dafne Gutiérrez';
const slideX = ({ kicker, i, total, title, size = 92, body, src, lead }) => `<div class="pg"><div class="g1"></div><div class="g2"></div>${atmos()}<div class="w">
<div class="top"><span class="k">${kicker}</span><span class="n">${i} / ${total}</span></div>
<h1 style="font-size:${size}px;position:relative">${title}</h1>${lead ? `<div class="lead" style="margin-top:20px;max-width:860px">${lead}</div>` : ''}
<div class="body">${body}${src ? `<div class="src">${src}</div>` : ''}</div>
<div class="prog">${Array.from({ length: total }, (_, k) => `<i${k < i ? ' class="on"' : ''}></i>`).join('')}</div></div>
<div style="position:absolute;right:88px;bottom:26px;font-size:22px;font-weight:600;letter-spacing:.04em;color:${C.mute}">${BY}</div></div>`;

// Curva suave (Catmull-Rom a Bézier) por los puntos [[x,y],...].
const smooth = (p) => p.map((q, i) => {
  if (!i) return `M${q[0].toFixed(1)},${q[1].toFixed(1)}`;
  const a = p[i - 2] || p[i - 1], b = p[i - 1], c = q, d = p[i + 1] || q;
  const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6], c2 = [c[0] - (d[0] - b[0]) / 6, c[1] - (d[1] - b[1]) / 6];
  return `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${c[0].toFixed(1)},${c[1].toFixed(1)}`;
}).join('');

// Promedio móvil de k días (suaviza el ruido diario; dilo en la fuente).
const rolling = (v, k = 7) => v.map((_, i) => { const s = v.slice(Math.max(0, i - k + 1), i + 1); return s.reduce((a, b) => a + b, 0) / s.length; });
// Índice: cada valor dividido entre el promedio de los primeros k puntos (1× = el inicio).
const indexOf = (v, k = 7) => { const b = v.slice(0, k).reduce((a, x) => a + x, 0) / k; return v.map((x) => x / b); };

// GRÁFICA DE TIEMPO protagonista. dates: ['2026-08-07', ...]; series: [{ name, values, c }] (máx. 3, la primera es la principal);
// events: [{ date, label }] líneas punteadas con etiqueta; fmt(v) da la etiqueta del eje y del final; yMax opcional; h alto en px.
let AREA_N = 0;
const area = ({ dates, series, events = [], fmt = (v) => String(Math.round(v)), yMax, yTicks = 4, h = 560, xTicks = 5, endLabel = true }) => {
  const uid = 'a' + (++AREA_N); // unique ids per chart: Chrome's PDF drops fills when several SVGs share an id
  const W = 904, padL = 72, padR = endLabel ? 150 : 16, padT = 56, padB = 52, iw = W - padL - padR, ih = h - padT - padB;
  const all = series.flatMap((s) => s.values);
  // round axis: the step is 1, 2, 2.5 or 5 times a power of ten
  const niceStep = (x) => { const p = 10 ** Math.floor(Math.log10(x)); const f = x / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; };
  const top = yMax || niceStep((Math.max(...all) * 1.08) / yTicks) * yTicks;
  const X = (i) => padL + (i / (dates.length - 1)) * iw, Y = (v) => padT + ih - (v / top) * ih;
  const col = (k) => [C.d1, C.d2, C.d3][k] || C.gray;
  const ds = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  let svg = `<svg width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" style="display:block;overflow:visible"><defs>
<filter id="${uid}g" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
${series.map((s, k) => `<linearGradient id="${uid}f${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.c || col(k)}" stop-opacity="${k ? 0.18 : 0.42}"/><stop offset="1" stop-color="${s.c || col(k)}" stop-opacity="0"/></linearGradient>`).join('')}</defs>`;
  for (let t = 0; t <= yTicks; t++) { const v = (top / yTicks) * t; const y = Y(v); svg += `<line x1="${padL}" x2="${padL + iw}" y1="${y}" y2="${y}" stroke="${C.hair}" stroke-width="${t ? 1 : 2}"/><text x="${padL - 16}" y="${y + 8}" text-anchor="end" font-size="22" fill="${C.mute}">${fmt(v)}</text>`; }
  for (let t = 0; t < xTicks; t++) { const i = Math.round((t / (xTicks - 1)) * (dates.length - 1)); svg += `<text x="${X(i)}" y="${h - 12}" text-anchor="${t === 0 ? 'start' : t === xTicks - 1 ? 'end' : 'middle'}" font-size="22" fill="${C.mute}">${ds(dates[i])}</text>`; }
  for (const e of events) { const i = dates.indexOf(e.date); if (i < 0) continue; const x = X(i); svg += `<line x1="${x}" x2="${x}" y1="${padT - 8}" y2="${padT + ih}" stroke="${C.soft}" stroke-opacity=".55" stroke-width="2" stroke-dasharray="5 7"/><text x="${x + (e.right ? -12 : 12)}" y="${padT - 18}" text-anchor="${e.right ? 'end' : 'start'}" font-size="24" font-weight="600" fill="${C.strong}">${e.label}</text>`; }
  series.slice().reverse().forEach((s, rk) => {
    const k = series.length - 1 - rk; const c = s.c || col(k);
    const pts = s.values.map((v, i) => [X(i), Y(v)]); const line = smooth(pts);
    svg += `<path class="afill" style="--c:${c}" d="${line}L${X(dates.length - 1)},${padT + ih}L${padL},${padT + ih}Z" fill="url(#${uid}f${k})"/>`; // the PDF swaps the gradient for a flat fill (.afill)
    if (!k) svg += `<path class="fx" d="${line}" fill="none" stroke="${c}" stroke-width="10" stroke-opacity=".55" filter="url(#${uid}g)"/>`;
    svg += `<path d="${line}" fill="none" stroke="${k ? c : (LIGHT ? C.violet : '#fff')}" stroke-width="${k ? 3 : 4.5}" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (endLabel) { const [lx, ly] = pts[pts.length - 1]; svg += `<circle cx="${lx}" cy="${ly}" r="9" fill="${k ? c : (LIGHT ? C.violet : '#fff')}" stroke="${C.bg}" stroke-width="3"/><text x="${lx + 18}" y="${ly + 10}" font-size="${k ? 26 : 34}" font-weight="700" fill="${C.strong}">${fmt(s.values[s.values.length - 1])}</text>${series.length > 1 ? `<text x="${lx + 18}" y="${ly + 40}" font-size="20" fill="${C.mute}">${s.name}</text>` : ''}`; }
  });
  return svg + '</svg>';
};

module.exports = { C, css, rp, slide, hero, bars, stacked, matrix, legend, table, compare, callout, mark, facts, steps, note, atmos, slideX, area, smooth, rolling, indexOf };
