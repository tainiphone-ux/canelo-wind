// Graba un vídeo hecho con plantilla.html (canvas 1080×1920) o saca un fotograma.
// node grabar.mjs <url de plantilla.html> <salida.mp4>          → graba el vídeo entero (tarda lo que dura)
// node grabar.mjs "<url>#foto=12.5" <salida.png> foto           → un fotograma en el segundo 12,5
import { writeFileSync } from "node:fs";
import { abrirChrome, dormir } from "./chrome.mjs";

const [, , url, salida, modo = "video"] = process.argv;
const c = await abrirChrome({ puerto: 9341, perfil: process.env.PERFIL || "/tmp/cw-chrome-grabar" });
await c.cmd("Page.navigate", { url });
for (let i = 0; i < 240; i++) { await dormir(1000); if (await c.ev("!!window.__done")) break; }
if (modo === "foto") await c.foto(salida);
else { console.log("formato:", await c.ev("window.__tipo")); writeFileSync(salida, Buffer.from(await c.ev("window.__video"), "base64")); }
c.cerrar();
