// Kit visual de LinkedIn de Geonos: piezas reutilizables para láminas 1080 x 1350 con la skill design-premium
// adaptada a la marca y las reglas de la skill dataviz. Cada pieza es una función que devuelve HTML.
// Colores de datos validados con validate_palette.js (modo oscuro, superficie #050506): violeta, rosa, azul pasan los 5 chequeos.
const fs = require('fs');
const FONT_DIR = (process.env.FONT_DIR || '').replace(/\/?$/, '/');
const b64 = (p) => fs.readFileSync(p).toString('base64');

// Marca (titulares y adornos) y datos (marcas de las gráficas). La rampa clara de la marca NO se usa en marcas de datos.
const C = {
  bg: '#050506', ink: '#F7F7F8', soft: '#D4D4D8', mute: '#A1A1AA', dim: '#71717A',
  violet: '#8E6BE0', lilac: '#B89BFF', sky: '#9CC8FF', pink: '#FF9EC0',
  d1: '#8E6BE0', d2: '#D65A8A', d3: '#3E94D1', gray: '#52525B', hair: 'rgba(255,255,255,.14)',
};

const fonts = () => [400, 600, 700].map((w) => `@font-face{font-family:Inter;font-weight:${w};src:url(data:font/woff2;base64,${b64(FONT_DIR + `inter-latin-${w}-normal.woff2`)}) format('woff2')}`).join('\n');

