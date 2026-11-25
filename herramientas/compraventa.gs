/**
 * Canelo Wind — COMPRAVENTA de material de segunda mano (Apps Script en la cuenta de Canelo Wind).
 *
 * Cómo se instala (una sola vez):
 *  1. Proyecto nuevo en https://script.google.com, pegar este código y guardar.
 *  2. Ejecutar «prepararCompraventa» (crea la hoja pública de anuncios y la carpeta pública de fotos). Dar permiso.
 *     En el registro sale la dirección CSV de la hoja → config.js (CONFIG.compraventa.csv).
 *  3. Implementar → Nueva implementación → Aplicación web · Ejecutar como: yo · Acceso: cualquier usuario.
 *     La dirección que acaba en /exec → config.js (CONFIG.compraventa.url).
 *
 * La app manda aquí (POST, texto JSON):
 *  - {accion:"publicar", secreto, categoria, titulo, precio, negociable, estado, isla, zona, descripcion, nombre, instagram, whatsapp, fotos:[jpeg en base64]}
 *  - {accion:"renovar", id, secreto}            → el anuncio sigue 30 días más
 *  - {accion:"editar", id, secreto, categoria, titulo, precio, negociable, estado, isla, zona, descripcion, nombre, instagram, whatsapp, fotos?:[jpeg en base64]}
 *                                                → cambia los datos; si manda «fotos» se cambian también (las 3 antiguas a la papelera)
 *  - {accion:"quitar", id, secreto, vendido}    → se quita (y sus fotos van a la papelera)
 * El «secreto» solo lo tiene el móvil que puso el anuncio; aquí se guarda cifrado (SHA-256) en las propiedades del script.
 * Para quitar un anuncio a mano (spam): en la hoja, poner «quitado» en la columna Situacion (o borrar la fila).
 *
 * CHAT privado entre quien compra y quien vende (cada conversación la ve solo esa pareja; ni email ni teléfono de nadie):
 *  - {accion:"mensaje_cv", id, convId, autor:"comprador"|"vendedor", nombre, texto, secreto?}
 *      → «convId» lo genera el móvil de quien compra (token largo al azar) y lo guarda para seguir la misma conversación.
 *        Si autor es «vendedor» hace falta el secreto del anuncio (igual que editar/quitar).
 *  - {accion:"mensajes_cv", id, convId}                  → los mensajes de esa conversación (sin secreto: basta con conocer el convId)
 *  - {accion:"conversaciones", id, secreto}              → (solo quien vende) la lista de conversaciones de ese anuncio
 *  - {accion:"contar_cv", id, secreto}                   → (solo quien vende) cuántos mensajes hay en total, para avisar de novedades
 * Los mensajes se guardan en una hoja privada aparte («Canelo Wind · Compraventa (mensajes)», se crea sola la primera vez
 * que hace falta: no hay que ejecutar nada a mano para esto). Para borrar spam: abrirla y borrar la fila.
 */

function prepararCompraventa() {
  const P = PropertiesService.getScriptProperties();
  if (!P.getProperty('HOJA')) {
    const ss = SpreadsheetApp.create('Canelo Wind · Compraventa (anuncios)');
    const h = ss.getSheets()[0];
    h.setName('Anuncios');
    try { h.getRange(1, 1, h.getMaxRows(), 18).setNumberFormat('@'); } catch (e) {} // todo como texto
    h.appendRow(['Publicado', 'Id', 'Categoria', 'Titulo', 'Precio', 'Negociable', 'Estado', 'Isla', 'Zona', 'Descripcion',
      'Nombre', 'Instagram', 'Whatsapp', 'Foto1', 'Foto2', 'Foto3', 'Renovado', 'Situacion']);
    h.setFrozenRows(1);
    DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const carpeta = DriveApp.createFolder('Canelo Wind · Compraventa (fotos)');
    carpeta.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    P.setProperties({ HOJA: ss.getId(), GID: String(h.getSheetId()), CARPETA: carpeta.getId() });
  }
  Logger.log('CSV=https://docs.google.com/spreadsheets/d/' + P.getProperty('HOJA') + '/gviz/tq?tqx=out:csv&gid=' + P.getProperty('GID'));
  Logger.log('Hoja: https://docs.google.com/spreadsheets/d/' + P.getProperty('HOJA') + '/edit');
  Logger.log('Carpeta de fotos: https://drive.google.com/drive/folders/' + P.getProperty('CARPETA'));
}

