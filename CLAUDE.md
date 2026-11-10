# Canelo Wind — reglas para Claude Code

App web de viento, rachas y olas para windsurf, kitesurf y wing foil. La hace Valentín Suárez Morín pensando en su amigo Miki «el Canelo». **Proyecto aparte del Panel Web y de la carpeta VALENTIN** (lo pidió así).

Valentín no es programador: **háblale siempre en español, también en los mensajes mientras trabajas**, claro y sin jerga. Al acabar, dile en pocas líneas qué has hecho y qué tiene que probar. No pongas enlaces en negrita (al copiarlos se llevan los asteriscos).

## Dónde está
- Web: **https://canelowind.com/** (dominio propio comprado en Cloudflare el 09-11-2026 por Valentín, cuenta windcanelo@gmail.com; 4 registros A a GitHub 185.199.108-111.153 + CNAME www → tainiphone-ux.github.io, todos «DNS only»; archivo `CNAME` en el repo). La dirección antigua https://tainiphone-ux.github.io/canelo-wind/ redirige sola. (GitHub Pages). Instrucciones de instalación: `instalar.html` (en los 5 idiomas, con su propio diccionario `T` dentro; usa el idioma guardado de la app).
- Landing page (presentación): https://canelowind.com/landing.html — `landing.html`, 5 idiomas (diccionario `L` dentro), móvil con la app real en un iframe (`./?lang=xx`: `?lang=` fuerza el idioma sin preguntar), nº de spots y regiones salen solos de spots.js. Enlazada desde el pie de la app («ℹ️ Qué es Canelo Wind»). Fondo: vídeos difuminados que van uno detrás de otro (al acabar cada uno pasa al siguiente): `videos/ola.mp4`, `saltos.mp4`, `ola2.mp4` y `wing-pov.mp4` son vídeos de wing foil de Valentín (de WhatsApp, 08-11-2026; verticales, comprimidos con `avconvert -p Preset1280x720`); `kite.mp4` y `windsurf.mp4` de Pexels (licencia libre). Sección «Así se vive» con los 4 vídeos de Valentín nítidos tipo reel (se cargan solo al verlos). Movimiento: líneas de viento, marquesina con los spots, contadores, aparecer al bajar, móvil flotando; todo se apaga con «reducir movimiento».
- Repositorio público: https://github.com/tainiphone-ux/canelo-wind (cuenta `tainiphone-ux`, rama `main`).
- Historial git fuera de iCloud: `Historial Canelo Wind.nosync` (el `.git` de la carpeta apunta ahí). `gh repo …` no lo reconoce; `git` sí.
- **Publicar un cambio:** `git add -A && git commit -m "…" && git push` desde esta carpeta (mensaje en español, terminar con la línea Co-Authored-By). La web se actualiza en ~1 minuto. Valentín ya dio permiso para publicarla (08-11-2026).

