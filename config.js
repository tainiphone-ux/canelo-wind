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
    // Formulario «Canelo Wind · Quedadas» (creado el 12-11-2026 con herramientas/crear_quedadas.gs en la cuenta windcanelo@gmail.com)
    form: "https://docs.google.com/forms/d/e/1FAIpQLSc-6rcEa5W6ra-r5_kPdZt8epwXZU_VoQ_ixqsn5vlwSFrNCQ/viewform",
    campos: {
      tipo: "entry.2013601178", fecha: "entry.71923980", hora: "entry.2030252577", salida: "entry.826881075",
      llegada: "entry.1171292873", encuentro: "entry.1813387052", nivel: "entry.584951277", material: "entry.1336687269",
      detalles: "entry.558304379", nombre: "entry.1038098577", instagram: "entry.1474608316",
    },
    // Hoja «Canelo Wind · Quedadas (respuestas)», compartida solo para ver. Para quitar una quedada, borrar su fila:
    // https://docs.google.com/spreadsheets/d/1oWLK1FuFxtALufOAgx3MjHBRbiwfRbdrKqwGl4DalmU/edit
    csv: "https://docs.google.com/spreadsheets/d/1oWLK1FuFxtALufOAgx3MjHBRbiwfRbdrKqwGl4DalmU/gviz/tq?tqx=out:csv&gid=1659135050",
  },
  compraventa: {
    // Apps Script «Canelo Wind · Compraventa» (herramientas/compraventa.gs) publicado como aplicación web, en la cuenta de Canelo Wind
    url: "https://script.google.com/macros/s/AKfycbyJZtasKovoWkXi-CBbN3HVX0HLet34yxjPDtEs6-XMU_8s4lViCZhzIK_a4BNx-_tcQg/exec",
    // Hoja «Canelo Wind · Compraventa (anuncios)», pública (solo ver). Para quitar un anuncio a mano: poner «quitado» en Situacion.
    // https://docs.google.com/spreadsheets/d/1NcVPxSYAmA_v82nVE6CPZ_Vu7u2QM24k10SNYLa_Tyo/edit
    csv: "https://docs.google.com/spreadsheets/d/1NcVPxSYAmA_v82nVE6CPZ_Vu7u2QM24k10SNYLa_Tyo/gviz/tq?tqx=out:csv&gid=0",
  },
};
