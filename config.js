// Conexión con los formularios de Google (reportes del día y buzón de sugerencias).
// Mientras esté vacío, la app enseña los formularios pero avisa de que aún no están activados.
// Los pasos para rellenarlo están en «COMO CREAR LOS FORMULARIOS.md».

const CONFIG = {
  reportes: {
    // Enlace del formulario «Canelo Wind · Reportes» (el que acaba en /viewform)
    form: "",
    // Número «entry.XXXX» de cada pregunta (sale del enlace prerrellenado)
    campos: {
      spot: "", fecha: "", hora: "", viento: "", rachas: "", direccion: "",
      mar: "", valoracion: "", material: "", comentario: "", nombre: "", prevision: "",
    },
    // Hoja de respuestas publicada como CSV (Archivo › Compartir › Publicar en la web › CSV)
    csv: "",
  },
  sugerencias: {
    // Enlace del formulario «Canelo Wind · Sugerencias» (sus respuestas NO se publican)
    form: "",
    campos: { tipo: "", mensaje: "", nombre: "", contacto: "" },
  },
};