## Cuentas del proyecto (sin contraseñas: esas las guarda Valentín)
- Correo de Canelo Wind: **windcanelo@gmail.com** (Gmail creado por Valentín el 08-11-2026). Úsalo para todo lo de Canelo Wind (GoatCounter, Instagram, patrocinadores…).
- GoatCounter (visitas): https://canelowind.goatcounter.com — cuenta windcanelo@gmail.com.
- Instagram: **@canelowind** (https://www.instagram.com/canelowind/), cuenta NUEVA creada 10-11-2026 desde el móvil (mismo nombre que TikTok). Textos y foto de perfil en `redes/`. Enlazada en el pie de la app, la landing, los carteles y las páginas de spots. La antigua @canelowindapp (09-11-2026) fue suspendida.
- TikTok: **@canelowind** (https://www.tiktok.com/@canelowind), creada 09-11-2026 (ojo: sin «app», distinto de Instagram). Textos en `redes/tiktok.md`. Enlazada en el pie de la app, la landing y las páginas de spots.
- Facebook: Página «Canelo Wind» https://www.facebook.com/profile.php?id=61596200199182 (creada 09-11-2026 desde el perfil Canelo Wind; aún sin nombre de usuario: ponerle @canelowindapp cuando Facebook deje). Portada `redes/portada-facebook.png`. Enlazada en la app, la landing y las páginas de spots.
- YouTube: canal **@CaneloWind** (https://www.youtube.com/@CaneloWind), ID del canal UCL4mTq_5s4MdtYoGbv_u9Sg (no cambia: https://www.youtube.com/channel/UCL4mTq_5s4MdtYoGbv_u9Sg), creado 10-11-2026 con windcanelo@gmail.com. Enlazado en la app, la landing y las páginas de spots.
- Metricool (programar publicaciones): https://app.metricool.com — cuenta windcanelo@gmail.com, con Instagram, Facebook, TikTok y YouTube conectados (10-11-2026). Instagram ya es cuenta profesional y está vinculada a la Página de Facebook. Claude puede subir y programar posts desde Chrome, siempre con el visto bueno de Valentín.
- X (Twitter): **@Canelowind** (https://x.com/Canelowind), creada 10-11-2026. Sobre todo para guardar el nombre; en Metricool conectar X es de pago. Enlazada en la app, la landing y las páginas de spots.
- GitHub: cuenta `tainiphone-ux` (repo canelo-wind).
- Formularios de Google (reportes y sugerencias): cuenta tainiphone@gmail.com.

## Archivos
- `index.html` — la app entera (lista de spots, ficha con previsión, reportes, buzón, visor de enlaces).
- `spots.js` — los spots (93: 29 de Canarias y 64 del resto de España; 11 regiones; 3 embalses de interior con `interior: true` = sin olas ni mareas y viento con cell_selection=land). Para añadir uno, copiar un bloque. `buenos` = direcciones de viento buenas. Fuera de Canarias llevan `region` (comunidad) e `isla` = provincia o isla; la hora sale sola (Canarias o península, `tzDe`).
- `consejos.js` — consejos y aviso de seguridad de cada spot (por id); `peligro` = direcciones off-shore (salen «Muy malo» y aviso) y `marea: "alta"` = avisa de la bajamar. Al añadir un spot, añadir también aquí sus consejos (y el aviso si hay corrientes, roca, off-shore, poca agua, puerto o zonas balizadas).
- `idiomas.js` — idiomas de la app (es, en, de, fr, it): `TXT[idioma][clave]`, función `t("clave", {datos})`, rosa de los vientos por idioma. La primera vez sale la pantalla de elegir idioma; luego el botón 🌐. Al añadir una frase nueva a la app, ponerla en los 5 idiomas.
- `textos_spots.js` — descripción, consejos y aviso de cada spot en en/de/fr/it (el español está en spots.js y consejos.js). Al añadir un spot, traducirlo aquí también.
- `visitas.js` — contador de visitas GoatCounter (sin cookies). `GOATCOUNTER = "nombre"` lo enciende; vacío = apagado; en localhost no cuenta. `contar(ruta, título, evento)`: cuenta /spot/<id>, «instalada», reporte/<id>, sugerencia, idioma/<xx> y enlace/<web>. Cargado en index, landing e instalar.
- `cartel.html` — cartel A4 y hoja de 8 pegatinas con QR para imprimir (elige spot o toda la app; QR con `?utm_campaign=cartel-<spot>` para verlo en GoatCounter; QR con qrcodejs de cdnjs). https://canelowind.com/cartel.html
- `redes/` — foto de perfil, textos de Instagram (`instagram.md`) y mensajes de promoción para WhatsApp, Facebook, escuelas e Instagram (`mensajes.md`).
- Botón «📤 Compartir» en cada spot (`compartirSpot`): comparte por WhatsApp/lo que tenga el móvil el spot con su nota y viento de ahora; cuenta `compartir/<id>` en GoatCounter.
- **Páginas para Google** (generadas, NO editar a mano): `spot/<id>/`, `zona/<región>/`, `spots/`, `sitemap.xml`, `robots.txt`. Se crean con `node herramientas/generar_paginas.mjs` a partir de spots.js y consejos.js: **volver a ejecutarlo siempre que se añada o cambie un spot** y subirlo. Usan `seo.css` y `seo.js` (viento de ahora y nota con las mismas reglas que la app). Compartir de la app manda /spot/<id>/.
- `config.js` — formularios de Google (reportes y sugerencias), ya conectados.
- `herramientas/crear_formularios.gs` — el Apps Script que creó los formularios.
- `logo.svg`, `icono-iphone.png`, `icono-512.png`, `manifest.json` — icono y «Añadir a pantalla de inicio».
- `404.html` — si la dirección se escribe mal, lleva a la app.

## Cómo funciona
- Previsión: Open-Meteo (forecast + marine), gratis y sin clave. Viento en nudos, km/h o m/s.
- Viento medido: solo enlaces (AEMET de los aeropuertos con `k=can`, Windfinder, Holfuy). aviationweather.gov no deja leerse desde la web (sin CORS).
- Reportes y sugerencias: formularios de Google en la cuenta tainiphone@gmail.com. La hoja de reportes está compartida «solo ver» y la app la lee (gviz CSV); la de sugerencias es privada.
- Enlaces: los que dejan verse dentro (`SE_VEN_DENTRO` en index.html: in2thebeach, fuerteventuraplayas, embed.windy.com, mangolinkworld, azulkiteboarding, bergfex.at, widget.holfuy.com) se abren en un visor con «← Volver a Canelo Wind»; los demás muestran antes cómo volver (en el iPhone instalado no hay botón atrás). Al añadir un enlace nuevo, comprobar con curl si manda `X-Frame-Options` o `frame-ancestors`.
- Nota de cada hora (`evaluar` en index.html): Muy malo / Malo / Regular / Bueno / Muy bueno según viento (8–28 kn ideal; en spots de «Experto» hasta 38), dirección buena del spot, rachas (racha − viento ≥ 12), olas (≥2 m malo en spots de aprender) y tormenta. Sale en la lista, en «Ahora mismo», en cada día y en cada hora. `pintarAvisosDia` saca avisos según la previsión del día elegido.
- Probar en el Mac: `python3 -m http.server 8765 --bind 127.0.0.1` desde esta carpeta y abrir http://127.0.0.1:8765.

## Pendiente / ideas
- **Instagram:** la antigua @canelowindapp fue SUSPENDIDA el 10-11-2026 (apelación presentada; probable causa: cuenta nueva con muchos cambios seguidos y acciones automáticas desde Chrome). Valentín creó otra, @canelowind. **No hacer NADA automático en Instagram desde Chrome**: Valentín la usa desde la app del móvil, con calma las primeras semanas (pocas acciones al día), y se programa solo vía Metricool (hay que conectar la nueva allí cuando lleve unos días). Si devuelven la antigua, decidir cuál se queda.
- **Logo nuevo (en pausa, 09-11-2026):** Valentín quiere cambiarlo; la candidata es `redes/logo-gemini-hd.webp` (dibujo de Gemini en canela: rider con ala de wing, kite y vela de windsurf sobre una ola). Otras versiones en `redes/logo-*`. Aún NO está puesto en ningún sitio. Si se elige: icono-iphone.png (180), icono-512.png, logo.svg/cabeceras, foto de Instagram/Facebook, portada de Facebook, carteles y vídeo de instalar. En pequeño se ve con mucho detalle. No le gustaron los dibujos hechos a mano en SVG (rider «muy básico»).
- Vídeo de instalar en iPhone (`videos/instalar-iphone.mp4`): voz 2 de Siri (hay que tenerla como voz del sistema para usar `say`), mar y clics; montado con Chrome (canvas) + Swift/AVFoundation (ver historial de la sesión del 09-11-2026).
- **Redes sociales por crear (lo pidió Valentín el 08-11-2026):** YouTube, Instagram, TikTok, X (Twitter) y Facebook. Las crea Valentín (Claude no puede crear cuentas) con el correo windcanelo@gmail.com y el mismo nombre que Instagram en todas: @canelowindapp. Instagram (@canelowindapp) y TikTok (@canelowind) YA creados (09-11-2026); Facebook (Página) también (09-11-2026); YouTube @CaneloWind y X @Canelowind (10-11-2026). Todas creadas. YouTube va con la cuenta de Google windcanelo@gmail.com (solo crear el canal). Claude prepara la foto de perfil (logo), la biografía en es/en con el enlace a la landing, los primeros posts y vídeos (con los vídeos de wing foil de Valentín) y añade los enlaces a las redes en la landing y en la app. Recordárselo cuando vuelva a Canelo Wind.
- Ampliar a Europa y mundo (España hecha el 08-11-2026). Windfinder corta si se le piden muchas páginas seguidas (error 429): comprobar enlaces despacio.
- Del Word «PROYECTOS CLAUDE/Wing Foil/Aplicación para wing foil.docx» ya está todo (08-11-2026): mareas (Open-Meteo `sea_level_height_msl` cada 15 min, `pintarMareas`), Playa de Troya, Azul Kiteboarding y Windguru. Punta del Hidalgo NO: Valentín no lo quiere.
- No probado aún en un iPhone de verdad: el visor de webcams y el aviso de volver.
