# Verificación del post y carrusel "How well do AI chatbots answer questions about news from the same day?" (2026-10-30)

Fuentes leídas hoy:
- arXiv 2605.22785, "Evaluating Commercial AI Chatbots as News Intermediaries" (Suzgun et al., Stanford y Together AI), enviado 21 may 2026. https://arxiv.org/html/2605.22785
- Resumen de Stanford HAI, 3 jun 2026. https://hai.stanford.edu/news/reading-todays-headlines-through-ai-a-real-time-audit-of-six-commercial-chatbots
- Documentación de Google sobre funciones de IA en Search (leída antes): la página debe estar indexada y poder mostrarse con un fragmento.

Lectura completa (30 oct, segunda pasada): leí las dos mitades de la página de arXiv, el texto principal y el apéndice. Ojo: la herramienta responde preguntas dirigidas con un modelo auxiliar, no me da el texto crudo, así que cada cifra se confirmó con una cita del paper.

Correcciones que salieron de la segunda lectura:
- La comparación 86.9% contra 70.2 a 71.1% es de una verificación aparte de un solo día, el 6 de abril de 2026, fuera de la ventana de febrero. El post y la lámina 3 ya lo dicen.
- El paper escribe "31–46% points" en el texto principal y "31–46%" en la introducción. Usé "points" por el texto principal.
- "Citation rate" es la parte de respuestas que citan al menos una URL (definición del apéndice). Ya está en la lámina 5.
- La fecha del 21 de mayo de 2026 es el sello de la versión 1 en arXiv, no una fecha de envío declarada en el texto.
- Los tres jueces de la verificación abierta fueron Claude Opus 4.7, GPT-5.4 y Gemini 3 Pro (acuerdo de Fleiss κ = 0.915).
- "100 items por modelo" en la prueba de premisas falsas viene de mi primera lectura; Stanford HAI confirma los cuatro días y el conjunto de EE. UU. y Canadá.
- Los autores no hicieron todavía una comparación con una muestra anotada por humanos y calificaron las respuestas abiertas con modelos.

| Afirmación | Dónde |
|---|---|
| 6 chatbots con búsqueda web, 2,100 preguntas de BBC del mismo día, 14 días, 9 a 22 feb 2026 | arXiv, método; HAI |
| Los cuatro mejores sobre 90% en opción múltiple | arXiv, tabla por modelo (95.6, 95.0, 93.7, 90.4) |
| 86.9% opción múltiple contra 70.2 a 71.1% en respuesta abierta (un día, 850 pares) | arXiv, validación de respuesta libre |
| Sin búsqueda web, 31 a 46 puntos más de error (EE. UU. y Canadá) | arXiv, hallazgos |
| Recuperación y divergencia de fuentes = 71.5% de 1,497 errores; con la fuente correcta casi siempre respondió bien | arXiv; HAI (38.8% + 32.7%) |
| Tasas de citas y precisión por modelo; ρ = 0.31, p = 0.54 | arXiv, tabla |
| Premisas falsas: GPT-5 19.0%, Grok 4 70.0%; GPT-5 aceptó premisas falsas 64% | arXiv; HAI |
| Límites: preprint, 14 días, BBC bien indexado, opción múltiple, preguntas generadas por Gemini 3 Flash, sin español | arXiv, limitaciones; HAI |

No verificado: el párrafo "My read" y el paso 3 son interpretación y ejercicio propios, no del estudio.
