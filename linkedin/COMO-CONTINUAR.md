# Cómo continuar el calendario de LinkedIn (leer primero)

Dueña: Dafne. Idea: ganar autoridad en SEO + GEO + Amazon SEO en LinkedIn, en español, **antes del lanzamiento**, sin mencionar el producto. Esta carpeta (`linkedin/`) es el kit completo. Se guardó el 2026-10-19 a petición de Dafne: "mañana o otro día te pregunto qué sigue y me das imagen, PDF o carrusel y qué incluir".

## Qué hacer cuando Dafne pregunta "qué sigue" / "qué se publica hoy"

1. Mira la fecha de hoy y busca en la tabla de abajo (o en `posts.json`, campo `date`) la publicación de ese día. Calendario: lunes, jueves y sábado (el domingo 18 de octubre fue la excepción de arranque).
2. Si hoy no toca (martes, miércoles, viernes, domingo), dilo y ofrece la siguiente. Si faltaron días, ofrece la primera “pendiente” de la tabla. Si Dafne confirma que publicó algo, actualiza el estado en esta tabla.
3. Entrega **en el chat**, en este orden: (a) archivo: imagen PNG o carrusel PDF, enviado suelto con SendUserFile (sin zip); (b) el texto completo en un bloque de código y el aviso de usar el `.txt` de `textos_por_fecha/` para pegar sin que se rompan los saltos de línea; (c) alt text si es imagen, o el título del documento si es carrusel (los PDF no llevan alt text por lámina); (d) “Antes de publicar”: el campo `verify` de la publicación, en 2 o 3 líneas.
4. Si faltan los archivos (contenedor nuevo), regéneralos: ver “Regenerar” abajo. Las imágenes y los PDF no están en git; salen de `posts.json` y `carousels.json`.
5. Responde en español.

## Reglas que no se rompen (decisiones de Dafne)

- **Nunca** Geonos, ni “construyendo”, “muy pronto”, “software”, “herramienta propia”, ni nada que sugiera un producto en camino. El producto se nombra solo el día del lanzamiento, con ella.
- **Nada de publicidad**: no se menciona publicidad ni anuncios en ChatGPT, ni “pagarle a OpenAI”, ni pagos a plataformas.
- No se revela método: sin fórmulas, puntajes, umbrales, pesos de prioridad, cómo capturamos respuestas ni cómo decidimos qué corregir primero (regla 18 del repo GEONOS).
- Sin números inventados. Cada cifra con fuente y fecha. Estudios de proveedores se llaman “estudio de X”, con su asterisco. Lo oficial se verifica en la página original antes de publicar.
- Sin emojis. Sin la palabra “trabajo”. Comillas tipográficas (“ ”). Sin rayas largas. Tono premium, directo, educativo (no de agencia).
- Español primero. Hashtags: 3 a 5, en español.
- No hacer merge de PRs ni tocar Vercel: cada merge a `main` de GEONOS dispara un deploy y Dafne se molestó (2026-10-18). Pendiente que decida cómo manejarlo.
- Los archivos se envían sueltos, no en zip.

## Estado y calendario (31 publicaciones, 19 de oct al 26 de dic de 2026)