function doPost(e) {
  let r;
  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try { r = atender_(JSON.parse(e.postData.contents)); }
  catch (err) { r = { ok: false, error: String((err && err.message) || err) }; }
  finally { lock.releaseLock(); }
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, app: 'Canelo Wind · Compraventa' })).setMimeType(ContentService.MimeType.JSON);
}

function txt_(v, n) { return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, n); }
function sha_(s) { return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s))); }

// Hoja PRIVADA de los chats (se crea sola la primera vez; nunca se comparte).
function hojaMensajes_(P) {
  let id = P.getProperty('HOJAM');
  if (!id) {
    const ss = SpreadsheetApp.create('Canelo Wind · Compraventa (mensajes)');
    const h = ss.getSheets()[0]; h.setName('Mensajes');
    h.appendRow(['Fecha', 'AnuncioId', 'ConvId', 'Autor', 'Nombre', 'Texto']);
    h.setFrozenRows(1);
    id = ss.getId(); P.setProperty('HOJAM', id);
  }
  return SpreadsheetApp.openById(id).getSheets()[0];
}

function atenderChat_(d, P, ahora) {
  const hoja = hojaMensajes_(P);
  const id = txt_(d.id, 20); if (!id) throw new Error('id');

  if (d.accion === 'mensaje_cv') {
    const convId = txt_(d.convId, 40); if (convId.length < 16) throw new Error('conv');
    const autor = d.autor === 'vendedor' ? 'vendedor' : 'comprador';
    if (autor === 'vendedor') {
      const guardado = P.getProperty('S_' + id);
      if (!guardado || guardado !== sha_(d.secreto)) throw new Error('permiso');
    }
    const nombre = txt_(d.nombre, 40), texto = txt_(d.texto, 500);
    if (!nombre || !texto) throw new Error('datos');
    hoja.appendRow([ahora, id, convId, autor, nombre, texto]);
    return { ok: true };
  }
  if (d.accion === 'mensajes_cv') {
    const convId = txt_(d.convId, 40); if (!convId) throw new Error('conv');
    const n = hoja.getLastRow();
    const filas = n > 1 ? hoja.getRange(2, 1, n - 1, 6).getValues() : [];
    const mensajes = filas.filter(function (f) { return String(f[1]) === id && String(f[2]) === convId; })
      .map(function (f) { return { fecha: f[0], autor: f[3], nombre: f[4], texto: f[5] }; }).slice(-100);
    return { ok: true, mensajes: mensajes };
  }

  // «conversaciones» y «contar_cv» son solo para quien vende: hace falta su secreto.
  const guardado = P.getProperty('S_' + id);
  if (!guardado || guardado !== sha_(d.secreto)) throw new Error('permiso');
  const n = hoja.getLastRow();
  const filas = n > 1 ? hoja.getRange(2, 1, n - 1, 6).getValues() : [];
  const deEsteAnuncio = filas.filter(function (f) { return String(f[1]) === id; });

  if (d.accion === 'conversaciones') {
    const porConv = {};
    deEsteAnuncio.forEach(function (f) {
      const c = String(f[2]);
      if (!porConv[c]) porConv[c] = { convId: c, mensajes: 0 };
      porConv[c].mensajes++; porConv[c].ultimo = f[5]; porConv[c].fecha = f[0];
      if (f[3] === 'comprador') porConv[c].nombre = f[4];
    });
    const lista = Object.keys(porConv).map(function (k) { return porConv[k]; })
      .sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
    return { ok: true, conversaciones: lista };
  }
  if (d.accion === 'contar_cv') return { ok: true, contador: deEsteAnuncio.length };
  throw new Error('accion');
}

