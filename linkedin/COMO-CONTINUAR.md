# Cómo continuar el calendario de LinkedIn (leer primero)

Dueña: Dafne. Idea: ganar autoridad en SEO + GEO + Amazon SEO en LinkedIn, en español, **antes del lanzamiento**, sin mencionar el producto. Esta carpeta (`linkedin/`) es el kit completo. Se guardó el 2026-10-19 a petición de Dafne: "mañana o otro día te pregunto qué sigue y me das imagen, PDF o carrusel y qué incluir".

## Qué hacer cuando Dafne pregunta "qué sigue" / "qué se publica hoy"

1. Mira la fecha de hoy y busca en la tabla de abajo (o en `posts.json`, campo `date`) la publicación de ese día. Calendario: lunes, jueves y sábado (el domingo 18 de octubre fue la excepción de arranque).
2. Si hoy no toca (martes, miércoles, viernes, domingo), dilo y ofrece la siguiente. Si faltaron días, ofrece la primera “pendiente” de la tabla. Si Dafne confirma que publicó algo, actualiza el estado en esta tabla.
3. Entrega **en el chat**, en este orden: (a) archivo: imagen PNG o carrusel PDF, enviado suelto con SendUserFile (sin zip); (b) el texto completo en un bloque de código y el aviso de usar el `.txt` de `textos_por_fecha/` para pegar sin que se rompan los saltos de línea; (c) alt text si es imagen, o el título del documento si es carrusel (los PDF no llevan alt text por lámina); (d) “Antes de publicar”: el campo `verify` de la publicación, en 2 o 3 líneas.
4. Si faltan los archivos (contenedor nuevo), regéneralos: ver “Regenerar” abajo. Las imágenes y los PDF no están en git; salen de `posts.json` y `carousels.json`.
5. Responde en español.

## Visual: foto de Pexels o diagrama (decisión de Dafne, 2026-10-19)

Dafne quiere imágenes más visuales cuando se pueda: fotos (por ejemplo de Pexels) o diagramas y gráficas. Se aplicó por primera vez al carrusel del 19-oct (diagramas, sin foto). Cuando ella pregunte “qué es lo de hoy”:

1. Entrega la publicación como siempre.
2. Dile en una o dos líneas qué visual aplica a esa publicación (columna “Visual sugerido”): foto, diagrama o gráfica.
3. Si es foto: dile qué buscar en Pexels y pídele el enlace de la foto que elija (o que la suba). Después colócala con un filtro de marca (tinte violeta y noche), en uno de dos diseños: foto arriba y texto abajo, o foto a pantalla completa muy oscurecida con el titular encima. Evita caras reconocibles y logos. Guarda el autor y el enlace de la foto.
4. Si es diagrama o gráfica: créalo con la paleta de la marca (noche `#050506`, violeta `#5E30B5`, lila `#B89BFF`, Inter) y solo con cifras que ya estén en el texto de la publicación.
5. Muéstrale el resultado antes de darlo por final y espera su aprobación.

Límite de la red: desde el contenedor `pexels.com` e `images.pexels.com` están bloqueados (403). No intentes rodearlo. Si ella agrega esos dominios en Allowed domains del entorno (y, si quiere búsqueda por API, la variable `PEXELS_API_KEY`), se pueden bajar fotos directo; si no, que ella pegue el enlace o suba la imagen. Licencia de Pexels: gratis, incluso para uso comercial, sin crédito obligatorio (confirmar en su licencia).

## Voz y control de calidad (decisión de Dafne, 2026-10-19)

- Voz: ver `VOZ.md`. Primera persona, una postura clara al inicio (“Mi postura:”), “Lo que yo haría” con 3 a 5 pasos numerados, un contraste corto y una pregunta final. Los 30 posts se reescribieron con esta voz el 19-oct; el 18-oct (n1) ya estaba publicado.
- El post del 19-oct (n16) lleva un carrusel de diseño propio (diagrama de tres círculos, maquetas, íconos): `hoy/carrusel-hoy.cjs` y `hoy/final.pdf`. Es el nivel visual que Dafne quiere. Al preparar el siguiente carrusel, hazlo visual igual (diagrama, maqueta o ícono por lámina), no solo texto.
- Antes de entregar cualquier PDF o imagen: (1) corre la medición de diseño (márgenes, encimados, texto cortado; ya está en `carousel.cjs` y en `carrusel-hoy.cjs`), (2) convierte el PDF a imagen con `pdftoppm` y míralo a tamaño real, (3) confirma que el PDF mide 1080 x 1350 px sin franja blanca (`rebuild_carousels.sh` lo recorta). No entregues solo con la vista previa chica.
- La lógica de Geonos no se cuenta en los posts (regla 18). Dafne confirmó el 19-oct que el post va sin ella.

## Reglas que no se rompen (decisiones de Dafne)

