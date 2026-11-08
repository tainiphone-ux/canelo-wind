# Canelo Wind — reglas para Claude Code

App web de viento, rachas y olas para windsurf, kitesurf y wing foil. La hace Valentín Suárez Morín pensando en su amigo Miki «el Canelo». **Proyecto aparte del Panel Web y de la carpeta VALENTIN** (lo pidió así).

Valentín no es programador: **háblale siempre en español, también en los mensajes mientras trabajas**, claro y sin jerga. Al acabar, dile en pocas líneas qué has hecho y qué tiene que probar. No pongas enlaces en negrita (al copiarlos se llevan los asteriscos).

## Dónde está
- Web: https://tainiphone-ux.github.io/canelo-wind/ (GitHub Pages). Instrucciones de instalación: `instalar.html`.
- Repositorio público: https://github.com/tainiphone-ux/canelo-wind (cuenta `tainiphone-ux`, rama `main`).
- Historial git fuera de iCloud: `Historial Canelo Wind.nosync` (el `.git` de la carpeta apunta ahí). `gh repo …` no lo reconoce; `git` sí.
- **Publicar un cambio:** `git add -A && git commit -m "…" && git push` desde esta carpeta (mensaje en español, terminar con la línea Co-Authored-By). La web se actualiza en ~1 minuto. Valentín ya dio permiso para publicarla (08-11-2026).

## Archivos
- `index.html` — la app entera (lista de spots, ficha con previsión, reportes, buzón, visor de enlaces).
- `spots.js` — los spots (36: 19 de Canarias y 17 de península y Baleares). Para añadir uno, copiar un bloque. `buenos` = direcciones de viento buenas. Fuera de Canarias llevan `region` (comunidad) e `isla` = provincia o isla; la hora sale sola (Canarias o península, `tzDe`).
- `config.js` — formularios de Google (reportes y sugerencias), ya conectados.
- `herramientas/crear_formularios.gs` — el Apps Script que creó los formularios.
- `logo.svg`, `icono-iphone.png`, `icono-512.png`, `manifest.json` — icono y «Añadir a pantalla de inicio».
- `404.html` — si la dirección se escribe mal, lleva a la app.

## Cómo funciona
- Previsión: Open-Meteo (forecast + marine), gratis y sin clave. Viento en nudos, km/h o m/s.
- Viento medido: solo enlaces (AEMET de los aeropuertos con `k=can`, Windfinder, Holfuy). aviationweather.gov no deja leerse desde la web (sin CORS).
- Reportes y sugerencias: formularios de Google en la cuenta tainiphone@gmail.com. La hoja de reportes está compartida «solo ver» y la app la lee (gviz CSV); la de sugerencias es privada.
- Enlaces: los que dejan verse dentro (`SE_VEN_DENTRO` en index.html: in2thebeach, fuerteventuraplayas, embed.windy.com, mangolinkworld) se abren en un visor con «← Volver a Canelo Wind»; los demás muestran antes cómo volver (en el iPhone instalado no hay botón atrás). Al añadir un enlace nuevo, comprobar con curl si manda `X-Frame-Options` o `frame-ancestors`.
- Probar en el Mac: `python3 -m http.server 8765 --bind 127.0.0.1` desde esta carpeta y abrir http://127.0.0.1:8765.

## Pendiente / ideas
- Ampliar a Europa y mundo (España hecha el 08-11-2026). Windfinder corta si se le piden muchas páginas seguidas (error 429): comprobar enlaces despacio.
- Del Word «PROYECTOS CLAUDE/Wing Foil/Aplicación para wing foil.docx» (22-10-2026) falta, a la espera de su sí: gráfica de mareas (curva del día con pleamar/bajamar y sol), spots Punta del Hidalgo y Playa de Troya (webcams Skyline), anemómetro de Azul Kiteboarding en El Médano (https://www.azulkiteboarding.com/es/el-medano-live) y mapa de Windguru.
- No probado aún en un iPhone de verdad: el visor de webcams y el aviso de volver.
