// Genera las páginas que lee Google a partir de spots.js y consejos.js:
//   spot/<id>/index.html    una por spot
//   zona/<región>/index.html una por región
//   spots/index.html        todos los spots
//   sitemap.xml y robots.txt
// Uso (desde la carpeta Canelo Wind):  node herramientas/generar_paginas.mjs
// Hay que volver a ejecutarlo cada vez que se añade o cambia un spot.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEB = "https://canelowind.com";
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), "utf8");
const { SPOTS, CONSEJOS } = new Function(leer("spots.js") + "\n" + leer("consejos.js") + "\nreturn { SPOTS, CONSEJOS };")();

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const regionDe = (s) => s.region || "Canarias";
const tzDe = (s) => regionDe(s) === "Canarias" ? "Atlantic/Canary" : "Europe/Madrid";
const corto = (s) => s.replace(/\s*\(.*\)$/, "");
const DEP = { windsurf: "🏄 Windsurf", kite: "🪁 Kitesurf", wing: "🪽 Wing foil" };
const PUNTO = { N: "norte", NE: "nordeste", E: "este", SE: "sudeste", S: "sur", SO: "suroeste", O: "oeste", NO: "noroeste" };
const hoy = new Date().toISOString().slice(0, 10);
function km(a, b) {
  const R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
const datosVivo = (s) => `data-lat="${s.lat}" data-lon="${s.lon}" data-tz="${tzDe(s)}" data-nivel="${esc(s.nivel)}" data-buenos="${s.buenos.join(",")}" data-peligro="${(CONSEJOS[s.id]?.peligro || []).join(",")}"${s.interior ? ' data-interior="1"' : ""}`;
const tarjeta = (s) => `<a class="tarj" href="/spot/${s.id}/" ${datosVivo(s)}><b>${esc(s.nombre)}</b><small>${esc(s.zona)} · ${esc(s.isla)} · ${s.deportes.map(d => DEP[d].split(" ")[0]).join(" ")}</small></a>`;

function pagina({ titulo, descripcion, url, cuerpo, jsonld = [] }) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Canelo Wind">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${WEB}/icono-512.png">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/logo.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icono-iphone.png">
<meta name="theme-color" content="#9A4416">
<link rel="stylesheet" href="/seo.css">
<script src="/visitas.js"></script>
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body>
<header class="barra"><div class="envoltura"><a class="marca" href="/landing.html"><img src="/logo.svg" alt="">Canelo Wind</a><a class="abrir" href="/">Abrir la app</a></div></header>
<main class="envoltura">
${cuerpo}
</main>
<footer>Previsión: Open-Meteo. Comprueba siempre el viento medido y el estado del mar antes de salir.<br>
<a href="/">App Canelo Wind</a> · <a href="/spots/">Todos los spots</a> · <a href="/instalar.html">Instalar en el móvil</a> · <a href="https://www.instagram.com/canelowindapp/" rel="noopener">Instagram</a></footer>
<script src="/seo.js"></script>
</body>
</html>
`;
}
function escribir(rel, html) {
  const f = path.join(RAIZ, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}

// Borrar las páginas generadas antes (por si se ha quitado algún spot)
for (const d of ["spot", "zona", "spots"]) fs.rmSync(path.join(RAIZ, d), { recursive: true, force: true });

const regiones = [...new Set(SPOTS.map(regionDe))];
const urls = [`${WEB}/`, `${WEB}/landing.html`, `${WEB}/instalar.html`, `${WEB}/spots/`];

// ---------- Una página por spot ----------
for (const s of SPOTS) {
  const c = CONSEJOS[s.id] || { consejos: [], seguridad: "" };
  const region = regionDe(s), rslug = slug(region);
  const url = `${WEB}/spot/${s.id}/`;
  const nombre = corto(s.nombre);
  const titulo = `Viento en ${nombre} hoy · Previsión windsurf, kite y wing | Canelo Wind`;
  const descripcion = `${s.nota} Viento, rachas${s.interior ? "" : ", olas y mareas"} hora a hora en ${nombre} (${s.isla}) con nota de si merece la pena ir.`.slice(0, 300);
  const cerca = SPOTS.filter(x => x.id !== s.id).map(x => ({ x, d: km(s, x) })).sort((a, b) => a.d - b.d).slice(0, 6);
  const enlaces = [...s.anemometros.map(l => ["📡", l]), ...s.webcams.map(l => ["🎥", l])];
  const cuerpo = `<nav class="miga"><a href="/spots/">Spots</a> › <a href="/zona/${rslug}/">${esc(region)}</a> › ${esc(s.isla)} › ${esc(nombre)}</nav>
<h1>Viento en ${esc(nombre)} hoy</h1>
<p class="sub">${esc(s.zona)} · ${esc(s.isla)}${region !== "Canarias" && region !== s.isla ? " · " + esc(region) : ""}${s.interior ? " · embalse de interior" : ""}</p>
<div class="etqs">${s.deportes.map(d => `<span class="etq">${DEP[d]}</span>`).join("")}<span class="etq">Nivel: ${esc(s.nivel)}</span><span class="etq">Mejor viento: ${s.buenos.map(b => PUNTO[b] || b).join(", ")}</span></div>
<section class="caja"><h2>🌬️ Ahora mismo en ${esc(nombre)}</h2><div id="vivo" ${datosVivo(s)}><p class="cargando">Cargando el viento de ahora…</p></div></section>
<a class="boton" href="/#spot=${s.id}">📲 Ver la previsión completa de 7 días${s.interior ? "" : ", olas y mareas"}</a>
<section class="caja"><h2>Sobre ${esc(nombre)}</h2><p style="margin:0">${esc(s.nota)}</p></section>
${c.seguridad ? `<div class="seguridad"><b>⚠️ Aviso de seguridad</b>${esc(c.seguridad)}</div>` : ""}
${c.consejos.length ? `<section class="caja"><h2>💡 Consejos para ${esc(nombre)}</h2><ul class="lista">${c.consejos.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
${enlaces.length ? `<section class="caja enlaces"><h2>Anemómetros y webcams</h2>${enlaces.map(([i, l]) => `<a href="${esc(l.url)}" rel="noopener" target="_blank">${i} ${esc(l.nombre)}</a>`).join("")}</section>` : ""}
<section><h2 class="grupo">Spots cerca de ${esc(nombre)}</h2><div class="rejilla">${cerca.map(({ x, d }) => tarjeta(x).replace("</small></a>", ` · a ${Math.round(d)} km</small></a>`)).join("")}</div></section>
<a class="boton" href="/#spot=${s.id}">🪁 Abrir ${esc(nombre)} en Canelo Wind</a>`;
  const jsonld = [
    { "@context": "https://schema.org", "@type": "SportsActivityLocation", name: s.nombre, description: s.nota, url,
      geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lon },
      address: { "@type": "PostalAddress", addressLocality: s.zona, addressRegion: s.isla, addressCountry: "ES" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Spots", item: `${WEB}/spots/` },
      { "@type": "ListItem", position: 2, name: region, item: `${WEB}/zona/${rslug}/` },
      { "@type": "ListItem", position: 3, name: s.nombre, item: url } ] },
  ];
  escribir(`spot/${s.id}/index.html`, pagina({ titulo, descripcion, url, cuerpo, jsonld }));
  urls.push(url);
}

