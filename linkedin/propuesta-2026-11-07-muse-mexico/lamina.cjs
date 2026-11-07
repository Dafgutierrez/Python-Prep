// Imagen del post de Meta Muse en México (7 nov 2026). Kit premium. Solo datos confirmados el 7 nov 2026 (ver post.txt).
const fs = require('fs'); const path = require('path');
const { C, rp, slideX } = require('../kit-visual/componentes.cjs');
const PHOTO = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, 'muse-mascota.webp')).toString('base64');
const chip = (t, o = {}) => `<span style="display:inline-flex;align-items:center;padding:10px 22px;border-radius:999px;font-size:28px;font-weight:600;letter-spacing:-.01em;${o.miss ? `border:2.5px dashed ${C.mute};color:${C.soft};` : `background:${C.violet};color:#fff;`}">${t}</span>`;
const dot = (on) => `<span style="position:absolute;left:50%;top:-11px;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:${on ? C.violet : C.pink};box-shadow:0 0 0 6px ${C.bg}"></span>`;
const ev = (d, t, s, on = true) => `<div style="position:relative;flex:1;padding-top:30px;text-align:center">${dot(on)}<div style="font-size:26px;font-weight:700;letter-spacing:.12em;color:${on ? C.lilac : C.pink}">${d}</div><div style="font-size:30px;font-weight:700;color:${C.strong};line-height:1.2;margin-top:6px">${t}</div><div style="font-size:24px;color:${C.sub};line-height:1.25;margin-top:6px">${s}</div></div>`;
const timeline = `<div style="position:relative;display:flex;gap:12px;margin-top:14px"><div style="position:absolute;left:8%;right:8%;top:0;height:3px;background:${C.hair}"></div>
${ev('8 SEP', 'Lanza en EE. UU.', 'Compra con tu aprobación')}${ev('20 SEP', 'Amazon la bloquea', 'En Amazon.com, según prensa', false)}${ev('5 NOV', 'Llega a México', 'En español, por WhatsApp')}</div>`;
const card = (lab, inner, hl) => `<div class="card" style="padding:22px 32px;${hl ? `border-color:${C.violet};background:${C.hl};` : ''}"><div style="font-size:23px;font-weight:700;letter-spacing:.14em;color:${hl ? C.lilac : C.mute};margin-bottom:14px">${lab}</div>${inner}</div>`;
module.exports = { file: 'muse-mexico-conectores', slides: [
  slideX({ kicker: 'META MUSE · MÉXICO', i: 1, total: 2, size: 104,
    title: `Meta Muse llegó a ${rp('México')}`,
    lead: 'El agente personal de IA de Meta: en español, dentro de WhatsApp.',
    body: `<div style="border-radius:32px;overflow:hidden;height:600px;margin-top:8px;border:1px solid ${C.hair}"><img src="${PHOTO}" style="width:100%;height:100%;object-fit:cover;object-position:42% 40%;display:block"></div>
<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:26px">${chip('5 de noviembre de 2026')}${chip('iOS · Android · WhatsApp')}${chip('Para mayores de 18')}</div>`,
    src: 'Imagen: Meta. Fecha y disponibilidad: Meta y prensa mexicana (Expansión, Milenio, Infobae), 5 nov 2026. Consultado el 6 nov 2026.' }),
  slideX({ kicker: 'META MUSE · MÉXICO', i: 2, total: 2, size: 72,
    title: `Muse llegó a México. ${rp('¿Quién está en la lista?')}`,
    body: `${timeline}
<div style="display:flex;flex-direction:column;gap:14px;margin-top:14px">
${card('CONECTORES ANUNCIADOS EN MÉXICO', `<div style="display:flex;flex-wrap:wrap;gap:12px">${['Liverpool', 'Coppel', 'Kueski', 'Rappi', 'Despegar', 'Kavak', 'Cinépolis'].map((x) => chip(x)).join('')}</div>`)}
${card('NO APARECEN EN LA LISTA ANUNCIADA', `<div style="display:flex;flex-wrap:wrap;gap:12px">${chip('Mercado Libre', { miss: 1 })}${chip('Amazon México', { miss: 1 })}</div>`, true)}
${card('LO QUE META NO HA PUBLICADO', `<div style="font-size:36px;font-weight:700;letter-spacing:-.02em;line-height:1.2">Cómo elige Muse entre dos productos.</div><div style="font-size:26px;color:${C.sub};margin-top:6px">Sin ranking publicado ni lugar pagado documentado.</div>`)}
</div>`,
    src: 'Meta y prensa mexicana (Expansión, Milenio, Infobae), 5 nov 2026; Forbes y TechRepublic (Amazon), sept 2026. Consultado el 6 nov 2026.' }),
] };
