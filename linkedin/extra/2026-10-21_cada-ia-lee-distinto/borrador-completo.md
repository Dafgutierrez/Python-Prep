# Publicación de LinkedIn para hoy, miércoles 2026-10-21 (fuera del calendario): qué fuentes cita cada IA

Formato: carrusel PDF de 10 láminas (1080 × 1350, texto seleccionable) + texto. Perfil de Dafne, sin mencionar Geonos (`docs/LINKEDIN-PLAN.md`). Estado: propuesta, revisión humana pendiente. Archivo: `Que-fuentes-cita-cada-IA-ChatGPT-Perplexity-Grok-Copilot-Claude-Gemini-2026.pdf`.

## Para qué sirve
Que cuando alguien pregunte "¿Copilot, Grok y Meta AI recomiendan igual que ChatGPT?" (o por qué no sale en la IA si sale en Google), la respuesta que la IA encuentre sea la nuestra, y la pueda citar. No habla de prompts ni de nuestro método: responde la duda y rellena el hueco con datos con fuente.

## Cómo está hecha para que una IA la cite
1. **La respuesta va en la primera línea y se entiende sola**: "No. Cada IA cita fuentes distintas: Perplexity cita sobre todo YouTube (32.4%), Grok y ChatGPT citan Reddit (16.3% y 16.7%) y Copilot cita tiendas como Amazon (14.4%)."
2. **Cada dato lleva quién lo midió, cuándo y sobre qué** (Ahrefs, junio y julio de 2026, consultas de EE. UU.), para que se pueda citar con su fuente.
3. **Dice lo que no se sabe** (Meta AI, México, el peso de cada fuente). Las IA citan más lo que se declara con límites.
4. **Lista corta y cifras exactas** en vez de adjetivos; el PDF tiene texto seleccionable y un título con las palabras que la gente busca (el nombre del archivo es el título del documento en LinkedIn).
5. **Pendiente para que cuente como fuente con nombre**: firmar con tu nombre completo y cargo (última lámina y perfil). Sin eso, la IA ve un dato sin autor. [DATO: nombre completo y cargo].

## Qué es investigación nuestra y qué es de terceros
- Cruce y comparación de seis estudios y su límite (todos de EE. UU.): síntesis nuestra, de `spec/data-logic/H-ai-engines-research.md` y `docs/RECOMMENDATIONS.md` §5. Los porcentajes son de Ahrefs (ChatGPT, Perplexity, Grok, Copilot), Profound (Claude), Everything-PR (Gemini) y Mentionbird.
- El hallazgo mexicano: Elena, Forobeta, 2026-10-09 (cita textual).

