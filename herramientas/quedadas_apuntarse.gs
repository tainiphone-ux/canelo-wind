/**
 * Canelo Wind — APUNTARSE y CHAT de las quedadas (Apps Script en la cuenta de Canelo Wind, windcanelo@gmail.com).
 * Guarda, en una hoja PRIVADA (nadie más la ve), quién se apunta a cada quedada y los mensajes del chat.
 * No pide ni guarda email ni teléfono de nadie: solo nombre e Instagram (opcional), igual que el resto de la app.
 *
 * Cómo se instala (una sola vez):
 *  1. Proyecto nuevo en https://script.google.com (en la cuenta windcanelo@gmail.com), pegar este código y guardar.
 *  2. Ejecutar «prepararQuedadasApuntarse» (crea la hoja privada). Dar permiso.
 *  3. Ejecutar «anadirCampoIdQuedadas» (añade a la hoja PÚBLICA de quedadas una columna «ID», que la app rellena
 *     sola y no se ve en pantalla). En el registro sale CAMPO_ID=entry.NNNNN → copiarlo a config.js,
 *     dentro de CONFIG.quedadas.campos (añadir `id: "entry.NNNNN"`).
 *  4. Implementar → Nueva implementación → Aplicación web · Ejecutar como: yo · Acceso: cualquier usuario.
 *     La dirección que acaba en /exec → config.js (CONFIG.quedadasApp.url).
 *
 * Avisos de verdad (aunque el móvil tenga la app cerrada), con Firebase Cloud Messaging:
 *  5. En las Propiedades del script (⚙️ Configuración del proyecto → Propiedades del script) añadir:
 *     FB_PROJECT_ID, FB_CLIENT_EMAIL y FB_PRIVATE_KEY, con los datos del archivo JSON de la cuenta de servicio
 *     de Firebase (nunca subir ese archivo a ningún sitio: solo pegarlo aquí).
 *
 * La app manda aquí (POST, texto JSON):
 *  - {accion:"apuntarse", id, nombre, instagram, miToken?}  → añade a quien se apunta; devuelve el número de apuntados
 *  - {accion:"mensaje", id, nombre, texto, miToken?}        → añade un mensaje de chat
 *  - {accion:"registrar_push", id, token}                   → guarda el token de este móvil para avisarle de esta quedada
 * Y lee con GET:
 *  - ?accion=contar&ids=id1,id2,…   → {ok:true, contador:{id1:n, id2:n, …}}
 *  - ?accion=mensajes&id=…          → {ok:true, mensajes:[{fecha,nombre,texto}, …]} (los últimos 80)
 *
 * Para borrar spam a mano: abrir la hoja «Canelo Wind · Quedadas (apuntados y chat)» y borrar la fila.
 */

function prepararQuedadasApuntarse() {
  const P = PropertiesService.getScriptProperties();
  if (!P.getProperty('HOJA')) {
    const ss = SpreadsheetApp.create('Canelo Wind · Quedadas (apuntados y chat)');
    const hA = ss.getSheets()[0];
    hA.setName('Apuntados');
    hA.appendRow(['Fecha', 'QuedadaId', 'Nombre', 'Instagram']);
    hA.setFrozenRows(1);
    const hM = ss.insertSheet('Mensajes');
    hM.appendRow(['Fecha', 'QuedadaId', 'Nombre', 'Texto']);
    hM.setFrozenRows(1);
    const hT = ss.insertSheet('Tokens');
    hT.appendRow(['Fecha', 'QuedadaId', 'Token']);
    hT.setFrozenRows(1);
    P.setProperties({ HOJA: ss.getId() });
    // Esta hoja NO se comparte: solo la ve la cuenta de Canelo Wind.
  }
  Logger.log('Hoja (privada): https://docs.google.com/spreadsheets/d/' + P.getProperty('HOJA') + '/edit');
}

// Añade la columna «ID» (oculta para quien mire la app) al formulario PÚBLICO de quedadas, si no la tiene ya.
// SSID: la hoja «Canelo Wind · Quedadas (respuestas)» (la de CONFIG.quedadas.csv en config.js).
function anadirCampoIdQuedadas() {
  const SSID = '1oWLK1FuFxtALufOAgx3MjHBRbiwfRbdrKqwGl4DalmU';
  const formUrl = SpreadsheetApp.openById(SSID).getFormUrl();
  if (!formUrl) throw new Error('Esta hoja no tiene un formulario vinculado');
  const f = FormApp.openByUrl(formUrl);
  const existente = f.getItems().find(function (it) { return it.getTitle() === 'ID'; });
  const item = existente ? existente.asTextItem() : f.addTextItem().setTitle('ID').setHelpText('No tocar: lo rellena la app sola.');
  const marca = 'MARCA' + Date.now();
  const resp = f.createResponse().withItemResponse(item.createResponse(marca));
  const m = resp.toPrefilledUrl().match(new RegExp('entry\\.(\\d+)=' + marca));
  Logger.log('CAMPO_ID=' + (m ? 'entry.' + m[1] : 'NO ENCONTRADO (mira el formulario a mano)'));
}

