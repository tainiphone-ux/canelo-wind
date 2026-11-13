// Capturas del móvil para el vídeo de la COMPRAVENTA, con anuncios de ejemplo que solo existen en la captura (no se publica nada).
// Las fotos de ejemplo son fotogramas de los vídeos de la landing (videos/*.mp4 de canelowind.com).
// node capturas_compraventa.mjs <carpeta de salida>
import { abrirChrome, dormir } from "./chrome.mjs";
const OUT = process.argv[2] + "/";
const c = await abrirChrome({ puerto: 9343, perfil: "/tmp/cw-chrome-capturas2", movil: true });
const pos = async (sel) => c.ev(`(()=>{const r=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return [Math.round(r.x+r.width/2),Math.round(r.y+r.height/2)]})()`);
const foto = async (n) => { await dormir(1000); await c.foto(OUT + n + ".png"); console.log("foto", n); };

await c.ir("https://canelowind.com/", 3000);
await c.ev(`localStorage.clear(); sessionStorage.clear(); localStorage.setItem('cw_idioma','"es"'); localStorage.setItem('cw_unidad','"kn"')`);
await c.ir("https://canelowind.com/?lang=es", 12000);
console.log("toque compraventa", await pos("#irCompraventa"));
await foto("lista");

// Fotos de ejemplo: un fotograma de cada vídeo, recortado en cuadrado
await c.ev(`(async()=>{window.__F=await Promise.all([['ola.mp4',4],['saltos.mp4',3],['kite.mp4',4],['windsurf.mp4',4]].map(async([v,s])=>{
  const vid=document.createElement('video');vid.muted=true;vid.preload='auto';vid.src='/videos/'+v;
  await new Promise(r=>{vid.onloadeddata=r;vid.onerror=r});vid.currentTime=Math.min(s,(vid.duration||8)*0.5);await new Promise(r=>{vid.onseeked=r;setTimeout(r,4000)});
  const w=vid.videoWidth,h=vid.videoHeight,l=Math.min(w,h),cv=document.createElement('canvas');cv.width=cv.height=700;
  cv.getContext('2d').drawImage(vid,(w-l)/2,(h-l)/2,l,l,0,0,700,700);return cv.toDataURL('image/jpeg',0.82)}));return __F.length})()`);
const ahora = Date.now();
await c.ev(`(()=>{const d=h=>new Date(${ahora}-h*3600e3).toISOString();
  window.__L=[
   {id:'a1',titulo:'Ala de wing 5 m Duotone',precio:'450',negociable:'si',categoria:'Wing y foil',estado:'Buen estado',isla:'Tenerife',zona:'El Médano',descripcion:'Usada una temporada, sin reparaciones. Incluye bolsa y bomba.',nombre:'Miki',instagram:'canelowind',whatsapp:'',foto1:'f0',foto2:'f1',foto3:'',publicado:d(3),renovado:d(3),situacion:'activo'},
   {id:'a2',titulo:'Tabla de foil 85 L + foil 1100',precio:'900',negociable:'',categoria:'Wing y foil',estado:'Como nuevo',isla:'Gran Canaria',zona:'Pozo Izquierdo',descripcion:'',nombre:'Dani',instagram:'',whatsapp:'34600000000',foto1:'f1',foto2:'',foto3:'',publicado:d(30),renovado:d(30),situacion:'activo'},
   {id:'a3',titulo:'Cometa 9 m con barra',precio:'380',negociable:'si',categoria:'Kitesurf',estado:'Usado',isla:'Fuerteventura',zona:'Sotavento',descripcion:'',nombre:'Laura',instagram:'',whatsapp:'34600000000',foto1:'f2',foto2:'',foto3:'',publicado:d(54),renovado:d(54),situacion:'activo'},
   {id:'a4',titulo:'Vela 5.3 con mástil y botavara',precio:'250',negociable:'',categoria:'Windsurf',estado:'Buen estado',isla:'Cádiz',zona:'Tarifa',descripcion:'',nombre:'Jorge',instagram:'',whatsapp:'34600000000',foto1:'f3',foto2:'',foto3:'',publicado:d(80),renovado:d(80),situacion:'activo'}];
  anunciosCache={t:Date.now()+1e8,lista:__L};location.hash='compraventa';return 1})()`);
await dormir(2500);
const ponerFotos = `(()=>{document.querySelectorAll('.anuncio .foto').forEach((e,i)=>{e.style.backgroundImage='url('+__F[i]+')'});return 1})()`;
await c.ev(ponerFotos);
await foto("cv_lista");
await c.ev(`(()=>{const e=document.querySelector('#chipsV');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70);return 1})()`);
await c.ev(ponerFotos);
console.log("toque anuncio", await pos(".anuncio"));
await foto("cv_cartas");

// Ficha de un anuncio (vista del comprador)
await c.ev(`(()=>{abrirAnuncio(__L[0]);document.querySelector('#fotoG').src=__F[0];document.querySelectorAll('.miniaturas img').forEach((m,i)=>m.src=__F[i]);return 1})()`);
console.log("toque instagram", await pos(".fondo a.btn"));
await foto("cv_anuncio");

// Formulario relleno (no se envía)
await c.ev(`(()=>{document.querySelector('.fondo').remove();window.scrollTo(0,0);abrirFormAnuncio();const F=document.querySelector('#fV');
  document.querySelector('#fotosV').innerHTML='<span class="f" style="background-image:url('+__F[0]+')"><button>✕</button></span><span class="f" style="background-image:url('+__F[1]+')"><button>✕</button></span><button class="mas">📷</button>';
  F.querySelector('[name=titulo]').value='Ala de wing 5 m Duotone';F.querySelector('[name=precio]').value='450';F.querySelector('[name=negociable]').checked=true;
  F.querySelector('[name=isla]').value='Tenerife';F.querySelector('[name=zona]').value='El Médano';F.querySelector('[name=descripcion]').value='Usada una temporada, sin reparaciones. Incluye bolsa y bomba.';
  F.querySelector('[name=nombre]').value='Miki';F.querySelector('[name=instagram]').value='canelowind';return 1})()`);
await foto("cv_form1");
await c.ev(`(()=>{const f=document.querySelector('.fondo');f.scrollTop=f.scrollHeight;return 1})()`);
console.log("toque publicar", await pos("#publicarV"));
await foto("cv_form2");
await c.ev(`(()=>{const f=document.querySelector('.fondo');f.querySelector('#fV').remove();f.querySelector('#msgFV').innerHTML='<div class="msg">'+t('cv_ok')+'</div>';f.scrollTop=0;return 1})()`);
await foto("cv_ok");

// Aviso de los 30 días
await c.ev(`(()=>{document.querySelector('.fondo').remove();guardar('misAnuncios',[{id:'a2',secreto:'x',titulo:'x'}]);sessionStorage.removeItem('cw_aviso_v');const v=new Date(Date.now()-31*864e5).toISOString();revisarMisAnuncios(__L.map(x=>x.id==='a2'?{...x,publicado:v,renovado:v}:x));return 1})()`);
await foto("cv_aviso");
c.cerrar();
