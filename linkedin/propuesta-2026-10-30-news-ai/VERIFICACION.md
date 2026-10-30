# Verificación del post y carrusel "How well do AI chatbots answer questions about news from the same day?" (2026-10-30)

Fuentes leídas hoy:
- arXiv 2605.22785, "Evaluating Commercial AI Chatbots as News Intermediaries" (Suzgun et al., Stanford y Together AI), enviado 21 may 2026. https://arxiv.org/html/2605.22785
- Resumen de Stanford HAI, 3 jun 2026. https://hai.stanford.edu/news/reading-todays-headlines-through-ai-a-real-time-audit-of-six-commercial-chatbots
- Documentación de Google sobre funciones de IA en Search (leída antes): la página debe estar indexada y poder mostrarse con un fragmento.

Límite de lectura: de la página de arXiv la herramienta devolvió solo los primeros 100,000 de 177,588 caracteres. Las cifras del post salen de esa parte y del resumen de HAI. Falta revisar el apéndice.

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