// ---------- Una página por región ----------
for (const r of regiones) {
  const lista = SPOTS.filter(s => regionDe(s) === r), rslug = slug(r), url = `${WEB}/zona/${rslug}/`;
  const islas = [...new Set(lista.map(s => s.isla))];
  const titulo = `Spots de windsurf, kite y wing en ${r} · Viento hoy | Canelo Wind`;
  const descripcion = `Viento de ahora y previsión de ${lista.length} spots de windsurf, kitesurf y wing foil en ${r}: ${lista.slice(0, 6).map(s => corto(s.nombre)).join(", ")}…`;
  const cuerpo = `<nav class="miga"><a href="/spots/">Spots</a> › ${esc(r)}</nav>
<h1>Spots de windsurf, kite y wing en ${esc(r)}</h1>
<p class="sub">${lista.length} spots con el viento de ahora y su nota. Toca uno para ver su previsión.</p>
${islas.map(i => `<h2 class="grupo">${esc(i)}</h2><div class="rejilla">${lista.filter(s => s.isla === i).map(tarjeta).join("")}</div>`).join("\n")}
<a class="boton" href="/">📲 Abrir Canelo Wind</a>
<p class="sub">Otras regiones: ${regiones.filter(x => x !== r).map(x => `<a href="/zona/${slug(x)}/">${esc(x)}</a>`).join(" · ")}</p>`;
  escribir(`zona/${rslug}/index.html`, pagina({ titulo, descripcion, url, cuerpo }));
  urls.push(url);
}

// ---------- Todos los spots ----------
{
  const url = `${WEB}/spots/`;
  const titulo = `Todos los spots de windsurf, kite y wing de España · Viento hoy | Canelo Wind`;
  const descripcion = `${SPOTS.length} spots de windsurf, kitesurf y wing foil en Canarias y el resto de España con el viento de ahora, previsión, olas y mareas.`;
  const cuerpo = `<h1>Spots de windsurf, kite y wing en España</h1>
<p class="sub">${SPOTS.length} spots en ${regiones.length} regiones, con el viento de ahora y su nota.</p>
${regiones.map(r => `<h2 class="grupo"><a href="/zona/${slug(r)}/">${esc(r)}</a></h2><div class="rejilla">${SPOTS.filter(s => regionDe(s) === r).map(tarjeta).join("")}</div>`).join("\n")}
<a class="boton" href="/">📲 Abrir Canelo Wind</a>`;
  escribir("spots/index.html", pagina({ titulo, descripcion, url, cuerpo }));
}

// ---------- Mapa del sitio y robots.txt ----------
escribir("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${hoy}</lastmod></url>`).join("\n")}
</urlset>
`);
escribir("robots.txt", `User-agent: *\nAllow: /\nDisallow: /herramientas/\nDisallow: /redes/\n\nSitemap: ${WEB}/sitemap.xml\n`);

console.log(`Generadas ${SPOTS.length} páginas de spots, ${regiones.length} de regiones, 1 de todos los spots y sitemap con ${urls.length} direcciones.`);
