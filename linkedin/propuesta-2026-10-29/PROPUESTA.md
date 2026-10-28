# Propuesta para el post del jueves 2026-10-29

**Recomendación (versión 3, nivel experta):** reemplazar el post 17 por “Puedes salir primero en Google y no existir para ChatGPT: cuatro razones técnicas que ningún reporte de posiciones te muestra”. Muestra criterio técnico verificable (los tres bots de OpenAI y que son independientes, robots.txt abierto frente a lo que responde el servidor, elegibilidad con fragmento, Google-Extended frente a Googlebot), todo de páginas oficiales leídas el 2026-10-28, y marca como “mi lectura” lo que es interpretación. No revela el método ni los chequeos de la auditoría (regla 18): son errores comunes y generales, con su fuente. Sin Geonos, sin publicidad, sin enlace. Pega `post-es.txt` (y `post-en.txt` otro día).

Alternativas guardadas: `opcion-c-dato-vs-suposicion-*.txt` (tesis “dato contra suposición”, más general) y `opcion-b-5-preguntas-*.txt` (cinco preguntas de una línea, mejor como carrusel).

**Propósito que guía el post:** ganar autoridad como quien explica SEO + GEO antes del lanzamiento. La autoridad viene de saber lo que casi nadie ha leído en la fuente, no de dar consejos generales.

**Verificado el 2026-10-28 en la página original:**
- Google (funciones de IA en Search): “a page must be indexed and eligible to be shown in Google Search with a snippet”; “There are no additional technical requirements”; nosnippet, data-nosnippet y max-snippet son los controles para limitar lo que se muestra; robots.txt para Googlebot es el control de rastreo; Google-Extended “to limit AI training and grounding in some of Google's other systems” (la página no dice que controle AI Overviews ni AI Mode); no hace falta schema especial ni archivos de texto para IA; los datos estructurados deben coincidir con el texto visible.
- OpenAI (bots): OAI-SearchBot, GPTBot y ChatGPT-User; “Each setting is independent”; robots.txt puede no aplicar a ChatGPT-User; se recomienda permitir las IP publicadas de OAI-SearchBot; unas 24 horas para que un cambio surta efecto.
- No se usó: el límite de 2 MB de Googlebot. La página de rastreadores de Google solo lo da como ejemplo (“for example, 2MB”) y no lo confirma para Googlebot.

## Por qué este formato (de los datos de Grok del 2026-10-26)
- Persona en primera persona rinde mucho más que la página de empresa.
- Primer renglón con número o postura: "6 GEO price lists", "$10m a $15m en 3 meses". Aquí: "5 preguntas. 5 respuestas de una línea. Todas con fuente."
- Lo educativo con postura saca comentarios (Semrush, 86 comentarios con "Your Google SEO checklist won't get you cited in ChatGPT").
- En español no hay posts de GEO/AEO con más de 8 reacciones en la ventana de Grok (puede ser ausencia de indexación de la API, no prueba).

## Prompts que responde
| MX (ESTUDIO-PROMPTS-MEXICO) | US (archivo de Rafael) | Dónde aparece en el post |
|---|---|---|
| 13 ¿el SEO ya murió por la inteligencia artificial? | 42 is SEO dead because of AI | Google: sin requisitos extra, indexada y con fragmento |
| 46 ¿si salgo primero en Google ya aparezco en ChatGPT? | 57 does ranking #1 on Google mean ChatGPT will recommend me | Rastreador propio, robots.txt |
| 47 ¿Google penaliza las páginas que usan IA para hacer SEO? | (no está en los 59) | Abuso de contenido a escala, revisar a mano |
| 23 cómo saber si mi marca aparece en ChatGPT | 16 does ChatGPT give everyone the same answer about my brand | Repetir; SparkToro |
| 48 si la IA ya da el resumen, ¿la gente va a dejar de entrar a mi página? | 44 and 59 (traffic) | Medir en Search Console y GA4 |

Efecto en el calendario: los posts 18 (11-05), 21 (11-19) y 23 (11-26) ya cubren 46, 47 y 48 por separado. Quedan como análisis a fondo; este post es el resumen de una línea.

## Fuentes (leídas en la página oficial)
- Google, funciones de IA en Search (leída 2026-10-28): "There are no additional requirements to appear in AI Overviews or AI Mode"; página indexada y elegible con fragmento; tráfico en el informe de Rendimiento, tipo Web.
- Google, uso de IA generativa en contenido (leída 2026-10-28): generar muchas páginas sin valor puede violar la política de abuso de contenido a escala; revisar a mano.
- OpenAI, bots y FAQ para editores (leídas 2026-10-26): OAI-SearchBot, utm_source=chatgpt.com.
- SparkToro, 2026-01-28: 600 voluntarios, 12 prompts, 2,961 corridas; menos de 1 en 100 la misma lista.

## Google AI Overviews: qué se puede y qué no
- No se puede prometer que una IA recomiende a nadie.
- LinkedIn aparece entre los dominios más citados en varios estudios de proveedores (Peec, marzo de 2026, 30 millones de fuentes; Semrush), pero son estudios de vendors con métodos distintos, los datos de AI Overviews en concreto son pocos y Cloro reporta que su cuota bajó (4.83% en julio, 1.61% en los últimos 30 días). No se citan en el post.
- Lo que sí mueve la aguja: páginas propias que respondan estas mismas preguntas (los 4 artículos del PR #338 y los anteriores). Con el sitio en noindex hasta el lanzamiento, Google no puede citarlas todavía. Ese es el cuello de botella real.
- Mientras tanto: mismo nombre, cargo y descripción en LinkedIn, About del sitio y bio; preguntas escritas igual que se buscan; respuestas con fuente.

## Cómo ayudar a que corra (sin inventar nada)
1. Publicar y estar presente la primera hora para responder cada comentario con contenido.
2. Primer comentario (opcional): "Si me dices tu giro y tu ciudad, te digo cuál de las 5 revisaría primero." Solo si quieres atender esas respuestas.
3. Tres hashtags máximo, al final. Sin enlace en el cuerpo. Sin nombre del producto.
4. No cambiar el formato antes de ocho semanas y medir con la analítica de LinkedIn.
