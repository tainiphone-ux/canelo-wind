// Contador de visitas con GoatCounter (sin cookies ni datos personales).
// Para encenderlo: poner aquí el nombre del contador (el de https://NOMBRE.goatcounter.com).
// Vacío = apagado: la web funciona igual pero no cuenta nada.
const GOATCOUNTER = "";

(function () {
  if (!GOATCOUNTER) { window.contar = () => {}; return; }
  // No contar las pruebas en el ordenador de Valentín
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) { window.contar = () => {}; return; }

  const pendientes = [];
  // contar("/spot/el-medano", "El Médano") → página vista · contar("instalada", "…", true) → evento
  window.contar = (ruta, titulo, evento) => {
    const datos = { path: ruta, title: titulo || ruta, event: !!evento };
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count(datos);
    else pendientes.push(datos);
  };

  // La página principal se cuenta sola al cargar el script
  window.goatcounter = { no_onload: false };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = "https://" + GOATCOUNTER + ".goatcounter.com/count";
  s.onload = () => { pendientes.splice(0).forEach(d => window.goatcounter.count(d)); };
  document.head.appendChild(s);
})();
