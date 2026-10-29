// EJEMPLO del kit con datos reales: autocompletado del 28 de octubre de 2026 (panel de 12 frases por mercado, sin sesión ni historial).
// Fuente de los números: docs/autocomplete/reports/2026-10-28.md del repositorio de Geonos. No es un post para publicar: muestra las piezas.
const { rp, slide, hero, bars, stacked, matrix, legend, table, callout } = require('./componentes.cjs');
const T = 4; const SRC = 'Autocompletado de Google y Bing sin sesión iniciada ni historial, 28 de octubre de 2026. Panel de 12 frases por mercado. El autocompletado no es volumen de búsqueda.';
const LEG = legend([['understood', 'Entiende la pregunta'], ['other', 'La lee como otra cosa'], ['open', 'No completa nada']]);
module.exports = { file: 'ejemplo-kit-datos-reales', slides: [
  slide({ kicker: 'CIFRA GRANDE', i: 1, total: T, size: 88, title: `En México, Google ${rp('se queda callado')} con frases sobre IA`,
    body: `${hero({ num: '5', of: 12, label: 'frases del panel sin una sola sugerencia en Google México', sub: 'Entre ellas: “cómo saber si mi marca aparece en chatgpt”.' })}`, src: SRC }),
  slide({ kicker: 'BARRAS CON ÉNFASIS', i: 2, total: T, size: 84, title: `Cuántas de 12 frases ${rp('entiende')} cada buscador`,
    body: `${bars({ items: [{ label: 'México · Google', value: 5, hl: true }, { label: 'México · Bing', value: 4 }, { label: 'EE. UU. · Google', value: 9 }, { label: 'EE. UU. · Bing', value: 12 }], max: 12, unit: 'de 12' })}
${callout('En EE. UU. la categoría ya tiene nombre. En México todavía no.')}`, src: SRC }),
  slide({ kicker: 'BARRA APILADA', i: 3, total: T, size: 84, title: `Qué hace cada buscador con las ${rp('12 frases')}`,
    body: `${stacked({ n: 12, rows: [{ label: 'México · Google', understood: 5, other: 2, open: 5 }, { label: 'México · Bing', understood: 4, other: 7, open: 1 }, { label: 'EE. UU. · Google', understood: 9, other: 1, open: 2 }, { label: 'EE. UU. · Bing', understood: 12, other: 0, open: 0 }] })}${LEG}`, src: SRC }),
  slide({ kicker: 'MATRIZ POR FRASE', i: 4, total: T, size: 76, title: `Frase por frase en ${rp('México')}`,
    body: `${matrix({ cols: ['GOOGLE', 'BING'], rows: [
      { label: 'cómo saber si mi marca aparece en chatgpt', states: ['open', 'other'] }, { label: 'cómo aparecer en chatgpt', states: ['understood', 'other'] },
      { label: 'cómo aparecer en la ia de google', states: ['open', 'other'] }, { label: 'qué es geo', states: ['other', 'other'] },
      { label: 'qué es aeo', states: ['understood', 'understood'] }, { label: 'seo para ia', states: ['understood', 'understood'] },
      { label: 'seo para chatgpt', states: ['understood', 'understood'] }, { label: 'posicionamiento en chatgpt', states: ['understood', 'open'] },
      { label: 'visibilidad en ia', states: ['other', 'other'] }, { label: 'herramienta de visibilidad en ia', states: ['open', 'other'] },
      { label: 'cómo medir visibilidad en chatgpt', states: ['open', 'other'] }, { label: 'agencia seo para chatgpt', states: ['open', 'understood'] }], rowH: 54, font: 28 })}${LEG}`, src: 'Autocompletado de Google y Bing sin sesión ni historial, México, 28 de octubre de 2026.' }),
] };