const css = () => `${fonts()}
@page{size:1080px 1350px;margin:0}*{margin:0;padding:0;box-sizing:border-box}html,body{background:${C.bg}}
.pg{width:1080px;height:1350px;background:${C.bg};color:${C.ink};font-family:Inter,sans-serif;position:relative;overflow:hidden;page-break-after:always;break-after:page}
.g1{position:absolute;left:-420px;top:-460px;width:1500px;height:1500px;border-radius:50%;background:radial-gradient(circle,rgba(94,48,181,.5) 0%,rgba(94,48,181,0) 62%)}
.g2{position:absolute;right:-520px;bottom:-640px;width:1400px;height:1400px;border-radius:50%;background:radial-gradient(circle,rgba(184,155,255,.2) 0%,rgba(184,155,255,0) 62%)}
.w{position:absolute;inset:0;padding:80px 88px 72px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.k{font-size:24px;font-weight:700;letter-spacing:.16em;color:${C.lilac};border:2px solid ${C.lilac};border-radius:999px;padding:10px 24px}
.n{font-size:24px;font-weight:700;color:${C.mute};letter-spacing:.08em}
h1{font-weight:700;letter-spacing:-.045em;line-height:1.06;text-wrap:balance}
.rp{background:linear-gradient(90deg,${C.sky} 0%,#C2A8FF 52%,${C.pink} 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.14em;padding-right:.1em;display:inline-block}
.lead{font-size:38px;line-height:1.28;color:${C.soft};letter-spacing:-.012em}
.src{font-size:24px;color:${C.mute};line-height:1.4}
.body{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:32px;min-height:0;margin-top:32px}
.card{background:rgba(255,255,255,.06);border:2px solid ${C.hair};border-radius:32px}
.lab{font-size:24px;font-weight:700;letter-spacing:.14em;color:${C.lilac};margin-bottom:16px}
.hair{height:1px;background:${C.hair}}
.leg{display:flex;flex-wrap:wrap;gap:16px 40px;font-size:28px;color:${C.soft};align-items:center}
.leg span{display:inline-flex;gap:14px;align-items:center}
.prog{display:flex;gap:8px;margin-top:32px}.prog i{flex:1;height:8px;border-radius:4px;background:rgba(255,255,255,.16)}.prog i.on{background:${C.violet}}
table.t{width:100%;border-collapse:collapse}
table.t th{font-size:24px;font-weight:700;letter-spacing:.12em;color:${C.mute};text-align:left;padding:0 16px 16px;border-bottom:2px solid ${C.hair}}
table.t td{font-size:34px;padding:22px 16px;border-bottom:1px solid ${C.hair};color:${C.soft}}
table.t td.hl,table.t th.hl{background:rgba(142,107,224,.16);color:#fff;font-weight:700}
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
const hero = ({ num, of, label, sub, size = 340 }) => `<div style="display:flex;flex-direction:column;gap:8px">
<div style="display:flex;align-items:baseline;gap:24px"><span style="font-size:${size}px;font-weight:700;letter-spacing:-.06em;line-height:.9">${rp(num)}</span>${of ? `<span style="font-size:96px;font-weight:600;color:${C.mute};letter-spacing:-.03em">de ${of}</span>` : ''}</div>
<div class="lead" style="font-size:46px;color:#fff;font-weight:600;letter-spacing:-.02em;line-height:1.2">${label}</div>${sub ? `<div class="lead">${sub}</div>` : ''}</div>`;

// BARRAS HORIZONTALES con énfasis: una barra en violeta, el resto en gris. Valor en la punta, extremo redondeado.
// items: [{label, value, hl}] ; max: el valor total (por ejemplo 12).
const bars = ({ items, max, unit = '', labelW = 318, thick = false }) => `<div style="display:flex;flex-direction:column;gap:${thick ? 44 : 28}px">${items.map((it) => {
  const w = Math.max(2, (it.value / max) * 100);
  return `<div style="display:flex;align-items:center;gap:24px"><div style="flex:none;width:${labelW}px;font-size:31px;color:${it.hl ? '#fff' : C.soft};font-weight:${it.hl ? 700 : 400};line-height:1.15">${it.label}</div>
<div style="flex:1;position:relative;height:${thick ? 72 : 44}px"><div style="position:absolute;left:0;top:0;bottom:0;right:0;border-bottom:2px solid ${C.hair}"></div><div style="position:absolute;left:0;top:0;height:${thick ? 72 : 44}px;width:${w}%;background:${it.hl ? C.d1 : C.gray};border-radius:0 8px 8px 0"></div></div>
<div style="flex:none;width:210px;white-space:nowrap;font-size:44px;font-weight:700;letter-spacing:-.02em;color:#fff;text-align:right">${it.value}<span style="font-size:26px;color:${C.mute};font-weight:600"> ${unit}</span></div></div>`;
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
const compare = ({ left, right, hl = 0 }) => `<div style="display:flex;gap:24px">${[left, right].map((c, k) => `<div class="card" style="flex:1;padding:32px;${k === hl ? `border-color:${C.violet};background:rgba(142,107,224,.16)` : ''}"><div class="lab">${c.lab}</div><div style="font-size:84px;font-weight:700;letter-spacing:-.04em;line-height:1">${c.big}</div><div style="font-size:30px;color:${C.soft};line-height:1.3;margin-top:12px">${c.text}</div></div>`).join('')}</div>`;

const callout = (t, o = {}) => `<div class="card" style="padding:40px;border-color:${C.violet};background:rgba(142,107,224,.16);${o.grow ? 'flex:1;display:flex;align-items:center;' : ''}"><div style="font-size:${o.size || 50}px;font-weight:700;letter-spacing:-.03em;line-height:1.15">${t}</div></div>`;
const note = (t) => `<div class="card" style="padding:28px 40px;font-size:30px;line-height:1.35;color:${C.soft}">${t}</div>`;

// FICHA DE DATOS: filas "etiqueta + valor" para leer la letra chica de un estudio. rows: [{k, v, hl}] ; hl resalta la fila clave.
const facts = (rows, compact) => `<div class="card" style="padding:8px 0">${rows.map((r, i) => `<div style="padding:${compact ? 14 : 20}px 40px;${i ? 'border-top:1px solid ' + C.hair + ';' : ''}${r.hl ? 'background:rgba(142,107,224,.20);' : ''}"><div style="font-size:22px;font-weight:700;letter-spacing:.14em;color:${r.hl ? C.lilac : C.mute};margin-bottom:6px">${r.k}</div><div style="font-size:${compact ? 30 : 33}px;line-height:1.2;color:#fff;font-weight:${r.hl ? 700 : 400}">${r.v}</div></div>`).join('')}</div>`;

// PASOS numerados (Lo que yo haría): items [[titulo, detalle], ...]
const steps = (items) => `<div style="display:flex;flex-direction:column;gap:16px;flex:1">${items.map(([h, d], i) => `<div class="card" style="display:flex;gap:32px;align-items:center;padding:28px 40px;flex:1"><div style="flex:none;width:80px;height:80px;border-radius:50%;background:${C.violet};font-size:44px;font-weight:700;display:flex;align-items:center;justify-content:center">${i + 1}</div><div><div style="font-size:38px;font-weight:700;letter-spacing:-.02em;line-height:1.15">${h}</div><div style="font-size:29px;color:#C4C4CC;line-height:1.3;margin-top:8px">${d}</div></div></div>`).join('')}</div>`;

module.exports = { C, css, rp, slide, hero, bars, stacked, matrix, legend, table, compare, callout, mark, facts, steps, note };
