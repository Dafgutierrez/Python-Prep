# Cómo aplicar el hallazgo del autocompletado a Geonos (2026-10-28)

Hallazgo: en México, Google no completa "cómo saber si mi marca aparece en chatgpt", Bing lo lee como "detectar texto hecho con ChatGPT", "qué es geo" completa con geografía y "seo para ia" completa con "cómo se llama". En EE. UU., "ai visibility" ya tiene sus propias sugerencias. Evidencia: `evidencia-autocompletado-2026-10-28.md`. Es una señal de que la pregunta existe, no volumen.

## 1. Producto (lo que falta por construir o terminar)
- **Revisión de vocabulario por mercado** dentro de la investigación de prompts: para cada categoría y mercado, correr el autocompletado de Google y Bing y marcar tres casos: sin sugerencias (espacio libre), otro significado (GEO igual a geografía) y duda de nombre ("cómo se llama"). La especificación ya usa autocompletado como fuente (`spec/data-logic/A-measure-discovery.md`, línea 366) y R-seo-1 de `docs/RECOMMENDATIONS.md` lo pide con `gl=mx`. Lo nuevo es detectar cuando una palabra significa otra cosa y guardar una foto mensual para ver el movimiento.
- **Unirlo con "Preguntas sin página"** (ya construido): pregunta que la gente hace + ninguna página tuya la responde = borrador de página con las palabras del cliente. Encaja con "cada arreglo trae su borrador".
- La lógica queda interna (regla 18). Públicamente solo se muestran los hallazgos.

## 2. Sitio y textos
- La portada en español usa "GEO y AEO" en el texto. En México "geo" completa con geografía. Propuesta: abrir con las frases que la gente sí completa ("aparecer en ChatGPT", "SEO para IA") y dejar GEO y AEO como explicación, no como gancho. El título ya dice "SEO de Google y visibilidad en IA". Necesita tu OK; el cambio es de texto y pasa por `scripts/build-es-home.cjs`.
- Los blogs de ayer ya hacen esto: títulos con las palabras del cliente y la respuesta primero. "Cómo saber si ChatGPT menciona tu negocio" responde justo la pregunta que Google México no completa. Cuando se abra la indexación, ese artículo ocupa un espacio con poca competencia visible. El cuello de botella es la indexación (checklist de lanzamiento en `docs/OPEN-ITEMS.md`), no el contenido.

## 3. Serie propia
- Cada 28 del mes, "el autocompletado de México" con 4 o 5 frases: qué completan Google y Bing y qué cambió contra el mes anterior ("el seo ha muerto" completaba el 10 de octubre y hoy ya no). Es dato propio y comparable en el tiempo, que nadie más publica, y mantiene en las cifras de EE. UU. contra México. Encaja en la serie "Datos" del calendario.

## 4. Día del lanzamiento (no antes, y contigo)
Regla del plan: cero Geonos hasta el lanzamiento. Ese día, el post de transición puede cerrar el hilo con honestidad: "Llevo semanas mostrando que la pregunta más importante de una marca no tiene respuesta en los buscadores: ¿aparezco en ChatGPT? Esto es lo que estuve construyendo para contestarla." Solo se muestran resultados, no el método.

## Qué no hacer
- No presentar el autocompletado como volumen ni como prueba de demanda.
- No prometer que una IA nos recomiende por ocupar ese espacio.
- No nombrar Geonos ni mostrar el producto antes del lanzamiento.
