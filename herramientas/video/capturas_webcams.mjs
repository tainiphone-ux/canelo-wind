// Capturas para el vídeo de WEBCAMS Y ANEMÓMETROS, spot El Médano, datos reales.
// node capturas.mjs <carpeta de salida>
import { abrirChrome, dormir } from "./chrome.mjs";
const OUT = process.argv[2] + "/";
const c = await abrirChrome({ puerto: 9347, perfil: "/tmp/cw-chrome-capturas6", movil: true });
const foto = async (n) => { await dormir(900); await c.foto(OUT + n + ".png"); console.log("foto", n); };

await c.ir("https://canelowind.com/", 3000);
await c.ev(`localStorage.clear(); localStorage.setItem('cw_idioma','"es"'); localStorage.setItem('cw_unidad','"kn"')`);
await c.ir("https://canelowind.com/?lang=es", 12000);

await c.ev(`(()=>{const e=document.querySelector('[data-id="el-medano"]');if(e) e.scrollIntoView({block:'center'});return !!e})()`);
await foto("lista");

await c.ev(`(()=>{location.hash='spot=el-medano';return 1})()`);
await dormir(2500);

await c.ev(`(()=>{const e=[...document.querySelectorAll('.caja.enlaces h3')].find(h=>h.textContent.includes('Anemómetros'));if(e) window.scrollTo(0,e.getBoundingClientRect().top+scrollY-130);return !!e})()`);
await foto("ficha");

await c.ev(`(()=>{const e=[...document.querySelectorAll('.caja.enlaces h3')].find(h=>h.textContent.includes('Webcams'));if(e) window.scrollTo(0,e.getBoundingClientRect().top+scrollY-130);return !!e})()`);
await foto("ficha2");

c.cerrar();