| Fecha | Día | n | Formato | Serie | Titular | Estado |
|---|---|---|---|---|---|---|
| 2026-10-18 | Domingo | 1 | Imagen | Cambio de la semana | Optimizar para IA en Google sigue siendo SEO | PUBLICADA |
| 2026-10-19 | Lunes | 16 | Carrusel | Qué es | ¿Cómo se llama el SEO para IA? | ENTREGADA (hoy 19-oct) |
| 2026-10-22 | Jueves | 2 | Imagen | Mitos | “Con un llms.txt las IA me van a citar” | pendiente |
| 2026-10-24 | Sábado | 3 | Carrusel | Qué es y cómo se mide | ¿Te mencionan o te citan? | pendiente |
| 2026-10-26 | Lunes | 4 | Imagen | Cambio de la semana | Search Console ya muestra tus impresiones en IA | pendiente |
| 2026-10-29 | Jueves | 17 | Imagen | Mitos | “El SEO ya murió por la inteligencia artificial” | pendiente |
| 2026-10-31 | Sábado | 13 | Carrusel | PyME y local | Aparecer en Google Maps no es aparecer en la IA | pendiente |
| 2026-11-02 | Lunes | 7 | Imagen | Cambio de la semana | Googlebot solo procesa los primeros 2 MB del HTML | pendiente |
| 2026-11-05 | Jueves | 18 | Imagen | Mitos | “Si salgo primero en Google, ya aparezco en ChatGPT” | pendiente |
| 2026-11-07 | Sábado | 6 | Carrusel | Cómo saber si sales | ¿Qué le preguntan tus clientes a una IA antes de comprarte? | pendiente |
| 2026-11-09 | Lunes | 19 | Carrusel | Cómo aparecer | ¿Cómo aparecer en ChatGPT con mi negocio? | pendiente |
| 2026-11-12 | Jueves | 31 | Imagen | SEO base | “Si bloqueo Google-Extended, salgo de AI Overviews” | pendiente |
| 2026-11-14 | Sábado | 20 | Carrusel | Cómo saber si sales | ¿La IA cita tu página? | pendiente |
| 2026-11-16 | Lunes | 10 | Imagen | Amazon y Alexa | Rufus ahora es Alexa for Shopping | pendiente |
| 2026-11-19 | Jueves | 21 | Imagen | Mitos | “Google penaliza las páginas escritas con IA” | pendiente |
| 2026-11-21 | Sábado | 12 | Carrusel | SEO base | ¿Tu sitio está indexado en Bing? | pendiente |
| 2026-11-23 | Lunes | 22 | Carrusel | Qué es | ¿De dónde saca cada IA lo que responde? | pendiente |
| 2026-11-26 | Jueves | 23 | Imagen | Datos | Si la IA da el resumen, ¿dejan de entrar a mi página? | pendiente |
| 2026-11-28 | Sábado | 9 | Carrusel | SEO base | Antes de optimizar: ¿pueden entrar? | pendiente |
| 2026-11-30 | Lunes | 14 | Carrusel | Elegir con criterio | Qué debe medir una herramienta de visibilidad en IA | pendiente |
| 2026-12-03 | Jueves | 5 | Imagen | Mitos | “Google quitó las FAQ, hay que borrar el marcado” | pendiente |
| 2026-12-05 | Sábado | 24 | Carrusel | Datos | ¿Dónde citan las IA? | pendiente |
| 2026-12-07 | Lunes | 25 | Carrusel | Amazon y Alexa | Cinco preguntas que tu ficha debe contestar | pendiente |
| 2026-12-10 | Jueves | 11 | Imagen | Amazon y Alexa | 63.9% de las recomendaciones de Alexa salieron del top 10 orgánico | pendiente |
| 2026-12-12 | Sábado | 15 | Imagen | Amazon y Alexa | ¿Ya tienes Brand Registry? Abre reportes que otros no ven | pendiente |
| 2026-12-14 | Lunes | 26 | Imagen | PyME y local | En México, tu marca y tu razón social no se parecen | pendiente |
| 2026-12-17 | Jueves | 8 | Imagen | Mitos | “Le pregunté a ChatGPT por mi marca y salí, estoy bien” | pendiente |
| 2026-12-19 | Sábado | 27 | Imagen | PyME y local | ¿Una PyME puede salir en ChatGPT antes que una empresa grande? | pendiente |
| 2026-12-21 | Lunes | 28 | Carrusel | Elegir con criterio | ¿Quién es dueño de lo que la IA dice de tu marca? | pendiente |
| 2026-12-24 | Jueves | 29 | Imagen | Elegir con criterio | Cinco preguntas antes de creerle a quien dice que ya sales en ChatGPT | pendiente |
| 2026-12-26 | Sábado | 30 | Carrusel | Qué es y cómo se mide | Qué se sabe y qué no de la visibilidad en IA | pendiente |

