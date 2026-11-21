// Capturas para el vídeo de AVISOS DE SEGURIDAD, spot Playa de Troya, con viento de ejemplo del NE (off-shore para este spot).
// node capturas.mjs <carpeta de salida>
import { abrirChrome, dormir } from "./chrome.mjs";
const OUT = process.argv[2] + "/";
const c = await abrirChrome({ puerto: 9349, perfil: "/tmp/cw-chrome-capturas8", movil: true });
const foto = async (n) => { await dormir(900); await c.foto(OUT + n + ".png"); console.log("foto", n); };

await c.ir("https://canelowind.com/", 3000);
await c.ev(`localStorage.clear(); localStorage.setItem('cw_idioma','"es"'); localStorage.setItem('cw_unidad','"kn"')`);
await c.ir("https://canelowind.com/?lang=es", 12000);

// Viento de ejemplo: del nordeste (off-shore en Playa de Troya), moderado, todo el día
await c.ev(`(()=>{
  const sp = SPOTS.find(s=>s.id==='playa-troya');
  const hoy = hoyISO(tzDe(sp));
  const horas = [], dias7 = [];
  for (let d=0; d<7; d++) { const f = new Date(hoy+'T00:00'); f.setDate(f.getDate()+d); dias7.push(f.toISOString().slice(0,10)); }
  dias7.forEach(dd => { for (let h=0; h<24; h++) horas.push(dd+'T'+String(h).padStart(2,'0')+':00'); });
  const n = horas.length;
  const rep = (v) => new Array(n).fill(v);
  const v = { current: { wind_speed_10m: 16, wind_gusts_10m: 20, wind_direction_10m: 45, weather_code: 1, temperature_2m: 22 },
    hourly: { time: horas, wind_speed_10m: rep(16), wind_gusts_10m: rep(20), wind_direction_10m: rep(45), weather_code: rep(1), temperature_2m: rep(22), precipitation_probability: rep(0) },
    daily: { sunrise: dias7.map(d=>d+'T07:30'), sunset: dias7.map(d=>d+'T18:40') } };
  const o = { current: { wave_height: 0.6, wave_period: 7, wave_direction: 45, sea_surface_temperature: 20 },
    hourly: { time: horas, wave_height: rep(0.6), wave_direction: rep(45), wave_period: rep(7), swell_wave_height: rep(0.4), swell_wave_period: rep(8), swell_wave_direction: rep(45) } };
  cache['playa-troya'] = { v, o, t: Date.now() };
  sp.ahora = v.current;
  return 1;
})()`);

await dormir(2500);
await c.ev(`(()=>{
  const sp = SPOTS.find(s=>s.id==='playa-troya');
  sp.ahora = { wind_speed_10m: 16, wind_gusts_10m: 20, wind_direction_10m: 45, weather_code: 1 };
  location.hash=''; pintarLista(); return 1;
})()`);
await dormir(600);
await c.ev(`(()=>{const e=document.querySelector('[data-id="playa-troya"]');if(e) e.scrollIntoView({block:'center'});return !!e})()`);
await foto("lista");

await c.ev(`(()=>{location.hash='spot=playa-troya';return 1})()`);
await dormir(1200);
await c.ev(`window.scrollTo(0,0)`);
await foto("ficha");

// Caja de avisos del día (texto de seguridad)
await c.ev(`(()=>{const e=[...document.querySelectorAll('.caja')].find(c=>c.textContent.includes('off-shore')||c.textContent.includes('tierra hacia el mar'));if(e) window.scrollTo(0,e.getBoundingClientRect().top+scrollY-130);return !!e})()`);
await foto("ficha2");

c.cerrar();
