// Capturas del móvil para el vídeo de LA JAQUITA con un día de viento muy bueno (datos de ejemplo, no reales).
// node capturas_lajaquita.mjs <carpeta de salida>
import { abrirChrome, dormir } from "./chrome.mjs";
const OUT = process.argv[2] + "/";
const c = await abrirChrome({ puerto: 9345, perfil: "/tmp/cw-chrome-capturas4", movil: true });
const pos = async (sel) => c.ev(`(()=>{const r=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return [Math.round(r.x+r.width/2),Math.round(r.y+r.height/2)]})()`);
const foto = async (n) => { await dormir(900); await c.foto(OUT + n + ".png"); console.log("foto", n); };

await c.ir("https://canelowind.com/", 3000);
await c.ev(`localStorage.clear(); localStorage.setItem('cw_idioma','"es"'); localStorage.setItem('cw_unidad','"kn"')`);
await c.ir("https://canelowind.com/?lang=es", 12000);

// Viento de ejemplo: fuerte, constante y de buena dirección (NE), todo el día y todos los días
await c.ev(`(()=>{
  const sp = SPOTS.find(s=>s.id==='la-jaquita');
  const hoy = hoyISO(tzDe(sp));
  const horas = [], dias7 = [];
  for (let d=0; d<7; d++) { const f = new Date(hoy+'T00:00'); f.setDate(f.getDate()+d); dias7.push(f.toISOString().slice(0,10)); }
  dias7.forEach(dd => { for (let h=0; h<24; h++) horas.push(dd+'T'+String(h).padStart(2,'0')+':00'); });
  const n = horas.length;
  const rep = (v) => new Array(n).fill(v);
  const v = { current: { wind_speed_10m: 21, wind_gusts_10m: 26, wind_direction_10m: 45, weather_code: 1, temperature_2m: 23 },
    hourly: { time: horas, wind_speed_10m: rep(21), wind_gusts_10m: rep(26), wind_direction_10m: rep(45), weather_code: rep(1), temperature_2m: rep(23), precipitation_probability: rep(0) },
    daily: { sunrise: dias7.map(d=>d+'T07:30'), sunset: dias7.map(d=>d+'T18:40') } };
  const o = { current: { wave_height: 0.8, wave_period: 8, wave_direction: 45, sea_surface_temperature: 21 },
    hourly: { time: horas, wave_height: rep(0.8), wave_direction: rep(45), wave_period: rep(8), swell_wave_height: rep(0.6), swell_wave_period: rep(9), swell_wave_direction: rep(45) } };
  cache['la-jaquita'] = { v, o, t: Date.now() };
  sp.ahora = v.current;
  return 1;
})()`);

// Lista: la tarjeta de La Jaquita con el aviso verde «Muy bueno»
// (se espera a que termine el viento real de todos los spots y se vuelve a pisar el de La Jaquita)
await dormir(2500);
await c.ev(`(()=>{
  const sp = SPOTS.find(s=>s.id==='la-jaquita');
  sp.ahora = { wind_speed_10m: 21, wind_gusts_10m: 26, wind_direction_10m: 45, weather_code: 1 };
  location.hash=''; pintarLista(); return 1;
})()`);
await dormir(600);
await c.ev(`(()=>{const e=document.querySelector('[data-id="la-jaquita"]');if(e) e.scrollIntoView({block:'center'});return !!e})()`);
await foto("lista");
console.log("toque la jaquita", await pos('[data-id="la-jaquita"]'));

// Ficha: «Ahora mismo» con el aviso verde y los datos grandes
await c.ev(`(()=>{location.hash='spot=la-jaquita';return 1})()`);
await dormir(1200);
await c.ev(`window.scrollTo(0,0)`);
await foto("ficha");

// Horas: la tabla del día con todo en verde
await c.ev(`(()=>{const e=document.querySelector('.tabla');if(e) window.scrollTo(0,e.getBoundingClientRect().top+scrollY-110);return 1})()`);
await foto("horas");

c.cerrar();