Fechas navideñas: 24 y 26 de diciembre se pueden mover a enero.

## Qué hay en esta carpeta

- `posts.json`: fuente de verdad de las 31 publicaciones (texto, hashtags, alt, verifica, no decir, serie y prompt de México). `carousels.json`: láminas de los 14 carruseles.
- `render.cjs` (imágenes 1080 x 1350), `carousel.cjs` (PDF de carruseles), `build_all2.py` (Excel, calendario en md y csv, textos por fecha, carpetas por fecha), `banner.cjs` (portada).
- `LINKEDIN-CALENDAR.md` (calendario legible con todos los textos), `ESTUDIO-PROMPTS-MEXICO.md` (los 53 prompts de México y qué publicación cubre cada uno), `mx_prompts.json`, `textos-alternativos.txt`, `LinkedIn-calendario.xlsx` (una hoja por semana, hoja “Prompts de México”).
- `textos_por_fecha/`: un `.txt` por publicación, con hashtags, listo para pegar.
- `portada/`: portada de LinkedIn (1584 x 396 y al doble), con las 10 plataformas del proyecto.
- `PERFIL.md`: titular y “Acerca de” aprobados.

## Regenerar imágenes, PDF y calendario

Requisitos: Node con Playwright (`NODE_PATH=$(npm root -g)`, Chromium en `/opt/pw-browsers/chromium`), Python con `openpyxl` y `Pillow`, y las fuentes Inter 400 y 700 en woff2 (`Inter-400-latin.woff2`, `Inter-700-latin.woff2`) en una carpeta que se indica con `FONT_DIR` (se pueden sacar de `npm i @fontsource/inter`, carpeta `files/`, o de Google Fonts).

```
export NODE_PATH=$(npm root -g) FONT_DIR=/ruta/a/fuentes
cd linkedin
node render.cjs          # img-NN.png (todas las publicaciones)
node carousel.cjs        # carruseles/*.pdf y vistas previas prev-N-K.png
python3 build_all2.py    # Excel, calendario, textos por fecha, imagenes/ y carruseles_por_fecha/
```

`build_all2.py` espera encontrar `img-NN.png`, `carruseles/` y las vistas previas en la misma carpeta (las genera el paso anterior).

## De dónde sale el contenido (el research)

Estudio de prompts de México (Elena, 53 prompts) y keywords de Semrush México (Rafael), investigación de comunidad (Martin), todo en Google Drive de Dafne (`geonos_*_mx-es_2026-10-10_*.md`); en el repo GEONOS: `docs/RECOMMENDATIONS.md`, `docs/SEARCH-CHANGES.md`, `docs/MARKET-SIGNALS.md`, `docs/TECHNICAL-WATCH.md`, `docs/LINKEDIN-PLAN.md`, `spec/data-logic/H-ai-engines-research.md`. Varias cifras vienen de estudios de terceros y notas de prensa que no se pudieron abrir desde el sandbox: por eso cada publicación trae su “verifica”.

## Pendientes

- PR #292 de GEONOS (correcciones del perfil: sin pistas de producto, redacción más premium) sigue abierto, sin merge.
- Pasar este calendario a `docs/` de GEONOS cuando Dafne decida cómo manejar los deploys de Vercel.
- Radar (`scripts/radar.mjs` en GEONOS): correr `node scripts/radar.mjs --check` desde una máquina con internet y corregir los feeds.
- Falta un export de Semrush México en español para términos de GEO y AEO.
- Verificar fuente y fecha de cada publicación antes de publicar (columna “Verifica”).
- Confirmar si Alexa for Shopping ya está disponible en Amazon México.
- Versiones en inglés de las publicaciones: no empezadas.
