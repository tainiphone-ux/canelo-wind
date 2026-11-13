// Capturas del móvil para el vídeo de «CREA TU PROPIO SPOT» (spots privados, solo locales, no se publica nada).
// node capturas_mispot.mjs <carpeta de salida>
import { abrirChrome, dormir } from "./chrome.mjs";
const OUT = process.argv[2] + "/";
const c = await abrirChrome({ puerto: 9344, perfil: "/tmp/cw-chrome-capturas3", movil: true });
const pos = async (sel) => c.ev(`(()=>{const r=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return [Math.round(r.x+r.width/2),Math.round(r.y+r.height/2)]})()`);
const foto = async (n) => { await dormir(1000); await c.foto(OUT + n + ".png"); console.log("foto", n); };

await c.ir("https://canelowind.com/", 3000);
await c.ev(`localStorage.clear(); sessionStorage.clear(); localStorage.setItem('cw_idioma','"es"'); localStorage.setItem('cw_unidad','"kn"')`);
await c.ir("https://canelowind.com/?lang=es", 12000);
console.log("toque atajo mi spot", await pos("#atajoMio"));
await foto("lista");

// Abrir el formulario y marcar un sitio en el mapa (una cala imaginaria)
await c.ev(`(()=>{abrirFormMiSpot(); return 1})()`);
await dormir(2600); // carga del mapa Leaflet
await foto("form_mapa");
console.log("toque estoy aqui", await pos("#aquiMio"));

// Simulamos marcar un punto en el mapa (sin GPS real) con un click en el centro del mapa
await c.ev(`(()=>{const r=document.querySelector('#mapaMio').getBoundingClientRect();window.__click={x:r.x+r.width/2,y:r.y+r.height/2};return 1})()`);
console.log("centro del mapa", await c.ev("window.__click"));
await foto("form_mapa2");

// Rellenamos el resto como si ya se hubiera marcado el sitio
await c.ev(`(()=>{const F=document.querySelector('#fMio');F.querySelector('[name=nombre]').value='Mi playa secreta';
 const c1=F.querySelector('[name=dep][value=wing]');c1.checked=true;c1.onchange();
 document.querySelector('#estadoMapa').textContent='Sitio marcado ✓ (28.045, -16.528)';
 document.querySelectorAll('.rosa [data-dir]').forEach(b=>{if(b.dataset.dir==='NE'||b.dataset.dir==='N'){b.classList.add('on')}});
 F.querySelector('[name=nota]').value='Se entra por las rocas de la izquierda. Nadie más la conoce.';return 1})()`);
await foto("form_lleno");
console.log("toque guardar", await pos("#guardarMio"));

// Ficha del spot ya creado, con «Solo lo ves tú» y los botones editar/borrar
await c.ev(`(()=>{document.querySelector('.fondo').remove();
 const s=anadirMiSpot({nombre:'Mi playa secreta',lat:28.045,lon:-16.528,deportes:['wing'],buenos:['NE','N'],nivel:'Todos los niveles',nota:'Se entra por las rocas de la izquierda. Nadie más la conoce.',interior:false});
 location.hash='spot='+s.id; return 1})()`);
await dormir(7000);
await c.ev(`window.scrollTo(0,0)`);
await foto("ficha");
console.log("toque pasar amigo", await pos("#compartirSpot"));

// Volver a la lista: se ve en «Mis spots» con el candado y el botón de borrar
await c.ev(`(()=>{location.hash='';return 1})()`);
await dormir(2500);
await c.ev(`(()=>{const e=document.querySelector('#crearMio');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-80);return 1})()`);
await foto("lista_mio");
console.log("toque borrar", await pos("[data-borrar]"));

c.cerrar();