- **Nunca** Geonos, ni “construyendo”, “muy pronto”, “software”, “herramienta propia”, ni nada que sugiera un producto en camino. El producto se nombra solo el día del lanzamiento, con ella.
- **Nada de publicidad**: no se menciona publicidad ni anuncios en ChatGPT, ni “pagarle a OpenAI”, ni pagos a plataformas.
- No se revela método: sin fórmulas, puntajes, umbrales, pesos de prioridad, cómo capturamos respuestas ni cómo decidimos qué corregir primero (regla 18 del repo GEONOS).
- Sin números inventados. Cada cifra con fuente y fecha. Estudios de proveedores se llaman “estudio de X”, con su asterisco. Lo oficial se verifica en la página original antes de publicar.
- Emojis: ninguno, salvo los números 1️⃣ 2️⃣ 3️⃣ 4️⃣ en las listas de pasos (Dafne aprobó el post del 19-oct con ellos). Sin la palabra “trabajo”. Comillas tipográficas (“ ”). Sin rayas largas. Tono premium, directo, educativo (no de agencia).
- Español primero. Hashtags: 3 a 5, en español.
- No hacer merge de PRs ni tocar Vercel: cada merge a `main` de GEONOS dispara un deploy y Dafne se molestó (2026-10-18). Pendiente que decida cómo manejarlo.
- Los archivos se envían sueltos, no en zip.

**Aviso (2026-10-22):** esta tabla casi no tiene estados de publicación; Dafne ya publicó más cosas de las que aquí figuran (incluidas piezas sobre llms.txt y sobre “el SEO no murió”). Antes de proponer una publicación, pídele la lista de lo ya publicado y actualiza la columna Estado.

## Estado y calendario (31 publicaciones, 19 de oct al 26 de dic de 2026)

