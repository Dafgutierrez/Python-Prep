---
name: linkedin-visual
description: Crea láminas, carruseles e imágenes para LinkedIn y otras redes con gráficas, tablas y cifras (HTML renderizado a PDF y PNG de 1080x1350) con la marca de Geonos. Úsala siempre que un post, carrusel o infografía lleve datos o necesite verse premium.
---

# LinkedIn visual (gráficas, tablas, cifras)

1. Carga también la skill `design-premium` y la skill `dataviz`. Las dos se aplican siempre a lo visual.
2. Lee `linkedin/kit-visual/DISENO-LINKEDIN.md`: qué pieza usar según el dato y las reglas de datos.
3. Arma el carrusel como un módulo `.cjs` que exporte `{ file, slides }` con las piezas de `linkedin/kit-visual/componentes.cjs` (hero, bars, stacked, matrix, table, compare, callout). Ejemplo: `linkedin/kit-visual/ejemplo-datos-reales.cjs`.
4. Renderiza: `NODE_PATH=$(npm root -g) FONT_DIR=<carpeta con inter-latin-{400,600,700}-normal.woff2> node linkedin/kit-visual/render.cjs <modulo>.cjs`.
4b. Para la versión clara de Geonos, corre el mismo comando con `THEME=light` delante. Sin esa variable sale la versión oscura.
5. Abre cada PNG y el PDF y revisa texto cortado, etiquetas que se pisan, vacíos y leyendas. El chequeo automático no reemplaza mirar.
6. Reglas de contenido de LinkedIn: `linkedin/VOZ.md` y `linkedin/COMO-CONTINUAR.md` (sin Geonos antes del lanzamiento, sin método, sin cifras inventadas, fuente y fecha en cada lámina de datos, “x de n” y no porcentajes en muestras chicas).
7. Si agregas un color de datos, valídalo con el `validate_palette.js` de la skill dataviz en modo oscuro sobre #050506.
