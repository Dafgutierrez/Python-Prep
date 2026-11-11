// Carousel 2026-11-11: "Businesses in ChatGPT" (claim your business), launched 10 Nov 2026. EN/ES via POSTLANG; THEME=light for the light version.
// Sources read 11 Nov 2026: Search Engine Roundtable (10 Nov 2026), which quotes OpenAI's announcement; Flavio Copes hands-on guide (10 Nov 2026), which quotes OpenAI's product page.
// OpenAI's own pages returned HTTP 403 from the sandbox and were not read directly.
const { C, rp, slideX, compare, callout, note, facts, steps } = require('../kit-visual/componentes.cjs');
const L = process.env.POSTLANG === 'es' ? 'es' : 'en';
const t = (en, es) => (L === 'es' ? es : en);
const T = 6;
module.exports = { file: `${L}-claim-business-chatgpt`, slides: [
  slideX({ kicker: t('BUSINESSES IN CHATGPT', 'NEGOCIOS EN CHATGPT'), i: 1, total: T, size: 84,
    title: t(`OpenAI just launched ${rp('“claim your business”')} in ChatGPT`, `OpenAI acaba de lanzar ${rp('“reclama tu negocio”')} en ChatGPT`),
    lead: t('Beta, 10 Nov 2026. Here is what is confirmed.', 'Beta, 10 nov 2026. Esto es lo que está confirmado.'),
    body: `${callout(t('“Claiming does not guarantee higher placement or sales.”', '“Reclamar no garantiza una mejor posición ni más ventas.”'), { grow: true, size: 54 })}${note(t('That is OpenAI’s own line. It is a way to give ChatGPT your facts, not a ranking button.', 'Esa es la frase de OpenAI. Es una forma de darle tus datos a ChatGPT, no un botón de posicionamiento.'))}`,
    src: t('OpenAI announcement and product page, 10 Nov 2026, as quoted by Search Engine Roundtable and Flavio Copes.', 'Anuncio y página de producto de OpenAI, 10 nov 2026, citados por Search Engine Roundtable y Flavio Copes.') }),
  slideX({ kicker: t('WHAT YOU GET', 'QUÉ OBTIENES'), i: 2, total: T, size: 84, title: t(`Three things, ${rp('one dashboard')}`, `Tres cosas, ${rp('un solo panel')}`),
    body: `${facts([
      { k: t('1 · CLAIM', '1 · RECLAMAR'), v: t('Claim your business in Business Hub and manage the information ChatGPT uses about it.', 'Reclama tu negocio en Business Hub y gestiona la información que ChatGPT usa sobre él.'), hl: true },
      { k: t('2 · INSIGHTS', '2 · DATOS'), v: t('Mentions, website clicks and discovery topics. Clicks do not confirm visits or conversions.', 'Menciones, clics a tu sitio y temas de descubrimiento. Los clics no confirman visitas ni conversiones.') },
      { k: t('3 · BUSINESS AGENTS', '3 · AGENTES DE NEGOCIO'), v: t('A chat with your business, starting with eligible ecommerce and online service businesses in the US.', 'Un chat con tu negocio, empezando por negocios de comercio electrónico y servicios en línea elegibles en EE. UU.') }])}
${note(t('OpenAI says 1.2 billion people use ChatGPT each week. That figure is self-reported.', 'OpenAI dice que 1,200 millones de personas usan ChatGPT cada semana. Esa cifra la informa la propia empresa.'))}`,
    src: t('OpenAI announcement, 10 Nov 2026, as quoted by Search Engine Roundtable.', 'Anuncio de OpenAI, 10 nov 2026, citado por Search Engine Roundtable.') }),
  slideX({ kicker: t('HOW TO CLAIM', 'CÓMO RECLAMAR'), i: 3, total: T, size: 84, title: t(`Three steps, ${rp('two approvals')}`, `Tres pasos, ${rp('dos aprobaciones')}`),
    body: `${steps([
      [t('Verify the claim', 'Verifica la reclamación'), t('Phone or text to the business number, or a DNS record. Reports add email and Shopify.', 'Llamada o texto al número del negocio, o un registro DNS. Otros reportes agregan correo y Shopify.')],
      [t('Pass the identity check', 'Pasa la verificación de identidad'), t('Persona. Needed to publish changes, add a feed or see insights. The blue check comes after it.', 'Persona. Se necesita para publicar cambios, añadir un catálogo o ver datos. El check azul llega después.')],
      [t('Edit your profile', 'Edita tu perfil'), t('Website, description, category, logo, cover, delivery and return policies. OpenAI reviews each change.', 'Sitio, descripción, categoría, logo, portada, políticas de envío y devolución. OpenAI revisa cada cambio.')]])}`,
    src: t('Search Engine Roundtable and Flavio Copes, 10 Nov 2026. Persona and email/Shopify details come from the hands-on guide.', 'Search Engine Roundtable y Flavio Copes, 10 nov 2026. Persona, correo y Shopify salen de la guía práctica.') }),
  slideX({ kicker: t('WHO CAN USE IT', 'QUIÉN PUEDE USARLO'), i: 4, total: T, size: 84, title: t(`Not everyone ${rp('can use it yet')}`, `No todos ${rp('pueden usarlo todavía')}`),
    body: `${facts([
      { k: t('LOCAL STORES AND RESTAURANTS', 'TIENDAS LOCALES Y RESTAURANTES'), v: t('Can claim only an existing listing, and only in the US.', 'Solo pueden reclamar una ficha que ya existe, y solo en EE. UU.'), hl: true },
      { k: t('ONLINE BUSINESSES', 'NEGOCIOS EN LÍNEA'), v: t('Eligible ones can add a new profile if none exists. You need a website.', 'Los elegibles pueden crear un perfil nuevo si no existe. Se necesita un sitio web.') },
      { k: t('FREELANCERS AND AGENCIES', 'FREELANCERS Y AGENCIAS'), v: t('The “service you visit or provide remotely” option showed “coming soon” on launch day.', 'La opción de servicio presencial o remoto decía “próximamente” el día del lanzamiento.') }])}
${note(t('I could not confirm availability for Mexico or Latin America. Check eligibility in Business Hub.', 'No pude confirmar la disponibilidad en México ni en Latinoamérica. Revisa la elegibilidad en Business Hub.'))}`,
    src: t('Flavio Copes hands-on guide, 10 Nov 2026, quoting OpenAI’s policies.', 'Guía práctica de Flavio Copes, 10 nov 2026, que cita las políticas de OpenAI.') }),
  slideX({ kicker: t('FACTS, NOT RANKING', 'DATOS, NO POSICIÓN'), i: 5, total: T, size: 84, title: t(`You control the ${rp('facts')}`, `Controlas los ${rp('datos')}`),
    body: `${compare({ left: { lab: t('YOU CAN EDIT', 'PUEDES EDITAR'), big: t('Facts', 'Datos'), text: t('Website, description, delivery and return policies', 'Sitio, descripción, políticas de envío y devolución') }, right: { lab: t('YOU CANNOT BUY', 'NO PUEDES COMPRAR'), big: t('Rank', 'Posición'), text: t('ChatGPT keeps making its own recommendations', 'ChatGPT sigue haciendo sus propias recomendaciones') }, hl: 0 })}
${callout(t('My read: ChatGPT gets accurate inputs from you. The ranking stays its call.', 'Mi lectura: ChatGPT recibe datos correctos de tu parte. La posición sigue siendo decisión suya.'), { grow: true, size: 42 })}
${note(t('For an online business, one hands-on test counted a mention only when ChatGPT referenced the website. A brand named without a link to its site did not count.', 'En un negocio en línea, una prueba práctica contó una mención solo cuando ChatGPT hacía referencia al sitio. Una marca nombrada sin enlace a su sitio no contó.'))}`,
    src: t('OpenAI product page via Flavio Copes, 10 Nov 2026. One test, one product category.', 'Página de producto de OpenAI vía Flavio Copes, 10 nov 2026. Una prueba, una categoría de producto.') }),
  slideX({ kicker: t('WHAT I WOULD DO', 'LO QUE YO HARÍA'), i: 6, total: T, size: 92, title: t(`This week, ${rp('three steps')}`, `Esta semana, ${rp('tres pasos')}`),
    lead: t('Which fact about your business would you correct first?', '¿Qué dato de tu negocio corregirías primero?'),
    body: `${steps([
      [t('Check eligibility and ownership', 'Revisa elegibilidad y titularidad'), t('If someone already claimed your listing, there is a “Dispute ownership” option.', 'Si alguien ya reclamó tu ficha, hay una opción “Dispute ownership”.')],
      [t('Fix your facts first', 'Corrige tus datos primero'), t('Prices, stock, delivery and return policies. Those are the inputs you can change.', 'Precios, inventario, políticas de envío y devolución. Esos son los datos que puedes cambiar.')],
      [t('Measure on your side', 'Mide de tu lado'), t('Filter utm_source=chatgpt.com in your analytics, and ask “how did you find us?”', 'Filtra utm_source=chatgpt.com en tu analítica y pregunta “¿cómo nos encontraste?”')]])}`,
    src: t('Sources: Search Engine Roundtable and Flavio Copes, 10 Nov 2026. Links in the first comment.', 'Fuentes: Search Engine Roundtable y Flavio Copes, 10 nov 2026. Enlaces en el primer comentario.') }),
] };
