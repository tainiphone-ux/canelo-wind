// Conexión con los formularios de Google (reportes del día y buzón de sugerencias).
// Creados el 08-11-2026 con herramientas/crear_formularios.gs en la cuenta de Google de Valentín.

const CONFIG = {
  reportes: {
    // Formulario «Canelo Wind · Reportes»
    form: "https://docs.google.com/forms/d/e/1FAIpQLSfCGPWf3YylCpSwcnQ4k333UIXcU6_hq1cUE_Lg7bv80iobrw/viewform",
    campos: {
      spot: "entry.1107885146", fecha: "entry.403954751", hora: "entry.165944545",
      viento: "entry.727495404", rachas: "entry.1153163332", direccion: "entry.858101845",
      mar: "entry.2043646994", valoracion: "entry.898346408", material: "entry.1115315951",
      comentario: "entry.1740572111", nombre: "entry.827975404", prevision: "entry.102502674",
    },
    // Hoja «Canelo Wind · Reportes (respuestas)», compartida solo para ver
    csv: "https://docs.google.com/spreadsheets/d/1DwYLv69HGw71w4N0Odz5vZWcL2K9sU2ggNHfghlRZJ8/gviz/tq?tqx=out:csv&gid=1810976243",
  },
  sugerencias: {
    // Formulario «Canelo Wind · Sugerencias» (su hoja es privada)
    form: "https://docs.google.com/forms/d/e/1FAIpQLSeB-cp_pnvGJC2FMsgSH3Xa91MHHmEKBzAt25PAmfdJP7AKvQ/viewform",
    campos: { tipo: "entry.1787035991", mensaje: "entry.1586210193", nombre: "entry.2048740754", contacto: "entry.435415204" },
  },
  quedadas: {
    // Formulario «Canelo Wind · Quedadas» (se crea con herramientas/crear_quedadas.gs). Su hoja es pública (solo ver).
    form: "",
    campos: { tipo: "", fecha: "", hora: "", salida: "", llegada: "", encuentro: "", nivel: "", material: "", detalles: "", nombre: "", instagram: "" },
    csv: "",
  },
};