function hojas_() {
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('HOJA'));
  return {
    apuntados: ss.getSheetByName('Apuntados'),
    mensajes: ss.getSheetByName('Mensajes'),
    tokens: ss.getSheetByName('Tokens') || (function () {
      const h = ss.insertSheet('Tokens');
      h.appendRow(['Fecha', 'QuedadaId', 'Token']);
      h.setFrozenRows(1);
      return h;
    })(),
  };
}
function txt_(v, n) { return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, n); }
function contarFilas_(hoja, col, id) {
  const vals = hoja.getLastRow() > 1 ? hoja.getRange(2, col, hoja.getLastRow() - 1, 1).getValues() : [];
  return vals.filter(function (f) { return String(f[0]) === id; }).length;
}
function tokensDe_(hoja, id, excluir) {
  const n = hoja.getLastRow();
  if (n < 2) return [];
  const vals = hoja.getRange(2, 1, n - 1, 3).getValues();
  const vistos = {}, out = [];
  vals.forEach(function (f) {
    const tok = f[2];
    if (String(f[1]) === id && tok && tok !== excluir && !vistos[tok]) { vistos[tok] = true; out.push(tok); }
  });
  return out;
}

// ---- Avisos de verdad con Firebase Cloud Messaging (HTTP v1) ----
function tokenAcceso_() {
  const cache = CacheService.getScriptCache();
  const cacheado = cache.get('FB_TOKEN');
  if (cacheado) return cacheado;
  const P = PropertiesService.getScriptProperties();
  const email = P.getProperty('FB_CLIENT_EMAIL');
  const clave = (P.getProperty('FB_PRIVATE_KEY') || '').replace(/\\n/g, '\n');
  if (!email || !clave) return null;
  const ahora = Math.floor(Date.now() / 1000);
  const b64 = function (obj) { return Utilities.base64EncodeWebSafe(JSON.stringify(obj)).replace(/=+$/, ''); };
  const base = b64({ alg: 'RS256', typ: 'JWT' }) + '.' + b64({
    iss: email, scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token', exp: ahora + 3600, iat: ahora,
  });
  const firma = Utilities.base64EncodeWebSafe(Utilities.computeRsaSha256Signature(base, clave)).replace(/=+$/, '');
  const resp = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method: 'post',
    payload: { grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: base + '.' + firma },
    muteHttpExceptions: true,
  });
  const datos = JSON.parse(resp.getContentText());
  if (!datos.access_token) return null;
  cache.put('FB_TOKEN', datos.access_token, (datos.expires_in || 3600) - 60);
  return datos.access_token;
}
function enviarPush_(token, titulo, cuerpo, url) {
  try {
    const P = PropertiesService.getScriptProperties();
    const proyecto = P.getProperty('FB_PROJECT_ID');
    const acceso = tokenAcceso_();
    if (!proyecto || !acceso) return;
    UrlFetchApp.fetch('https://fcm.googleapis.com/v1/projects/' + proyecto + '/messages:send', {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + acceso },
      payload: JSON.stringify({ message: { token: token, notification: { title: titulo, body: cuerpo }, webpush: { fcm_options: { link: url } } } }),
      muteHttpExceptions: true,
    });
  } catch (e) { /* un aviso que falla no debe romper la quedada */ }
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

function doGet(e) {
  let r;
  try { r = atenderGet_(e.parameter || {}); }
  catch (err) { r = { ok: false, error: String((err && err.message) || err) }; }
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}

function atender_(d) {
  const H = hojas_(), ahora = new Date().toISOString();
  const id = txt_(d.id, 20);
  if (!id) throw new Error('id');

  if (d.accion === 'registrar_push') {
    const token = txt_(d.token, 300);
    if (!token) throw new Error('token');
    H.tokens.appendRow([ahora, id, token]);
    return { ok: true };
  }
  if (d.accion === 'apuntarse') {
    const nombre = txt_(d.nombre, 40);
    if (!nombre) throw new Error('nombre');
    H.apuntados.appendRow([ahora, id, nombre, txt_(d.instagram, 30).replace(/[^\w.]/g, '')]);
    const contador = contarFilas_(H.apuntados, 2, id);
    tokensDe_(H.tokens, id, txt_(d.miToken, 300)).forEach(function (tok) {
      enviarPush_(tok, 'Canelo Wind', nombre + ' se ha apuntado a tu quedada', 'https://canelowind.com/#quedadas');
    });
    return { ok: true, contador: contador };
  }
  if (d.accion === 'mensaje') {
    const nombre = txt_(d.nombre, 40), texto = txt_(d.texto, 300);
    if (!nombre || !texto) throw new Error('datos');
    H.mensajes.appendRow([ahora, id, nombre, texto]);
    tokensDe_(H.tokens, id, txt_(d.miToken, 300)).forEach(function (tok) {
      enviarPush_(tok, nombre, texto, 'https://canelowind.com/#quedadas');
    });
    return { ok: true };
  }
  throw new Error('accion');
}

function atenderGet_(p) {
  const H = hojas_();
  if (p.accion === 'contar') {
    const ids = String(p.ids || p.id || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    const contador = {};
    ids.forEach(function (id) { contador[id] = contarFilas_(H.apuntados, 2, id); });
    return { ok: true, contador: contador };
  }
  if (p.accion === 'mensajes') {
    const id = txt_(p.id, 20); if (!id) throw new Error('id');
    const n = H.mensajes.getLastRow();
    const filas = n > 1 ? H.mensajes.getRange(2, 1, n - 1, 4).getValues() : [];
    const mensajes = filas.filter(function (f) { return String(f[1]) === id; })
      .map(function (f) { return { fecha: f[0], nombre: f[2], texto: f[3] }; }).slice(-80);
    return { ok: true, mensajes: mensajes };
  }
  return { ok: true, app: 'Canelo Wind · Quedadas (apuntarse y chat)' };
}
