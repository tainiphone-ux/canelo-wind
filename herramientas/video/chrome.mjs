// Chrome sin ventana controlado por CDP (para capturas de la app y para grabar los vídeos).
// Uso: const c = await abrirChrome({ puerto, perfil, movil: true }); await c.ir(url); await c.foto("a.png"); c.cerrar();
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

export async function abrirChrome({ puerto = 9340, perfil, movil = false, ancho = 1080, alto = 1920 } = {}) {
  const ch = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${puerto}`, `--user-data-dir=${perfil}`, "--hide-scrollbars",
    "--allow-file-access-from-files", "--autoplay-policy=no-user-gesture-required", "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding", "about:blank"], { stdio: "ignore" });
  let ws;
  for (let i = 0; i < 60 && !ws; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${puerto}/json`)).json(); const p = l.find((x) => x.type === "page"); if (p) ws = p.webSocketDebuggerUrl; } catch {}
    if (!ws) await dormir(250);
  }
  const so = new WebSocket(ws); await new Promise((r) => (so.onopen = r));
  let id = 0; const pend = {};
  so.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m.result || m); delete pend[m.id]; } };
  const cmd = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; so.send(JSON.stringify({ id: i, method, params })); });
  if (movil) {
    await cmd("Emulation.setDeviceMetricsOverride", { width: 430, height: 932, deviceScaleFactor: 3, mobile: true });
    await cmd("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" });
  } else {
    await cmd("Emulation.setDeviceMetricsOverride", { width: ancho, height: alto, deviceScaleFactor: 1, mobile: false });
  }
  await cmd("Page.enable");
  const ev = async (expr) => { const r = await cmd("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }); return r.result ? r.result.value : r; };
  return {
    cmd, ev,
    ir: async (url, espera = 4000) => { await cmd("Page.navigate", { url }); await dormir(espera); },
    foto: async (archivo) => { const r = await cmd("Page.captureScreenshot", { format: "png" }); writeFileSync(archivo, Buffer.from(r.data, "base64")); },
    cerrar: () => { try { so.close(); } catch {} ch.kill(); },
  };
}
