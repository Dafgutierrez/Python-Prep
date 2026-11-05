# Diseño visual para LinkedIn: gráficas, tablas y cifras

Extiende la regla de COMO-CONTINUAR.md (siempre la skill design-premium) con la skill dataviz. Todo se hace en HTML, se renderiza con Playwright y sale en PDF y PNG, 1080 x 1350, con texto seleccionable.

## Cómo se usa

```
NODE_PATH=$(npm root -g) FONT_DIR=<carpeta con inter-latin-{400,600,700}-normal.woff2> node render.cjs <mi-carrusel>.cjs
```

`<mi-carrusel>.cjs` exporta `{ file, slides: [...] }` con las piezas de `componentes.cjs`. Mira `ejemplo-datos-reales.cjs`. El render corre chequeos solos (texto que se sale, contenido sobre la barra de avance, espacio muerto de más de 150 px) y aun así hay que abrir cada PNG y mirarlo.

## Versión clara

Con `THEME=light` el mismo módulo sale en versión clara con los colores de Geonos (fondo #F7F7F8, violeta #5E30B5, degradado violeta a rosa en titulares). Los colores de datos de la versión clara (#5E30B5, #C2417A, #1F6FB5) se validaron con `validate_palette.js` en modo claro sobre #F7F7F8 y pasan los 5 chequeos. La salida lleva el sufijo `-claro`.

## Qué pieza usar (la tarea del dato elige la forma)

| El dato es | Pieza | Nota |
|---|---|---|
| Un solo número que es el titular | `hero` | “5 de 12”, nunca porcentaje en muestras chicas |
| Comparar cantidades entre pocos grupos | `bars` | Una barra en violeta, el resto en gris (énfasis). Valor en la punta |
| Cómo se reparte un total en estados | `stacked` | Hueco de 3 px entre segmentos. Conteo dentro solo si cabe |
| Cada elemento con su estado, en dos o tres columnas | `matrix` | Una fila por frase. Forma y color a la vez |
| Más de 7 clases o cifras exactas | `table` | Columna resaltada en violeta |
| Dos cosas frente a frente | `compare` | Resalta solo una |
| La conclusión | `callout` | Una por lámina, como máximo |

## Reglas de datos

1. Un gráfico por lámina y un solo mensaje. El título dice la conclusión, no el nombre de la gráfica.
2. “x de n”, no porcentajes, mientras n sea chico. Siempre di cuántas frases, corridas o sitios hay detrás.
3. El color nunca va solo: abierta = anillo, entendida = círculo violeta, otro significado = rombo rosa, y siempre con leyenda.
4. Colores de datos validados con `validate_palette.js` en modo oscuro sobre #050506: violeta #8E6BE0, rosa #D65A8A, azul #3E94D1 (los tres pasan). La rampa clara de la marca (cielo, lila, coral) es solo para titulares, no para marcas de datos, porque sale de la banda de luminosidad. Si agregas un color nuevo, vuelve a correr el validador.
5. Una sola escala. Nada de doble eje. Barras con base en cero.
6. Texto de datos en tinta clara, no en el color de la serie.
7. Etiquetas con moderación: la cifra importante, no un número en cada punto.
8. Cada lámina de datos lleva fuente, fecha y método en una línea. El autocompletado no es volumen de búsqueda; dilo cuando aplique.
9. No inventes ni redondees a favor. Cada número sale de un archivo del repositorio o de una fuente enlazable.
10. Sin Geonos y sin el método (regla 18 de LINKEDIN-PLAN.md) hasta el lanzamiento.

## PDF para celular

El render genera el PDF con el acento en color sólido y las tarjetas sin sombra, porque el visor del iPhone dibujó el degradado recortado al texto como bloques de color y la sombra difusa como un rectángulo (visto el 2026-10-30). Los PNG conservan el degradado y la sombra. Si cambias el diseño, vuelve a probar el PDF en un celular.

## Después de renderizar

Abre cada PNG y busca: texto cortado, etiquetas que se pisan, vacíos grandes, forma o color sin leyenda. Revisa el PDF, no solo los PNG. Versión en inglés con la misma calidad, no copia en pasos.

## Estilo premium (2026-11-05)

Piezas nuevas en `componentes.cjs` para que la gráfica sea la protagonista. Muestra: `../muestra-premium-2026-11-05/muestra.cjs` (datos reales de Wikipedia).

| Pieza | Para qué |
|---|---|
| `slideX` | Igual que `slide`, con fondo con profundidad (orbe de luz y anillos en violeta y rosa), frase de apoyo (`lead`) y la firma abajo a la derecha (`BYLINE`, por defecto “Dafne Gutiérrez”; sin marca antes del lanzamiento) |
| `area` | Serie de tiempo suavizada con relleno degradado, línea con brillo, valor final en la punta, eje redondo (100, 200…), hasta 3 series con nombre al final de cada una, y `events` (línea punteada con etiqueta) |
| `rolling(v, 7)` | Promedio móvil de 7 días. Dilo en la fuente |
| `indexOf(v, 7)` | “× el inicio”: cada valor entre el promedio de los primeros 7 puntos |

Reglas: máximo 3 series (las del ejemplo de Azoma con 6 morados no se distinguen). Un evento solo si tiene fecha y fuente; si no, marca un hecho del propio dato (“día con más lectores”). El título dice lo que muestra la gráfica, aunque no sea la historia que esperabas.

PDF: lo que lleva desenfoque tiene la clase `fx` y el PDF lo oculta; el relleno degradado del área pasa a color plano (`.afill`), porque el visor dibuja mal la transparencia en degradado. Cada gráfica usa ids propios.
