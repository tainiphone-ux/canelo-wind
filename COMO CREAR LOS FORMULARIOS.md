# Cómo activar los reportes y el buzón de sugerencias

Son **dos formularios de Google** (forms.google.com, con tu cuenta de Google).
Todas las preguntas, de tipo **«Respuesta corta»** (salvo donde pone «Párrafo») y **sin marcar «Obligatoria»**.
Los títulos de las preguntas tienen que ser **exactamente** estos.

## 1. Formulario «Canelo Wind · Reportes»

| Pregunta | Tipo |
|---|---|
| Spot | Respuesta corta |
| Fecha | Respuesta corta |
| Hora | Respuesta corta |
| Viento | Respuesta corta |
| Rachas | Respuesta corta |
| Dirección | Respuesta corta |
| Estado del mar | Respuesta corta |
| Valoración | Respuesta corta |
| Material | Respuesta corta |
| Comentario | Párrafo |
| Nombre | Respuesta corta |
| Previsión | Respuesta corta |

Después:
1. Pestaña **Respuestas** › **Vincular con Hojas de cálculo** › crear hoja nueva.
2. En esa hoja: **Archivo › Compartir › Publicar en la web** › elige la pestaña de respuestas y **«Valores separados por comas (.csv)»** › Publicar. Copia el enlace.
3. Vuelve al formulario: menú **⋮ › Obtener enlace prerrellenado**, escribe cualquier cosa en cada pregunta (por ejemplo 1, 2, 3…) › **Obtener enlace** › **Copiar enlace**.

## 2. Formulario «Canelo Wind · Sugerencias»

| Pregunta | Tipo |
|---|---|
| Tipo | Respuesta corta |
| Mensaje | Párrafo |
| Nombre | Respuesta corta |
| Contacto | Respuesta corta |

Vincúlalo también a una hoja (para leerlas tú), pero **esta NO la publiques** (los mensajes son privados).
Saca su **enlace prerrellenado** igual que en el otro.

## 3. Pásale a Claude los 3 enlaces

- Enlace prerrellenado de Reportes
- Enlace CSV publicado de la hoja de Reportes
- Enlace prerrellenado de Sugerencias

Claude los pone en `config.js` y lo sube a GitHub. A partir de ahí la gente ya puede mandar reportes y sugerencias.

Los reportes los verás en tu hoja «Canelo Wind · Reportes» y salen en la app, en cada spot («Lo que dice la gente»), junto con la previsión que había a esa hora, para ver qué tal acierta.
