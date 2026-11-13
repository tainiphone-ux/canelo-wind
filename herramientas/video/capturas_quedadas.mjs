// Capturas del móvil para el vídeo de las QUEDADAS (con quedadas de ejemplo que solo existen en la captura: no se publica nada).
// node capturas_quedadas.mjs <carpeta de salida>
import { abrirChrome, dormir } from "./chrome.mjs";
const OUT = process.argv[2] + "/";
const c = await abrirChrome({ puerto: 9342, perfil: "/tmp/cw-chrome-capturas", movil: true });
const pos = async (sel) => c.ev(`(()=>{const r=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return [Math.round(r.x+r.width/2),Math.round(r.y+r.height/2)]})()`);
const foto = async (n) => { await dormir(900); await c.foto(OUT + n + ".png"); console.log("foto", n); };

await c.ir("https://canelowind.com/", 3000);
await c.ev(`localStorage.clear(); localStorage.setItem('cw_idioma','"es"'); localStorage.setItem('cw_unidad','"kn"')`);
await c.ir("https://canelowind.com/?lang=es", 12000);
console.log("toque quedadas", await pos("#irQuedadas"));
await foto("lista");

// Quedadas de ejemplo
await c.ev(`(()=>{const hoy=hoyISO('Atlantic/Canary');const d=n=>{const x=new Date(hoy+'T12:00');x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
 const filas=[["Downwind foil",d(2),"15:00","el-cabezo","la-tejita","Parking de El Cabezo","Avanzado","wing 5 m / foil 1100","Salimos con el alisio de la tarde. Hay coche para volver.","Miki","canelowind"],
  ["Sesión en el spot",d(3),"11:00","el-medano","","Playa central","Todos los niveles","windsurf y wing","Sesión tranquila con alisio suave.","Valentín",""],
  ["Para aprender",d(4),"10:30","la-tejita","","Junto a la escuela","Todos los niveles","wing 4-5 m","Iniciación al wing foil con agua plana.","Laura",""],
  ["Downwind foil",d(6),"14:00","pozo-izquierdo","arinaga","Parking de Pozo","Avanzado","wing / downwind board","Downwind largo con alisio fuerte.","Dani",""]];
 const csv='"Marca temporal","Tipo","Fecha","Hora","Salida","Llegada","Encuentro","Nivel","Material","Detalles","Nombre","Instagram"\\n'+filas.map(f=>['x',...f].map(v=>'"'+v+'"').join(',')).join('\\n');
 CONFIG.quedadas.csv='data:text/csv;charset=utf-8,'+encodeURIComponent(csv); quedadasCache=null; location.hash='quedadas'; return 1})()`);
await dormir(3000);
await foto("q_lista");
await c.ev(`(()=>{const e=document.querySelector('#listaQ');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70);return 1})()`);
console.log("toque compartir", await pos("[data-qi='0']"));
await foto("q_cartas");

// Formulario relleno (no se envía)
await c.ev(`(()=>{window.scrollTo(0,0);abrirFormQuedada('el-cabezo');const F=document.querySelector('#fQ');const hoy=hoyISO('Atlantic/Canary');const x=new Date(hoy+'T12:00');x.setDate(x.getDate()+2);
 F.querySelector('[name=fecha]').value=x.toISOString().slice(0,10);F.querySelector('[name=hora]').value='15:00';F.querySelector('[name=llegada]').value='la-tejita';
 F.querySelector('[name=encuentro]').value='Parking de El Cabezo';F.querySelector('[name=nivel]').selectedIndex=2;F.querySelector('[name=material]').value='wing 5 m / foil 1100';
 F.querySelector('[name=detalles]').value='Salimos con el alisio de la tarde. Hay coche para volver.';F.querySelector('[name=nombre]').value='Miki';F.querySelector('[name=instagram]').value='canelowind';return 1})()`);
await foto("q_form1");
await c.ev(`(()=>{const f=document.querySelector('.fondo');f.scrollTop=f.scrollHeight;return 1})()`);
console.log("toque publicar", await pos("#enviarQ"));
await foto("q_form2");
await c.ev(`(()=>{const f=document.querySelector('.fondo');f.querySelector('.form').remove();f.querySelector('#msgQ').innerHTML='<div class="msg">'+t('q_ok')+'</div>';f.scrollTop=0;return 1})()`);
await foto("q_ok");

// Caja «Quedadas en este spot»
await c.ev(`(()=>{document.querySelector('.fondo').remove();location.hash='spot=el-cabezo';return 1})()`);
await dormir(7000);
await c.ev(`(()=>{const e=document.querySelector('#cajaQuedadas');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-80);return 1})()`);
await foto("q_spot");
c.cerrar();
