// MUESTRA del estilo premium (no es un post aprobado): gráfica de tiempo protagonista, atmósfera y firma.
// Datos reales: Wikimedia Pageviews API, artículo "Generative engine optimization" de en.wikipedia, agente "user", diario,
// 1 Aug a 4 Nov 2026 (wikipedia-geo-pageviews.json, descargado el 5 Nov 2026).
const { rp, slideX, area, rolling, indexOf, callout, hero } = require('../kit-visual/componentes.cjs');
const raw = require('./wikipedia-geo-pageviews.json').items;
const dates = raw.map((x) => `${x.timestamp.slice(0, 4)}-${x.timestamp.slice(4, 6)}-${x.timestamp.slice(6, 8)}`);
const views = raw.map((x) => x.views);
const avg = rolling(views, 7);
const SRC = 'Wikimedia Pageviews API, en.wikipedia “Generative engine optimization”, human readers, 1 Aug to 4 Nov 2026, 7-day average. Not search volume.';
const T = 2;
module.exports = { file: 'muestra-premium-wikipedia-geo', slides: [
  slideX({ kicker: 'GEO INTEREST', i: 1, total: T, size: 88, title: `Interest in GEO: ${rp('steady, then down')}`,
    lead: 'Readers a day of the Wikipedia article on generative engine optimization.',
    body: area({ dates, series: [{ name: 'Readers a day', values: avg }], events: [{ date: '2026-09-30', label: 'Busiest single day: 602 (Sep 30)', right: true }], fmt: (v) => String(Math.round(v)), h: 600 }),
    src: SRC }),
  slideX({ kicker: 'GEO INTEREST', i: 2, total: T, size: 84, title: `About ${rp('294 readers a day')} for twelve weeks`,
    body: `${area({ dates: dates.slice(6), series: [{ name: '× the first week', values: indexOf(avg.slice(6)) }], fmt: (v) => v.toFixed(1) + '×', h: 470, yMax: 1.6 })}
${callout('Then lower since late October. One article is one signal, not the market.', { size: 42 })}`,
    src: 'Same data. Average 294 a day from 1 Aug to 23 Oct 2026 (lowest day 151, highest 602). Index: 7-day average divided by the first week.' }),
] };
