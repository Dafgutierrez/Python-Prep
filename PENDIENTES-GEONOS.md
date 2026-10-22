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
- ~~Abrir robots.txt y sitemap.xml de getgeonos.com~~ (resuelto 2026-10-22: daban 404 por un error de ruteo, ya corregido y publicado). Sigue pendiente: variables `GEONOS_SITE_URL` y `GEONOS_PUBLIC_URL` en Vercel.
- Llaves de bots (fatima, patrick, rafael) en la consola de dueño y prueba real de carga.
- Corregir la frase de Mercado Libre en `docs/RECOMMENDATIONS.md`; página `/bot` no construida.
- Kit de LinkedIn: siguiente publicación jueves 2026-10-22 (mito de llms.txt).


---

# Por hacer (guardado 2026-10-22)

## Ya está hecho y publicado (para que no se repita)
Motor de Google AI Overviews y capturas de pantalla, "Preguntas sin página", calificar páginas de la competencia (falta redesplegar Railway), conector de Claude sin terminal, herramientas de MCP para SEO, recomendaciones y borradores, arreglo de robots.txt y sitemap, un solo H1, FAQ visible, refresco del dashboard sin perder la página.

## Tú (Dafne)
1. **Cambiar el sitio web de la marca** en Settings a `getgeonos.com` (hoy dice `geonos-demo.vercel.app`; al cambiarlo corre una auditoría nueva).
2. **Revocar las dos llaves viejas** de MCP ("GEONOS" y "geonos") y probar el conector de Claude con el botón **Add to Claude**.
3. **Railway:** esperar a que reanuden las construcciones; luego mandarme la lista de **nombres** de variables, redesplegar `geonos-audit`, y cambiar `GEONOS_FULL_SECRET` en Railway y Vercel con el mismo valor nuevo. La llave de Anthropic va **solo en Vercel**.
4. **Llave de Anthropic** (`ANTHROPIC_API_KEY`) en Vercel y decidir el tope mensual por cliente, para la prueba de Haiku contra Sonnet y para leer sentimiento, reputación y claims.
5. **Datos legales** para Acerca de, Privacidad y Términos: nombre completo, ciudad y país, domicilio, correo `privacy@`, tu presentación de 2 a 4 líneas y 4 decisiones (borrado a 30 días, reembolsos, tope de responsabilidad, si Anthropic aparece como proveedor). Borrador en `legal/BORRADOR-ABOUT-PRIVACY-TERMS.md`.
6. **Enlaces de tus redes sociales** para el marcado de perfiles.
7. **Decidir:** plan por fases dentro del producto, el carrusel de LinkedIn contra el post "6 Months AI SEO Plan", y el asistente dentro del dashboard.
8. Decidir qué hacer primero en el reporte de auditoría: agrupar los "no aplica", el aviso de pausa antes del lanzamiento, o la auditoría de ensayo del lanzamiento.

## Claude
1. **Directorio de conectores de Claude** (que aparezca con nombre y logo y no como "Custom"). Ya están los títulos y el botón. Falta: aviso de privacidad publicado (necesita tus datos), página de ayuda pública, cuenta de prueba con datos, y enviar en `claude.ai/directory/manage`. Texto del listado y lista de requisitos en `docs/CLAUDE-DIRECTORY-LISTING.md`.
2. Puntos 4 a 7 de tu orden: qué mantener o cambiar página por página con nivel de confianza, enlaces internos con razón honesta, las ~20 preguntas de sí/no antes del editor, e intención de Search Console con modelo.
3. Asistente dentro del dashboard con las mismas herramientas de lectura.
4. Reporte de auditoría: "No revisado" aparte, aviso de pausa, auditoría de ensayo.
5. Borrado automático de los datos al cancelar (el aviso de privacidad lo promete).
6. Home: 18 imágenes sin ancho y alto, 67 de 95 sin formato moderno, el pie de página dentro de `<main>`.
7. Conector para ChatGPT: verificar sus direcciones de retorno.
8. Dirección de respaldo `geonos-demo.vercel.app` en Stripe y en las conexiones de Google (cambiarla al conectar Google).