| Fecha | n | Formato | Titular | Visual sugerido | Estado |
|---|---|---|---|---|---|
| 2026-10-18 | 1 | Imagen | Optimizar para IA en Google sigue siendo SEO | hecha: Imagen tipográfica ya publicada. | PUBLICADA |
| 2026-10-19 | 16 | Carrusel | Tres siglas, una sola tarea | hecha: Carrusel visual de 10 láminas, aprobado por Dafne el 19-oct. | APROBADA para publicar el 19-oct |
| 2026-10-22 | 2 | Imagen | “Con un llms.txt las IA me van a citar” | diagrama: Un archivo llms.txt con la leyenda “ni ayuda ni perjudica” junto al flujo rastreo → índice → respuesta. | YA CUBIERTA (Dafne, 2026-10-22): no usar. Versión guardada en `extra/2026-10-22_llms-txt/` |
| 2026-10-24 | 3 | Carrusel | ¿Te mencionan o te citan? | diagrama: Dos burbujas: “te nombran” (nombre) y “te citan” (enlace). | pendiente |
| 2026-10-26 | 4 | Imagen | Search Console ya muestra tus impresiones en IA | diagrama: Dos columnas visuales: qué muestra el informe y qué no (sin cifras inventadas). | pendiente |
| 2026-10-29 | 17 | Imagen | “El SEO ya murió por la inteligencia artificial” | foto: Escritorio minimalista con laptop, ambiente oscuro. Buscar en Pexels: “minimal desk laptop dark”. | YA CUBIERTA (Dafne, 2026-10-22): no usar. Versión guardada en `extra/2026-10-22_seo-no-murio/` |
| 2026-10-31 | 13 | Carrusel | Aparecer en Google Maps no es aparecer en la IA | foto: Calle o fachada de un negocio local. Buscar: “small shop storefront night” o “Guadalajara street”. | pendiente |
| 2026-11-02 | 7 | Imagen | Googlebot solo procesa los primeros 2 MB del HTML | diagrama: Una página de HTML cortada por una barra de 2 MB. | pendiente |
| 2026-11-05 | 18 | Imagen | “Si salgo primero en Google, ya aparezco en ChatGPT” | diagrama: Dos círculos que se cruzan poco: top 10 de Google y lo que cita la IA (con el 12% y el 8% citados). | pendiente |
| 2026-11-07 | 6 | Carrusel | ¿Qué le preguntan tus clientes a una IA antes de comprarte? | foto: Manos con un celular haciendo una pregunta a un asistente. Buscar: “hands holding smartphone chat”. | pendiente |
| 2026-11-09 | 19 | Carrusel | ¿Cómo aparecer en ChatGPT con mi negocio? | diagrama: Escalera de cuatro pasos: que te lean, que sea texto, que hablen de ti, que contestes la pregunta completa. | pendiente |
| 2026-11-12 | 31 | Imagen | “Si bloqueo Google-Extended, salgo de AI Overviews” | diagrama: Un robots.txt con Google-Extended y Googlebot lado a lado y qué controla cada uno. | pendiente |
| 2026-11-14 | 20 | Carrusel | ¿La IA cita tu página? | diagrama: Tres paneles esquemáticos (Search Console, Bing Webmaster Tools, GA4), sin datos. | pendiente |
| 2026-11-16 | 10 | Imagen | Rufus ahora es Alexa for Shopping | foto: Cajas de envío apiladas. Buscar: “shipping boxes warehouse”. Sin logos de Amazon. | pendiente |
| 2026-11-19 | 21 | Imagen | “Google penaliza las páginas escritas con IA” | diagrama: Dos columnas: calidad frente a volumen. | pendiente |
| 2026-11-21 | 12 | Carrusel | ¿Tu sitio está indexado en Bing? | diagrama: Flecha Bing → Copilot con el paso de indexación. | pendiente |
| 2026-11-23 | 22 | Carrusel | ¿De dónde saca cada IA lo que responde? | diagrama: Mapa de puertas: Google, Bing, Brave y propios, hacia cada asistente. | pendiente |
| 2026-11-26 | 23 | Imagen | Si la IA da el resumen, ¿dejan de entrar a mi página? | grafica: Barras simples con las dos cifras citadas (58% y cerca de 120%), con su asterisco. | pendiente |
| 2026-11-28 | 9 | Carrusel | Antes de optimizar: ¿pueden entrar? | diagrama: Semáforo de bots permitidos y bloqueados. | pendiente |
| 2026-11-30 | 14 | Carrusel | Qué debe medir una herramienta de visibilidad en IA | diagrama: Lista de verificación de cinco preguntas. | pendiente |
| 2026-12-03 | 5 | Imagen | “Google quitó las FAQ, hay que borrar el marcado” | diagrama: Marcado FAQPage válido frente a resultado enriquecido que ya no aparece. | pendiente |
| 2026-12-05 | 24 | Carrusel | ¿Dónde citan las IA? | grafica: Barras por plataforma con las cifras de Ahrefs. Es la más visual de todas. | pendiente |
| 2026-12-07 | 25 | Carrusel | Cinco preguntas que tu ficha debe contestar | foto: Mesa de empaque con un producto. Buscar: “packaging table product small business”. Sin logos. | pendiente |
| 2026-12-10 | 11 | Imagen | 63.9% de las recomendaciones de Alexa salieron del top 10 orgánico | grafica: Dona con 63.9% y un asterisco. | pendiente |
| 2026-12-12 | 15 | Imagen | ¿Ya tienes Brand Registry? Abre reportes que otros no ven | diagrama: Brand Registry → reportes que se desbloquean. | pendiente |
| 2026-12-14 | 26 | Imagen | En México, tu marca y tu razón social no se parecen | diagrama: El mismo negocio escrito de cuatro formas (marca, razón social, con y sin tildes). Alternativa: foto de fachada. | pendiente |
| 2026-12-17 | 8 | Imagen | “Le pregunté a ChatGPT por mi marca y salí, estoy bien” | diagrama: Tres corridas de la misma pregunta con respuestas distintas. | pendiente |
| 2026-12-19 | 27 | Imagen | ¿Una PyME puede salir en ChatGPT antes que una empresa grande? | foto: Negocio pequeño: cafetería o taller. Buscar: “small business owner coffee shop” (sin caras reconocibles). | pendiente |
| 2026-12-21 | 28 | Carrusel | ¿Quién es dueño de lo que la IA dice de tu marca? | diagrama: Cuatro áreas (marketing, e-commerce, producto, TI) alrededor de la marca. | pendiente |
| 2026-12-24 | 29 | Imagen | Cinco preguntas antes de creerle a quien dice que ya sales en ChatGPT | diagrama: Lista de verificación de cinco preguntas. | pendiente |
| 2026-12-26 | 30 | Carrusel | Qué se sabe y qué no de la visibilidad en IA | diagrama: Pirámide de niveles de evidencia: oficial, estudios, práctica, nadie lo sabe. | pendiente |

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
sh rebuild_carousels.sh  # carruseles (PDF recortado a 1080x1350 y vistas previas), conserva el carrusel visual de hoy/ y corre build_all2.py
# (equivale a: node carousel.cjs; recorte; python3 build_all2.py  # Excel, calendario, textos por fecha, imagenes/ y carruseles_por_fecha/)
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

## Regla fija de diseño (Dafne, 2026-10-29)

**Todo lo visual que Dafne pida (carruseles, láminas, infografías, portadas, imágenes) se hace con la skill `design-premium`, siempre, sin que lo tenga que pedir.** Primero se invoca la skill (`Skill design-premium`), luego se aplica adaptada a la marca de Geonos: negro `#050506`, papel `#F7F7F8`, violeta `#5E30B5` y `#8E6BE0`, lila `#B89BFF`, coral `#FF9EC0`, rampa de titulares cielo, lila, rosa, Inter, espaciado en escala de 8, texto de 24 px o más. Nada de lima (es solo para la marca del cliente).

Antes de entregar: (1) un visual propio por lámina (diagrama, maqueta, ícono o cifra grande), no tarjetas de texto sobre fondo vacío; (2) sin espacio muerto de más de 150 px sobre la barra de progreso (la medición de `propuesta-2026-10-29/carrusel.cjs` ya lo revisa); (3) mirar cada lámina a tamaño real; (4) revisar el PDF mismo (`pdftoppm`, `pdftotext`), no solo las vistas previas; (5) las dos versiones, español e inglés, con la misma calidad. La plantilla vigente es `propuesta-2026-10-29/carrusel.cjs` (v2, 2026-10-29).

