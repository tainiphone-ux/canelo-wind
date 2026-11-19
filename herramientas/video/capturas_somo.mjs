// Capturas del móvil para el vídeo de MAREAS, con el spot SOMO (Cantabria, marea de más de 3 m) y datos reales.
// node capturas_somo.mjs <carpeta de salida>
import { abrirChrome, dormir } from "./chrome.mjs";
const OUT = process.argv[2] + "/";
const c = await abrirChrome({ puerto: 9346, perfil: "/tmp/cw-chrome-capturas5", movil: true });
const foto = async (n) => { await dormir(900); await c.foto(OUT + n + ".png"); console.log("foto", n); };

await c.ir("https://canelowind.com/", 3000);
await c.ev(`localStorage.clear(); localStorage.setItem('cw_idioma','"es"'); localStorage.setItem('cw_unidad','"kn"')`);
await c.ir("https://canelowind.com/?lang=es", 12000);

// Lista: la tarjeta de Somo
await c.ev(`(()=>{const e=document.querySelector('[data-id="somo"]');if(e) e.scrollIntoView({block:'center'});return !!e})()`);
await foto("lista");

// Ficha: entra y espera a que carguen los datos reales de marea (marine API)
await c.ev(`(()=>{location.hash='spot=somo';return 1})()`);
await dormir(3000);

// Comprobar que la gráfica de mareas ya tiene la curva (no "sin datos")
const ok = await c.ev(`(()=>{const e=document.querySelector('#cajaMareas svg');return !!e})()`);
console.log("gráfica de mareas cargada:", ok);

await c.ev(`(()=>{const e=document.querySelector('#cajaMareas');if(e) window.scrollTo(0,e.getBoundingClientRect().top+scrollY-140);return 1})()`);
await foto("ficha");

c.cerrar();