## Cómo conecta con el sitio y con lo que construimos
- El mismo contenido está como guía en el sitio: `/es/blog/que-fuentes-cita-cada-ia` (PR GEONOS#299, en noindex hasta el lanzamiento). Cuando se publique, se enlaza en el primer comentario. Así la IA puede citar la guía del sitio y la publicación de LinkedIn.
- La lámina 8 (el sistema completo) es la razón por la que Geonos recomienda varios canales y no solo el sitio: cada IA lee un lugar distinto. Cada canal corresponde a una página de producto: Fuentes y canales, Reddit y foros, Inteligencia de YouTube, Medios propios. En LinkedIn no se nombra Geonos antes del lanzamiento (`docs/LINKEDIN-PLAN.md`); en el sitio sí.
- Meta AI y Muse (lámina 6): sin estudio público de citas; lo documentado es Meta-WebIndexer (según Meta, sirve para citar y enlazar sitios) y que Muse Spark aprovechará publicaciones de Instagram, Facebook y Threads (reporte de prensa). Verifica en la página de rastreadores de Meta antes de publicar. La estimación de un proveedor (Meta AI es la que más cita redes, junio de 2026) está marcada como sin verificar.

## Cruce de datos (qué coincide, qué choca)
| Dato | Fuente | Comprobación |
|---|---|---|
| ChatGPT: Reddit 16.7–16.8%, Wikipedia 8.9% | Ahrefs, instantánea de julio de 2026 | En enero y febrero Wikipedia iba arriba (13.15% contra 11.97%): cambia con el tiempo; se dice en la lámina 4. |
| Perplexity: YouTube 32.4%, Reddit 16.6%, Wikipedia 8.2% | Ahrefs, junio de 2026, 3.1 millones de consultas, vía fuentes secundarias | Un dato de Frase (Reddit 46.5%, marzo de 2026) choca y no está verificado: no se usa. |
| Grok: Reddit 16.3%, YouTube 15.1%, Facebook 13.9%, x.com 1.4% | Ahrefs, junio de 2026 | Coincide con Reddit cerca de 16% en tres IA (Ahrefs). |
| Claude: 86.7% con Brave | Profound 2025, vía fuentes secundarias | Una prueba de junio de 2026 dio 79.2% (sin verificar): se muestra el rango 79 a 87%. |
| Gemini: 52.15% a sitios de marca | Everything-PR 2026 | No declara su muestra: se marca como poca confianza. |
| 12% de las URLs citadas están en el top 10 de Google (ChatGPT, 8.0%) | Ahrefs, 15,000 consultas | Otro estudio dice que Grok tiene 14.1%, "el más bajo de seis" (sin verificar), lo que choca con el 8.0% de ChatGPT: no son comparables, no se mezclan. |
| ChatGPT y Gemini citan el mismo dominio 12.7% y la misma página 5.8% | Mentionbird, 517 preguntas comerciales, abril a agosto de 2026 | Una sola fuente. |
| "87% de las citas de ChatGPT coinciden con el top 10 de Bing" | Seer | Antiguo y sin verificar: no se usa. |
| Cifras de AI Overviews (71.9%, 82.91%) | Marco v5, no está en el repositorio | No se pudieron cruzar: no se usan. |

## Texto de la publicación (1299/1,300)
```
¿Copilot, Grok y Meta AI recomiendan igual que ChatGPT? No. Cada IA cita fuentes distintas: en estudios de 2026, Perplexity cita sobre todo YouTube (32.4%), Grok y ChatGPT citan Reddit (16.3% y 16.7%) y Copilot cita tiendas como Amazon (14.4%).

Mi postura: no existe “la IA”, y por eso no basta con tu página. Hay que estar en todo el sistema que cada una lee: sitio y blog, YouTube, foros, Facebook e Instagram, reseñas y directorios, catálogos de tiendas.

Meta AI no tiene estudio público de citas. Meta dice que su rastreador (Meta-WebIndexer) sirve para citar y enlazar sitios, y que Muse Spark aprovechará Instagram, Facebook y Threads. Ahí, tu web sola no alcanza.

Salir primero en Google tampoco: solo 12% de las URLs que cita una IA están en el top 10 de Google para esa pregunta (Ahrefs).

Son consultas de EE. UU.; para México no hay estudio equivalente. En Forobeta (9 de octubre de 2026) un usuario contó que la IA tomó foros, reseñas viejas de Google Maps y directorios, no su página.

Lo que yo haría: una pregunta de tus clientes, ver qué fuentes cita cada IA y corregir lo que esté desactualizado.

Fuente: Ahrefs, Profound, Mentionbird, Everything-PR (2025 y 2026) y documentación de Meta. Detalle en el carrusel.

¿En qué canales está hoy tu negocio? Dime cuáles.

#GEO #SEO #IA
```

## Primer comentario
Las fuentes, una por línea: Ahrefs (ChatGPT, julio de 2026; Perplexity y Grok, junio de 2026; Copilot, julio de 2026), Profound (2025), Everything-PR (2026), Mentionbird (2026) y el hilo de Forobeta del 9 de octubre de 2026 (https://forobeta.com/temas/de-seo-a-geo-generative-engine-optimization-como-lograr-que-chatgpt-y-perplexity-citen-tu-web-y-por-que-tus-analiticas-no-lo-reflejan.1106053/).

## Verifica antes de publicar (desde el servidor de trabajo no se pudieron abrir las fuentes)
1. Abre cada estudio o su resumen y confirma cifra, mes y muestra. Si no puedes abrirlo, quita esa cifra.
2. Confirma la cita de Forobeta y la fecha.
3. Agrega tu nombre completo y cargo a la última lámina y confirma que tu perfil dice a qué te dedicas.
4. Cuando se publiquen las guías en getgeonos.com, enlaza la guía correspondiente en el primer comentario (hoy el sitio está en noindex).
