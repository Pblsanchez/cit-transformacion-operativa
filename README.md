# Transformación Operativa CIT

Presentación ejecutiva en HTML: una propuesta de transformación de la operación CIT (procesos, indicadores, ejecución, liderazgo y cultura).

**Ver online:** https://pblsanchez.github.io/cit-transformacion-operativa/ (requiere GitHub Pages activo en `main` / root).
**Ver offline:** descargar el repo y abrir `index.html` en el navegador. No usa CDN, frameworks ni conexión a internet.

## Modos
| Modo | Uso | Teclas |
|---|---|---|
| Directorio | Recorrido libre con scroll y menú lateral | `→` / `←` siguiente / anterior · `D` índice |
| Presentación | Una pantalla por vez, sin menú lateral | `→` `↓` `Espacio` `AvPág` siguiente · `←` `↑` `RePág` anterior · `Inicio` / `Fin` |

En ambos: `P` cambia de modo, `F` pantalla completa, `D` índice, `Esc` cierra. El modo elegido se recuerda en el navegador y cada pantalla tiene su enlace (`#impacto`, `#conclusion`, …).

## Estructura
```
index.html            18 pantallas (contenido)
css/estilos.css       Estilos con tokens del Design System de Andreani
js/iconos.js          Íconos SVG embebidos
js/datos.js           Cifras de la presentación (editar acá)
js/presentacion.js    Menú, índice, modos, teclado y animaciones
favicon.svg
```

## Cifras
Solo el volumen (≈ 50.000 envíos por día) es dato real. El resto son **números de ejemplo** y se muestran con la etiqueta «Ejemplo».
Para reemplazarlos, editar `js/datos.js`: cambiar `valor` y poner `ficticio: false` (la etiqueta desaparece sola). Las metas por horizonte están en `metas` (con `metasFicticias`) y el potencial por factor en `potencial` (con `potencialFicticio`).
