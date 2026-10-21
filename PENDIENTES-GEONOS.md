# Pendientes de Geonos (guardado 2026-10-21)

## Alinear el blog en español con el plan de Fatima

Fatima entregó para México (archivo del 2026-10-19, `geonos_drafts_mx-es_2026-10-19_inicial_OK.md`): 29 piezas con borrador, calendario de 8 semanas y matriz de cobertura. 12 son guías de blog y 4 son páginas del sitio. Mis 8 guías del PR GEONOS#299 las escribí sin comparar con ese plan. Decisión de Dafne: dejarlo en pendientes y no fusionar el PR #299 hasta alinear.

1. Rehacer las guías sobre el plan de Fatima: sus títulos, su keyword literal, sus preguntas y tablas, 800 palabras o más.
   - Coinciden con mis guías: R-content-1 (qué es SEO), R-content-2 (posicionar la página), R-content-3 (aparecer en ChatGPT), R-content-4 (robots.txt), R-content-10 (Search Console).
   - llms.txt, schema y GEO/AEO/SEO van como secciones dentro de R-content-4 y R-content-1, no como guías separadas.
   - Faltan: R-seo-2 (agencia SEO CDMX, 3,600/mes, semana 1), R-content-5 (Google reviews y la IA), R-content-6 (palabras clave B2B de nicho), R-content-11 (Google Ads), R-content-9 (WhatsApp con Meta AI), R-content-12 (qué dice ChatGPT de tu marca, incompleta).
2. Pedir a Grok la v2 de los borradores de México. La versión del 2026-10-19 todavía trae Mercado Libre (153 menciones; R-content-8 entera), `support@geonos.ai` (14 veces) y "10 motores". R-content-7 y R-content-9 también nombran Mercado Libre.
3. Dafne debe dar nombre, puesto y credencial verificable de quien firma las guías. Todas las piezas de Fatima llevan nota de autor y ninguna sale sin eso.
4. Datos que no se pueden inventar: fechas, enlaces oficiales (OAI-SearchBot, PerplexityBot, Claude-SearchBot, Search Console, GA4), precios de agencias con fuente, precio en MXN. R-seo-4 (página de producto) tiene más de 100 marcas pendientes.
5. Por el calendario de Fatima las guías se publican al lanzar, después de quitar el noindex (R-01) y de tener la versión es-MX con URL propia (R-24).
6. Verificar en Google Search Central las frases sobre llms.txt, schema y funciones de IA (la URL en español que usa Fatima: `developers.google.com/search/docs/appearance/ai-features?hl=es`).

## Otros pendientes abiertos

- Eliminar Mercado Libre del producto (rama `claude/remove-mercadolibre`, solo local; el clon de `/home/user/geonos` ya no existe en esta sesión, hay que volver a clonar GEONOS y rehacerla).
- Decisión de Dafne: motores públicos (11 superficies con Alexa o 10 más Alexa aparte).
- Dafne: abrir robots.txt y sitemap.xml de getgeonos.com y reportar; variables `GEONOS_SITE_URL` y `GEONOS_PUBLIC_URL` en Vercel.
- Llaves de bots (fatima, patrick, rafael) en la consola de dueño y prueba real de carga.
- Corregir la frase de Mercado Libre en `docs/RECOMMENDATIONS.md`; página `/bot` no construida.
- Kit de LinkedIn: siguiente publicación jueves 2026-10-22 (mito de llms.txt).
