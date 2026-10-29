// Carrusel ES: "Antes de repetir un estudio de IA, léelo así". Usa ../kit-visual/componentes.cjs.
// Todas las cifras salen de las páginas originales leídas el 2026-10-29: MentionBird (10 sep 2026) y SparkToro + Gumshoe.ai (28 ene 2026).
const { rp, slide, hero, bars, facts, steps, callout, note } = require('../kit-visual/componentes.cjs');
const T = 7;
module.exports = { file: 'es-Como-leer-un-estudio-de-IA-antes-de-repetirlo', slides: [
  slide({ kicker: 'LEER DATOS', i: 1, total: T, size: 92, title: `Antes de repetir un estudio de IA, ${rp('léelo así')}`,
    body: `${hero({ size: 320, num: '12.7%', label: 'Un titular muy citado sobre ChatGPT y Gemini', sub: 'Ahora lee la letra chica.' })}`, src: 'Estudio de MentionBird, 10 de septiembre de 2026.' }),
  slide({ kicker: 'ESTUDIO 1 · MENTIONBIRD', i: 2, total: T, size: 84, title: `La letra chica del ${rp('12.7%')}`,
    body: facts([{ k: 'MUESTRA', v: '517 preguntas de intención comercial y 70,596 respuestas' }, { k: 'FECHAS', v: '27 de abril al 23 de agosto de 2026' }, { k: 'QUÉ MIDE', v: 'Qué parte de la lista combinada de dominios aparece en las dos IA', hl: true }, { k: 'MODELOS', v: 'Por API, no las apps de ChatGPT y Gemini' }, { k: 'PAÍS E IDIOMA', v: 'No los indica' }, { k: 'MARGEN DE ERROR', v: 'No hay: el panel no es una muestra probabilística' }]), src: 'Fuente: MentionBird Research, estudio 3. Proveedor de seguimiento de IA.' }),
  slide({ kicker: 'LA BASE IMPORTA', i: 3, total: T, size: 84, title: `Mismo dato, ${rp('dos totales')}`,
    body: `${bars({ items: [{ label: 'Sobre la lista combinada', value: 12.7 }, { label: 'Sobre la lista más corta', value: 25.6, hl: true }], max: 30, unit: '%', labelW: 250, thick: true })}
${note('<b style="color:#fff">Lista combinada:</b> dominios que citaron las dos IA, entre todos los que citó cualquiera de las dos.<br><b style="color:#fff">Lista más corta:</b> los mismos dominios, pero solo entre los de la IA que citó menos.')}
${callout('Alrededor de 1 de 8, o de 1 de 4. Depende de qué total uses.', { grow: true })}`, src: 'Dominios citados por ChatGPT y por Gemini para las mismas preguntas. Fuente: MentionBird, 2026.' }),
  slide({ kicker: 'ESTUDIO 2 · SPARKTORO', i: 4, total: T, size: 72, title: `La letra chica del ${rp('“menos de 1 en 100”')}`,
    body: facts([{ k: 'MUESTRA', v: '600 voluntarios, 12 prompts y 2,961 corridas en ChatGPT, Claude y Google' }, { k: 'FECHAS', v: 'Noviembre y diciembre de 2025' }, { k: 'TITULAR', v: 'Menos de 1 en 100 para la misma lista de marcas y menos de 1 en 1,000 para el mismo orden', hl: true }, { k: 'SOCIO', v: 'Gumshoe.ai, que vende seguimiento de IA. Lo declaran' }, { k: 'REVISIÓN', v: 'Los autores dicen que no son investigadores profesionales' }, { k: 'NO MIDIÓ', v: 'Cómo describen las IA a cada marca' }], true), src: 'Fuente: SparkToro y Gumshoe.ai, 28 de enero de 2026. No es investigación académica.' }),
  slide({ kicker: 'LO QUE SÍ SE SOSTUVO', i: 5, total: T, size: 84, title: `Cuántas veces aparece, no ${rp('en qué lugar')}`,
    body: `${bars({ items: [{ label: 'Apareció en', value: 69, hl: true }, { label: 'Primera mención', value: 25 }], max: 71, unit: 'de 71', labelW: 250, thick: true })}
${callout('Una organización del estudio, en respuestas de ChatGPT. La frecuencia aguantó entre corridas; el orden, no.', { grow: true, size: 44 })}`, src: 'Fuente: SparkToro y Gumshoe.ai, 2026.' }),
  slide({ kicker: 'LO QUE YO HARÍA', i: 6, total: T, size: 96, title: `Antes de repetir un dato, ${rp('cuatro pasos')}`,
    body: steps([['Mira quién lo hizo', 'Y si vende algo relacionado.'], ['Lee la muestra y las fechas', 'Preguntas, corridas, de cuándo son.'], ['Pregunta de qué total sale el porcentaje', 'La base cambia la cifra.'], ['Revisa si aplica a ti', 'Tu país, tu idioma, tu tipo de negocio.']]) }),
  slide({ kicker: 'LO QUE NINGUNO RESPONDE', i: 7, total: T, size: 92, title: `Los dos son útiles. ${rp('Ninguno')} habla de ti`,
    body: `${callout('Cuántas veces te nombran a ti, en México, para la pregunta de tu cliente.', { grow: true, size: 68 })}
<div class="src">Fuentes: MentionBird Research, “ChatGPT and Gemini Overlap on 12.7% of the Domains They Cite for the Same Question” (10 de septiembre de 2026). SparkToro y Gumshoe.ai (28 de enero de 2026), publicado en sparktoro.com.</div>` }),
] };
