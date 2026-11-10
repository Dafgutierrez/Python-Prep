// Carousel 2026-11-10: "YouTube is the most-cited site in AI search" depends on the engine. EN/ES via POSTLANG=en|es. THEME=light for the light version.
// Every figure was read on the original page on 10 Nov 2026:
//  RankSpot AI Citation Index (rankspot.ai/most-cited-sources): 129,537 answers, Sep 1 to Nov 10 2026, 3 engines, vendor data on its customers' commercial prompts.
//  Searchable, "Which social media platforms does AI cite the most? (September 2026)": Aug 29 to Sep 27 2026, six engines, questions Searchable customers track.
const { C, rp, slideX, bars, compare, callout, note, facts, steps, table } = require('../kit-visual/componentes.cjs');
const L = process.env.POSTLANG === 'es' ? 'es' : 'en';
const t = (en, es) => (L === 'es' ? es : en);
const T = 6;
const sub = (s) => `<div style="font-size:23px;color:${C.mute};font-weight:400;margin-top:4px">${s}</div>`;
module.exports = { file: `${L}-youtube-por-motor`, slides: [
  slideX({ kicker: t('AI CITATIONS', 'CITAS DE IA'), i: 1, total: T, size: L === 'es' ? 76 : 80,
    title: t(`“YouTube is the most-cited site in AI search.” ${rp('It depends on the engine.')}`, `“YouTube es el sitio más citado en la búsqueda con IA.” ${rp('Depende del motor.')}`),
    lead: t('The headline is an average. Your buyers do not use the average.', 'El titular es un promedio. Tus compradores no usan el promedio.'),
    body: `${compare({ left: { lab: 'GOOGLE AI OVERVIEWS', big: '22.5%', text: t('of answers cite YouTube', 'de las respuestas citan YouTube') }, right: { lab: 'CHATGPT', big: '0.9%', text: t('of answers cite YouTube', 'de las respuestas citan YouTube') }, hl: 0 })}
${callout(t('The blended 10.8% matches neither of these two engines.', 'El 10.8% combinado no coincide con ninguno de estos dos motores.'), { grow: true, size: 46 })}`,
    src: t('RankSpot AI Citation Index, 129,537 answers, 1 Sep to 10 Nov 2026 (vendor data).', 'RankSpot, 129,537 respuestas, 1 sep a 10 nov 2026 (datos de proveedor).') }),
  slideX({ kicker: t('ONE INDEX', 'UN ÍNDICE'), i: 2, total: T, size: 84, title: t(`One average, ${rp('three realities')}`, `Un promedio, ${rp('tres realidades')}`),
    lead: t('Share of answers that cite youtube.com.', 'Porcentaje de respuestas que citan youtube.com.'),
    body: `${bars({ items: [
        { label: `Google AI Overviews`, value: 22.5, shown: '22.5' },
        { label: `${t('Blended average', 'Promedio combinado')}${sub(t('3 engines', '3 motores'))}`, value: 10.8, shown: '10.8', hl: true },
        { label: `Google AI Mode`, value: 10.2, shown: '10.2' },
        { label: `ChatGPT`, value: 0.9, shown: '0.9' }], max: 25, unit: '%', thick: true, labelW: 330 })}
${note(t('Two of the three engines in the blend are Google’s. The prompts are buying questions from RankSpot’s customers, not a random sample.', 'Dos de los tres motores del promedio son de Google. Los prompts son preguntas de compra de clientes de RankSpot, no una muestra aleatoria.'))}`,
    src: t('RankSpot AI Citation Index, 129,537 answers, 1 Sep to 10 Nov 2026. Share of answers citing the domain at least once.', 'Índice de citas de RankSpot, 129,537 respuestas, del 1 sep al 10 nov 2026. Porcentaje de respuestas que citan el dominio al menos una vez.') }),
  slideX({ kicker: t('A SECOND VENDOR', 'OTRO PROVEEDOR'), i: 3, total: T, size: 84, title: t(`Six engines, ${rp('same shape')}`, `Seis motores, ${rp('la misma forma')}`),
    lead: t('Share of each engine’s answers that cite YouTube.', 'Porcentaje de las respuestas de cada motor que citan YouTube.'),
    body: `${bars({ items: [
        { label: 'Google AI Overviews', value: 31.2, shown: '31.2', hl: true },
        { label: 'Google AI Mode', value: 29.5, shown: '29.5' },
        { label: 'Perplexity', value: 2.6, shown: '2.6' },
        { label: 'Gemini', value: 2.3, shown: '2.3' },
        { label: 'ChatGPT', value: 2.2, shown: '2.2' },
        { label: 'Copilot', value: 0.5, shown: '0.5' }], max: 35, unit: '%', labelW: 330 })}
${note(t('Different questions and window than slide 2, so compare the shape, not the numbers.', 'Otras preguntas y otra ventana que la lámina 2: compara la forma, no los números.'))}`,
    src: t('Searchable, 29 Aug to 27 Sep 2026, answers that cited at least one source, on questions its customers track.', 'Searchable, del 29 ago al 27 sep 2026, respuestas con al menos una fuente, sobre preguntas que siguen sus clientes.') }),
  slideX({ kicker: t('SOURCE DIET', 'DIETA DE FUENTES'), i: 4, total: T, size: 84, title: t(`Every engine has its ${rp('own diet')}`, `Cada motor tiene su ${rp('propia dieta')}`),
    lead: t('The social site each engine cites most. AI Overviews and AI Mode are Google’s.', 'El sitio social que más cita cada motor. AI Overviews y AI Mode son de Google.'),
    body: `${table({ head: [t('ENGINE', 'MOTOR'), t('TOP SOCIAL SITE', 'SITIO SOCIAL TOP'), t('% OF ANSWERS', '% DE RESPUESTAS')], rows: [
        ['ChatGPT', 'Reddit', '5.9%'],
        ['Perplexity', 'Reddit', '11.3%'],
        ['AI Overviews', 'YouTube', '31.2%'],
        ['AI Mode', 'YouTube', '29.5%'],
        ['Gemini', 'Reddit', '5.4%'],
        ['Copilot', 'LinkedIn', '1.5%']], hlCol: 1 })}`,
    src: t('Searchable, 29 Aug to 27 Sep 2026. Perplexity: LinkedIn is close, 10.9%.', 'Searchable, 29 ago a 27 sep 2026. En Perplexity LinkedIn va cerca: 10.9%.') }),
  slideX({ kicker: t('BEFORE YOU REPEAT IT', 'ANTES DE REPETIRLO'), i: 5, total: T, size: 84, title: t(`Read the ${rp('mix')} behind the number`, `Lee la ${rp('mezcla')} detrás de la cifra`),
    body: `${facts([
      { k: t('VENDOR DATA', 'DATOS DE PROVEEDORES'), v: t('Both studies come from AI visibility vendors, on questions their own customers track. They show what engines cited, not market share.', 'Los dos estudios son de proveedores de visibilidad en IA, con preguntas que siguen sus propios clientes. Muestran qué citaron los motores, no cuota de mercado.'), hl: true },
      { k: t('THE AVERAGE MOVES', 'EL PROMEDIO SE MUEVE'), v: t('Add more Google engines to the blend and YouTube rises. Add more chatbots and it falls.', 'Suma más motores de Google al promedio y YouTube sube. Suma más chatbots y baja.') },
      { k: t('THE QUESTIONS MATTER', 'LAS PREGUNTAS IMPORTAN'), v: t('On buying questions, Wikipedia ranks 72nd and shows up in 0.7% of ChatGPT answers. Ask what something is and the ranking changes.', 'En preguntas de compra, Wikipedia queda en el lugar 72 y aparece en 0.7% de las respuestas de ChatGPT. Pregunta qué es algo y el ranking cambia.') }])}
${note(t('That last ranking is from RankSpot’s own methodology page.', 'Ese último dato sale de la página de método de RankSpot.'))}`,
    src: t('RankSpot, 10 Nov 2026. Searchable, 29 Sep 2026.', 'RankSpot, 10 nov 2026. Searchable, 29 sep 2026.') }),
  slideX({ kicker: t('WHAT I WOULD DO', 'LO QUE YO HARÍA'), i: 6, total: T, size: 92, title: t(`This week, ${rp('three steps')}`, `Esta semana, ${rp('tres pasos')}`),
    lead: t('Which engine do your buyers actually ask?', '¿Qué motor usan de verdad tus compradores?'),
    body: `${steps([
      [t('Find the engine your buyers use', 'Descubre qué motor usan'), t('Add “ChatGPT, Google AI or another AI” to “how did you find us?”', 'Agrega “ChatGPT, IA de Google u otra IA” a “¿cómo nos encontraste?”')],
      [t('Measure each engine on its own', 'Mide cada motor por separado'), t('Run your 10 buyer questions in each one and write down who is cited.', 'Haz tus 10 preguntas de compra en cada uno y anota a quién citan.')],
      [t('Then choose the lever', 'Después elige la palanca'), t('Google AI: one B2B study found cited videos have buying-question titles and timestamps. ChatGPT: YouTube is in 1 to 2% of answers here, so study who it does cite.', 'IA de Google: un estudio B2B vio videos citados con título de pregunta de compra y marcas de tiempo. ChatGPT: YouTube sale en 1 a 2%; estudia a quién sí cita.')]])}`,
    src: t('Sources: RankSpot, Searchable and Foundation Inc. Links in the first comment.', 'RankSpot, Searchable y Foundation Inc. Enlaces en el primer comentario.') }),
] };