function atender_(d) {
  const P = PropertiesService.getScriptProperties();
  const hoja = SpreadsheetApp.openById(P.getProperty('HOJA')).getSheets()[0];
  const ahora = new Date().toISOString();

  if (d.accion === 'mensaje_cv' || d.accion === 'mensajes_cv' || d.accion === 'conversaciones' || d.accion === 'contar_cv') {
    return atenderChat_(d, P, ahora);
  }

  if (d.accion === 'publicar') {
    if (!d.secreto || String(d.secreto).length < 16) throw new Error('secreto');
    const precio = Math.round(Number(d.precio));
    if (!txt_(d.titulo, 80) || !(precio >= 0) || precio > 100000) throw new Error('datos');
    if (!(d.fotos || []).length) throw new Error('fotos');
    const id = Utilities.getUuid().replace(/-/g, '').slice(0, 10);
    const carpeta = DriveApp.getFolderById(P.getProperty('CARPETA'));
    const fotos = d.fotos.slice(0, 3).map(function (b64, i) {
      const bytes = Utilities.base64Decode(String(b64).replace(/^data:image\/\w+;base64,/, ''));
      if (bytes.length > 2000000) throw new Error('foto');
      const f = carpeta.createFile(Utilities.newBlob(bytes, 'image/jpeg', id + '-' + (i + 1) + '.jpg'));
      f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return f.getId();
    });
    while (fotos.length < 3) fotos.push('');
    hoja.appendRow([ahora, id, txt_(d.categoria, 40), txt_(d.titulo, 80), String(precio), d.negociable ? 'si' : '',
      txt_(d.estado, 40), txt_(d.isla, 40), txt_(d.zona, 60), String(d.descripcion || '').trim().slice(0, 1000),
      txt_(d.nombre, 40), txt_(d.instagram, 30).replace(/[^\w.]/g, ''), txt_(d.whatsapp, 20).replace(/[^\d+]/g, ''),
      fotos[0], fotos[1], fotos[2], ahora, 'activo']);
    P.setProperty('S_' + id, sha_(d.secreto));
    return { ok: true, id: id, fecha: ahora, fotos: fotos };
  }

  const id = txt_(d.id, 20), guardado = P.getProperty('S_' + id);
  if (!id || !guardado || guardado !== sha_(d.secreto)) throw new Error('permiso');
  const ids = hoja.getRange(1, 2, hoja.getLastRow(), 1).getValues();
  let fila = -1;
  for (let i = 1; i < ids.length; i++) if (String(ids[i][0]) === id) { fila = i + 1; break; }
  if (fila < 2) throw new Error('no existe');

  if (d.accion === 'renovar') {
    hoja.getRange(fila, 17, 1, 2).setValues([[ahora, 'activo']]);
    return { ok: true, fecha: ahora };
  }
  if (d.accion === 'editar') {
    const precio = Math.round(Number(d.precio));
    if (!txt_(d.titulo, 80) || !(precio >= 0) || precio > 100000) throw new Error('datos');
    hoja.getRange(fila, 3, 1, 11).setValues([[txt_(d.categoria, 40), txt_(d.titulo, 80), String(precio), d.negociable ? 'si' : '',
      txt_(d.estado, 40), txt_(d.isla, 40), txt_(d.zona, 60), String(d.descripcion || '').trim().slice(0, 1000),
      txt_(d.nombre, 40), txt_(d.instagram, 30).replace(/[^\w.]/g, ''), txt_(d.whatsapp, 20).replace(/[^\d+]/g, '')]]);
    if ((d.fotos || []).length) {
      hoja.getRange(fila, 14, 1, 3).getValues()[0].forEach(function (f) { if (f) try { DriveApp.getFileById(f).setTrashed(true); } catch (e) {} });
      const carpeta = DriveApp.getFolderById(P.getProperty('CARPETA'));
      const fotos = d.fotos.slice(0, 3).map(function (b64, i) {
        const bytes = Utilities.base64Decode(String(b64).replace(/^data:image\/\w+;base64,/, ''));
        if (bytes.length > 2000000) throw new Error('foto');
        const f = carpeta.createFile(Utilities.newBlob(bytes, 'image/jpeg', id + '-' + (i + 1) + '.jpg'));
        f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        return f.getId();
      });
      while (fotos.length < 3) fotos.push('');
      hoja.getRange(fila, 14, 1, 3).setValues([fotos]);
    }
    return { ok: true, fecha: ahora };
  }
  if (d.accion === 'quitar') {
    hoja.getRange(fila, 14, 1, 3).getValues()[0].forEach(function (f) { if (f) try { DriveApp.getFileById(f).setTrashed(true); } catch (e) {} });
    hoja.getRange(fila, 14, 1, 5).setValues([['', '', '', ahora, d.vendido ? 'vendido' : 'quitado']]);
    P.deleteProperty('S_' + id);
    return { ok: true };
  }
  throw new Error('accion');
}
