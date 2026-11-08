/**
 * Canelo Wind — crea los dos formularios de Google y la hoja de reportes.
 * Se pega en https://script.google.com (proyecto nuevo) y se ejecuta «crearFormulariosCaneloWind».
 * Al acabar, en el registro de ejecución sale el bloque para pegar en config.js.
 */
function crearFormulariosCaneloWind() {
  // ---------- 1. Reportes ----------
  const fr = FormApp.create('Canelo Wind · Reportes');
  fr.setDescription('Reportes de condiciones enviados desde la app Canelo Wind. No hace falta rellenarlo a mano: se envía desde la app.');
  fr.setCollectEmail(false);
  const titulosR = ['Spot', 'Fecha', 'Hora', 'Viento', 'Rachas', 'Dirección', 'Estado del mar', 'Valoración', 'Material', 'Comentario', 'Nombre', 'Previsión'];
  const clavesR = ['spot', 'fecha', 'hora', 'viento', 'rachas', 'direccion', 'mar', 'valoracion', 'material', 'comentario', 'nombre', 'prevision'];
  titulosR.forEach(function (t) {
    if (t === 'Comentario') fr.addParagraphTextItem().setTitle(t); else fr.addTextItem().setTitle(t);
  });

  // Hoja de respuestas, legible por la app (cualquiera con el enlace puede verla)
  const ssR = SpreadsheetApp.create('Canelo Wind · Reportes (respuestas)');
  fr.setDestination(FormApp.DestinationType.SPREADSHEET, ssR.getId());
  SpreadsheetApp.flush();
  Utilities.sleep(3000);
  const hojas = SpreadsheetApp.openById(ssR.getId()).getSheets();
  let hojaResp = hojas.filter(function (h) { return h.getFormUrl(); })[0] || hojas[hojas.length - 1];
  hojas.forEach(function (h) { if (h.getSheetId() !== hojaResp.getSheetId()) SpreadsheetApp.openById(ssR.getId()).deleteSheet(h); });
  hojaResp.getRange('A:Z').setNumberFormat('@'); // todo como texto, para que la app lo lea tal cual
  DriveApp.getFileById(ssR.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // ---------- 2. Sugerencias (privadas: su hoja NO se comparte) ----------
  const fs = FormApp.create('Canelo Wind · Sugerencias');
  fs.setDescription('Buzón de sugerencias de la app Canelo Wind.');
  fs.setCollectEmail(false);
  const titulosS = ['Tipo', 'Mensaje', 'Nombre', 'Contacto'];
  const clavesS = ['tipo', 'mensaje', 'nombre', 'contacto'];
  titulosS.forEach(function (t) {
    if (t === 'Mensaje') fs.addParagraphTextItem().setTitle(t); else fs.addTextItem().setTitle(t);
  });
  const ssS = SpreadsheetApp.create('Canelo Wind · Sugerencias (respuestas)');
  fs.setDestination(FormApp.DestinationType.SPREADSHEET, ssS.getId());

  // ---------- 3. Resultado para config.js ----------
  const config = {
    reportes: {
      form: fr.getPublishedUrl(),
      campos: entradas_(fr, clavesR),
      csv: 'https://docs.google.com/spreadsheets/d/' + ssR.getId() + '/gviz/tq?tqx=out:csv&gid=' + hojaResp.getSheetId(),
    },
    sugerencias: {
      form: fs.getPublishedUrl(),
      campos: entradas_(fs, clavesS),
    },
  };
  Logger.log('CONFIG_CANELO_WIND=' + JSON.stringify(config));
  Logger.log('Hoja de reportes: ' + ssR.getUrl());
  Logger.log('Hoja de sugerencias: ' + ssS.getUrl());
  Logger.log('Editar formulario de reportes: ' + fr.getEditUrl());
  Logger.log('Editar formulario de sugerencias: ' + fs.getEditUrl());
}

// Saca el «entry.XXXX» de cada pregunta a partir de un enlace prerrellenado
function entradas_(form, claves) {
  const items = form.getItems();
  let resp = form.createResponse();
  items.forEach(function (it, i) {
    const r = it.getType() === FormApp.ItemType.PARAGRAPH_TEXT
      ? it.asParagraphTextItem().createResponse('X' + i + 'X')
      : it.asTextItem().createResponse('X' + i + 'X');
    resp = resp.withItemResponse(r);
  });
  const url = resp.toPrefilledUrl();
  const res = {};
  items.forEach(function (it, i) {
    const m = url.match(new RegExp('entry\\.(\\d+)=X' + i + 'X'));
    res[claves[i]] = m ? 'entry.' + m[1] : '';
  });
  return res;
}
