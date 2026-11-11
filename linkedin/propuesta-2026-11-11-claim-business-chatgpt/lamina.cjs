// Carousel 2026-11-11: "Businesses in ChatGPT" (claim your business), launched 10 Nov 2026. EN/ES via POSTLANG; THEME=light for the light version.
// Checked 11 Nov 2026 against the owner's scrape of OpenAI's product page, announcement, Help Center article and policies (OpenAI pages return HTTP 403 from the sandbox, so they were not opened directly),
// plus Search Engine Roundtable and Digiday (10 Nov 2026) for cross-checks.
const { C, rp, slideX, compare, callout, note, facts, steps } = require('../kit-visual/componentes.cjs');
const L = process.env.POSTLANG === 'es' ? 'es' : 'en';
const t = (en, es) => (L === 'es' ? es : en);
const T = 6;
module.exports = { file: `${L}-claim-business-chatgpt`, slides: [
  slideX({ kicker: t('BUSINESSES IN CHATGPT', 'NEGOCIOS EN CHATGPT'), i: 1, total: T, size: 84,
    title: t(`OpenAI just launched ${rp('“claim your business”')} in ChatGPT`, `OpenAI acaba de lanzar ${rp('“reclama tu negocio”')} en ChatGPT`),
    lead: t('Beta, 10 Nov 2026. Here is what is confirmed.', 'Beta, 10 nov 2026. Esto es lo que está confirmado.'),
    body: `${callout(t('“It does not guarantee increased visibility or give you direct control over ChatGPT’s independent recommendations.”', '“No garantiza mayor visibilidad ni te da control directo sobre las recomendaciones independientes de ChatGPT.”'), { grow: true, size: 44 })}${note(t('That is what OpenAI says claiming does. It is a way to give ChatGPT your facts, not a ranking button.', 'Eso dice OpenAI que hace reclamar. Es una forma de darle tus datos a ChatGPT, no un botón de posicionamiento.'))}`,
    src: t('OpenAI Help Center, “Setting up your business on ChatGPT”, 10 Nov 2026.', 'Centro de ayuda de OpenAI, “Setting up your business on ChatGPT”, 10 nov 2026.') }),
  slideX({ kicker: t('WHAT YOU GET', 'QUÉ OBTIENES'), i: 2, total: T, size: 84, title: t(`Three things, ${rp('one dashboard')}`, `Tres cosas, ${rp('un solo panel')}`),
    body: `${facts([
      { k: t('1 · CLAIM', '1 · RECLAMAR'), v: t('Claim your business in Business Hub and manage the information ChatGPT uses about it.', 'Reclama tu negocio en Business Hub y gestiona la información que ChatGPT usa sobre él.'), hl: true },
      { k: t('2 · INSIGHTS', '2 · DATOS'), v: t('Mentions, website clicks and discovery topics. Clicks do not confirm visits or conversions.', 'Menciones, clics a tu sitio y temas de descubrimiento. Los clics no confirman visitas ni conversiones.') },
      { k: t('3 · BUSINESS AGENTS', '3 · AGENTES DE NEGOCIO'), v: t('A chat with your business, starting with eligible ecommerce and online service businesses in the US.', 'Un chat con tu negocio, empezando por negocios de comercio electrónico y servicios en línea elegibles en EE. UU.') }])}
${note(t('OpenAI says 1.2 billion people use ChatGPT each week. That figure is self-reported.', 'OpenAI dice que 1,200 millones de personas usan ChatGPT cada semana. Esa cifra la informa la propia empresa.'))}`,
    src: t('OpenAI announcement, 10 Nov 2026.', 'Anuncio de OpenAI, 10 nov 2026.') }),
  slideX({ kicker: t('HOW TO CLAIM', 'CÓMO RECLAMAR'), i: 3, total: T, size: 84, title: t(`Three steps, ${rp('two approvals')}`, `Tres pasos, ${rp('dos aprobaciones')}`),
    body: `${steps([
      [t('Verify the claim', 'Verifica la reclamación'), t('Business phone (text or call), business email, a DNS record or a Shopify store.', 'Teléfono del negocio (texto o llamada), correo del negocio, un registro DNS o una tienda Shopify.')],
      [t('Pass the identity check', 'Pasa la verificación de identidad'), t('Persona. Needed to publish changes, add a feed or see insights. The blue check comes after it.', 'Persona. Se necesita para publicar cambios, añadir un catálogo o ver datos. El check azul llega después.')],
      [t('Edit your profile', 'Edita tu perfil'), t('Website, description, category, logo, cover, delivery and return policies. OpenAI reviews each change.', 'Sitio, descripción, categoría, logo, portada, políticas de envío y devolución. OpenAI revisa cada cambio.')]])}`,
    src: t('OpenAI Help Center, 10 Nov 2026.', 'Centro de ayuda de OpenAI, 10 nov 2026.') }),
  slideX({ kicker: t('WHO CAN USE IT', 'QUIÉN PUEDE USARLO'), i: 4, total: T, size: 84, title: t(`Not everyone ${rp('can use it yet')}`, `No todos ${rp('pueden usarlo todavía')}`),
    body: `${facts([
      { k: t('LOCAL STORES AND RESTAURANTS', 'TIENDAS LOCALES Y RESTAURANTES'), v: t('Can claim only an existing listing, and only in the US.', 'Solo pueden reclamar una ficha que ya existe, y solo en EE. UU.'), hl: true },
      { k: t('ONLINE BUSINESSES', 'NEGOCIOS EN LÍNEA'), v: t('Eligible ones can add a new profile if none exists.', 'Los elegibles pueden crear un perfil nuevo si no existe.') },
      { k: t('BUSINESS AGENTS', 'AGENTES DE NEGOCIO'), v: t('Only eligible ecommerce and online service businesses in the US, with a website, at launch.', 'Solo negocios de comercio electrónico y servicios en línea elegibles en EE. UU., con sitio web, en el lanzamiento.') }])}
${note(t('Mexico is not named. Claiming is open where ChatGPT is available and verification is supported. Check Business Hub.', 'México no se nombra. Reclamar está abierto donde ChatGPT está disponible y se admite la verificación. Revisa Business Hub.'))}`,
    src: t('OpenAI Help Center and announcement, 10 Nov 2026.', 'Centro de ayuda y anuncio de OpenAI, 10 nov 2026.') }),
  slideX({ kicker: t('FACTS, NOT RANKING', 'DATOS, NO POSICIÓN'), i: 5, total: T, size: 84, title: t(`You control the ${rp('facts')}`, `Controlas los ${rp('datos')}`),
    body: `${compare({ left: { lab: t('YOU CAN EDIT', 'PUEDES EDITAR'), big: t('Facts', 'Datos'), text: t('Website, description, delivery and return policies', 'Sitio, descripción, políticas de envío y devolución') }, right: { lab: t('YOU CANNOT BUY', 'NO PUEDES COMPRAR'), big: t('Rank', 'Posición'), text: t('ChatGPT keeps making its own recommendations', 'ChatGPT sigue haciendo sus propias recomendaciones') }, hl: 0 })}
${callout(t('My read: ChatGPT gets accurate inputs from you. The ranking stays its call.', 'Mi lectura: ChatGPT recibe datos correctos de tu parte. La posición sigue siendo decisión suya.'), { grow: true, size: 42 })}
${note(t('For an online business, a mention counts when ChatGPT references your website. The brand name alone does not count.', 'En un negocio en línea, una mención cuenta cuando ChatGPT hace referencia a tu sitio. El nombre de la marca solo no cuenta.'))}`,
    src: t('OpenAI Help Center, 10 Nov 2026. Definition confirmed to Digiday by an OpenAI spokesperson.', 'Centro de ayuda de OpenAI, 10 nov 2026. Definición confirmada a Digiday por un vocero de OpenAI.') }),
  slideX({ kicker: t('WHAT I WOULD DO', 'LO QUE YO HARÍA'), i: 6, total: T, size: 92, title: t(`This week, ${rp('three steps')}`, `Esta semana, ${rp('tres pasos')}`),
    lead: t('Which fact about your business would you correct first?', '¿Qué dato de tu negocio corregirías primero?'),
    body: `${steps([
      [t('Check eligibility and ownership', 'Revisa elegibilidad y titularidad'), t('If someone already claimed your listing, there is a “Dispute ownership” option.', 'Si alguien ya reclamó tu ficha, hay una opción “Dispute ownership”.')],
      [t('Fix your facts first', 'Corrige tus datos primero'), t('Prices, stock, delivery and return policies. Those are the inputs you can change.', 'Precios, inventario, políticas de envío y devolución. Esos son los datos que puedes cambiar.')],
      [t('Measure on your side', 'Mide de tu lado'), t('Filter utm_source=chatgpt.com in your analytics (one test saw ChatGPT add it) and ask “how did you find us?”', 'Filtra utm_source=chatgpt.com en tu analítica (una prueba vio que ChatGPT lo agrega) y pregunta “¿cómo nos encontraste?”')]])}`,
    src: t('Sources: OpenAI Help Center and announcement, Flavio Copes. Links in the first comment.', 'Fuentes: Centro de ayuda y anuncio de OpenAI, Flavio Copes. Enlaces en el primer comentario.') }),
] };
