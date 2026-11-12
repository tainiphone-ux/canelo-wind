/**
 * Canelo Wind — crea el formulario y la hoja de las QUEDADAS (downwinds y sesiones).
 * Se pega en https://script.google.com (proyecto nuevo) y se ejecuta «crearQuedadasCaneloWind».
 * Al acabar, en el registro de ejecución sale el bloque para pegar en config.js (CONFIG.quedadas).
 * La hoja queda «cualquiera con el enlace puede ver», porque la app la lee para enseñar las quedadas.
 * Para borrar una quedada (spam o cancelada): borrar su fila en la hoja.
 */
function crearQuedadasCaneloWind() {
  const f = FormApp.create('Canelo Wind · Quedadas');
  f.setDescription('Quedadas (downwinds, sesiones…) publicadas desde la app Canelo Wind. Se rellena desde la app.');
  f.setCollectEmail(false);
  const titulos = ['Tipo', 'Fecha', 'Hora', 'Salida', 'Llegada', 'Encuentro', 'Nivel', 'Material', 'Detalles', 'Nombre', 'Instagram'];
  const claves = ['tipo', 'fecha', 'hora', 'salida', 'llegada', 'encuentro', 'nivel', 'material', 'detalles', 'nombre', 'instagram'];
  titulos.forEach(function (t) {
    if (t === 'Detalles') f.addParagraphTextItem().setTitle(t); else f.addTextItem().setTitle(t);
  });

  const ss = SpreadsheetApp.create('Canelo Wind · Quedadas (respuestas)');
  f.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  Utilities.sleep(3000);
  const libro = SpreadsheetApp.openById(ss.getId());
  const hojas = libro.getSheets();
  const hoja = hojas.filter(function (h) { return h.getFormUrl(); })[0] || hojas[hojas.length - 1];
  hojas.forEach(function (h) { if (h.getSheetId() !== hoja.getSheetId()) libro.deleteSheet(h); });
  hoja.getRange('A:Z').setNumberFormat('@'); // todo como texto, para que la app lo lea tal cual
  DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const config = {
    form: f.getPublishedUrl(),
    campos: entradas_(f, claves),
    csv: 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/gviz/tq?tqx=out:csv&gid=' + hoja.getSheetId(),
  };
  Logger.log('CONFIG_QUEDADAS=' + JSON.stringify(config));
  Logger.log('Hoja de quedadas: ' + ss.getUrl());
  Logger.log('Editar formulario: ' + f.getEditUrl());
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
