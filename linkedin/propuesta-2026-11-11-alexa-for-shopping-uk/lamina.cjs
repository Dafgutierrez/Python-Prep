// Carousel 2026-11-11: Alexa for Shopping launches in the UK (About Amazon UK, 11 Nov 2026). EN/ES via POSTLANG; THEME=light for the light version.
// Checked 11 Nov 2026 against About Amazon UK (11 Nov 2026 launch post; 19 Mar 2026 Alexa+ post) and About Amazon EU (29 Oct 2024), read directly. See VERIFICACION.md.
const { C, rp, slideX, compare, callout, note, facts, steps, table } = require('../kit-visual/componentes.cjs');
const L = process.env.POSTLANG === 'es' ? 'es' : 'en';
const t = (en, es) => (L === 'es' ? es : en);
const T = 7;
const SRC = t('About Amazon UK, “Meet Alexa for Shopping”, 11 Nov 2026.', 'About Amazon UK, “Meet Alexa for Shopping”, 11 nov 2026.');
module.exports = { file: `${L}-alexa-for-shopping-uk`, slides: [
  slideX({ kicker: t('AMAZON.CO.UK · 11 NOV 2026', 'AMAZON.CO.UK · 11 NOV 2026'), i: 1, total: T, size: 88,
    title: t(`Alexa for Shopping is now ${rp('live in the UK')}`, `Alexa for Shopping ya está ${rp('en Reino Unido')}`),
    lead: t('On the Amazon Shopping app and website.', 'En la app Amazon Shopping y en el sitio web.'),
    body: `${callout(t('Free for any signed-in customer. No Prime membership. No Echo device.', 'Gratis para cualquier cliente con sesión iniciada. Sin Prime. Sin dispositivo Echo.'), { grow: true, size: 52 })}${note(t('Rufus brought the product expertise. Alexa+ brings personal context from Amazon.co.uk and Alexa+ conversations.', 'Rufus aporta el conocimiento de producto. Alexa+ aporta el contexto personal de Amazon.co.uk y de las conversaciones con Alexa+.'))}`,
    src: SRC }),
  slideX({ kicker: t('LIVE TODAY', 'YA DISPONIBLE'), i: 2, total: T, size: 84, title: t(`Six things it ${rp('does now')}`, `Seis cosas que ${rp('ya hace')}`),
    body: facts([
      { k: t('AI OVERVIEWS', 'RESÚMENES CON IA'), v: t('At the top of search results and on product pages.', 'Arriba de los resultados de búsqueda y en las páginas de producto.'), hl: true },
      { k: t('COMPARISONS', 'COMPARACIONES'), v: t('Side by side: features, prices and review highlights.', 'Lado a lado: características, precios y lo más destacado de las reseñas.') },
      { k: t('PRICE HISTORY', 'HISTORIAL DE PRECIOS'), v: t('Up to a full year: 30, 60 or 365 days.', 'Hasta un año completo: 30, 60 o 365 días.') },
      { k: t('SHOPPING GUIDES', 'GUÍAS DE COMPRA'), v: t('Personalised, for bigger buys like a TV or a laptop.', 'Personalizadas, para compras grandes como una tele o una laptop.') },
      { k: t('BASKET', 'CARRITO'), v: t('“Add my usual cleaning products” builds it from past orders.', '“Add my usual cleaning products” lo arma con pedidos anteriores.') },
      { k: t('YOUR PROFILE', 'TU PERFIL'), v: t('View, update or remove what it knows: family, pets, dietary needs.', 'Ver, cambiar o borrar lo que sabe de ti: familia, mascotas, dieta.') }], true),
    src: SRC }),
  slideX({ kicker: t('COMING NEXT', 'LO QUE VIENE'), i: 3, total: T, size: 84, title: t(`Not live yet: ${rp('price automation')}`, `Aún no disponible: ${rp('precios automáticos')}`),
    body: `${facts([
      { k: t('PRICE ALERTS', 'ALERTAS DE PRECIO'), v: t('Set a target price and get notified when it drops to it.', 'Fijas un precio objetivo y te avisa cuando baja a ese precio.'), hl: true },
      { k: t('SCHEDULED ACTIONS', 'ACCIONES PROGRAMADAS'), v: t('Restock essentials monthly, or “add this sunscreen to my basket if the price drops below £10”.', 'Reponer básicos cada mes, o “add this sunscreen to my basket if the price drops below £10”.') },
      { k: t('MORE PERSONAL', 'MÁS PERSONAL'), v: t('Better memory of preferences and conversations across devices.', 'Mejor memoria de preferencias y conversaciones entre dispositivos.') }])}
${note(t('Amazon lists these under “What’s coming next”, in the weeks and months ahead. They were not live on 11 November.', 'Amazon los pone en “What’s coming next”, para las próximas semanas y meses. No estaban activos el 11 de noviembre.'))}`,
    src: SRC }),
  slideX({ kicker: t('TWO CLARIFICATIONS', 'DOS ACLARACIONES'), i: 4, total: T, size: 84, title: t(`What this launch ${rp('is not')}`, `Lo que este lanzamiento ${rp('no es')}`),
    body: `${compare({ left: { lab: t('TEXT SHOPPING', 'COMPRAR POR TEXTO'), big: t('US only', 'Solo EE. UU.'), text: t('The 6 Nov text launch is invite-only in the US. No UK date announced.', 'El lanzamiento por texto del 6 nov es por invitación en EE. UU. Sin fecha para Reino Unido.') }, right: { lab: t('ALEXA+ IN THE UK', 'ALEXA+ EN REINO UNIDO'), big: t('Early Access', 'Early Access'), text: t('Still Early Access. Alexa for Shopping works on its own in the app and on the website.', 'Sigue en Early Access. Alexa for Shopping funciona sola en la app y en el sitio.') }, hl: 0 })}
${callout(t('The UK post mentions no text messages, no Echo Show and no ads.', 'El anuncio de Reino Unido no menciona mensajes de texto, ni Echo Show, ni anuncios.'), { grow: true, size: 44 })}`,
    src: t('About Amazon UK, 11 Nov 2026 and 19 Mar 2026; Amazon US text launch, 6 Nov 2026.', 'About Amazon UK, 11 nov 2026 y 19 mar 2026; lanzamiento por texto de Amazon US, 6 nov 2026.') }),
  slideX({ kicker: t('HOW IT GOT HERE', 'CÓMO LLEGAMOS AQUÍ'), i: 5, total: T, size: 84, title: t(`Two years, ${rp('one assistant')}`, `Dos años, ${rp('un solo asistente')}`),
    body: `${table({ head: [t('Date', 'Fecha'), t('What happened', 'Qué pasó')], hlCol: -1, rows: [
      [t('Sep 2024', 'sep 2024'), t('Rufus launches in the UK', 'Rufus llega a Reino Unido')],
      [t('29 Oct 2024', '29 oct 2024'), t('Rufus beta in DE, FR, IT, ES', 'Rufus en beta en DE, FR, IT, ES')],
      [t('19 Mar 2026', '19 mar 2026'), t('Alexa+ Early Access in the UK', 'Alexa+ en Early Access en R. U.')],
      [t('13 May 2026', '13 may 2026'), t('US: Rufus becomes Alexa for Shopping', 'EE. UU.: Rufus pasa a ser Alexa for Shopping')],
      [t('6 Nov 2026', '6 nov 2026'), t('US: shopping by text, by invite', 'EE. UU.: compras por texto, por invitación')],
      [`<b>${t('11 Nov 2026', '11 nov 2026')}</b>`, `<b>${t('UK: Alexa for Shopping launches', 'R. U.: llega Alexa for Shopping')}</b>`]] })}
${note(t('Alexa+ in the UK is free during Early Access, then £19.99 a month, and free for Prime members. Alexa for Shopping is free for any signed-in customer.', 'Alexa+ en Reino Unido es gratis durante Early Access, después £19.99 al mes, y gratis para miembros Prime. Alexa for Shopping es gratis con sesión iniciada.'))}`,
    src: t('About Amazon UK, About Amazon EU (29 Oct 2024), About Amazon US.', 'About Amazon UK, About Amazon EU (29 oct 2024), About Amazon US.') }),
  slideX({ kicker: t('MY TAKE', 'MI LECTURA'), i: 6, total: T, size: 84, title: t(`The discovery layer ${rp('changed again')}`, `La capa de descubrimiento ${rp('cambió otra vez')}`),
    body: `${steps([
      [t('It writes the summary first', 'Escribe el resumen primero'), t('The overview your shopper reads before any product.', 'El resumen que tu comprador lee antes de ver un producto.')],
      [t('It compares you side by side', 'Te compara lado a lado'), t('Features, prices and review highlights.', 'Características, precios y lo destacado de las reseñas.')],
      [t('It shows your price history', 'Muestra tu historial de precios'), t('A full year, before they decide.', 'Un año completo, antes de que decidan.')]])}
${callout(t('Listing text, attributes, reviews and clean price data are the GEO work inside Amazon.', 'El texto de la ficha, los atributos, las reseñas y los precios limpios son el trabajo de GEO dentro de Amazon.'), { size: 40 })}`,
    src: t('My reading of the announcement, not an Amazon statement.', 'Mi lectura del anuncio, no una declaración de Amazon.') }),
  slideX({ kicker: t('WHAT I WOULD DO', 'LO QUE YO HARÍA'), i: 7, total: T, size: 78, title: t(`Optimise what it reads, ${rp('measure what it shows')}`, `Optimiza lo que lee, ${rp('mide lo que muestra')}`),
    lead: t('Amazon does not publish how Alexa for Shopping ranks products.', 'Amazon no publica cómo Alexa for Shopping ordena los productos.'),
    body: `${steps([
      [t('Write for the summary', 'Escribe para el resumen'), t('State size, fit, compatibility and who it is for, in UK English.', 'Di talla, ajuste, compatibilidad y para quién es, en inglés británico.')],
      [t('Complete the facts it compares', 'Completa lo que compara'), t('Every attribute that applies, plus review problems answered in the listing.', 'Cada atributo que aplique, y los problemas de las reseñas resueltos en la ficha.')],
      [t('Ask it yourself, over days', 'Pregúntale tú, varios días'), t('Run your buyers’ questions on Amazon.co.uk and note who it names.', 'Haz las preguntas de tus compradores en Amazon.co.uk y anota a quién nombra.')]])}`,
    src: t('Sources: About Amazon UK, About Amazon EU, Gagadget, Retail Gazette. Links in the first comment.', 'Fuentes: About Amazon UK, About Amazon EU, Gagadget, Retail Gazette. Enlaces en el primer comentario.') }),
] };
