// Viento en directo para las páginas de spots y regiones (Open-Meteo, gratis y sin clave).
// La nota usa las mismas reglas que la app (evaluar en index.html), sin olas.
(function () {
  const PUNTOS = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO"];
  const GRADOS = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SO: 225, O: 270, NO: 315 };
  const NOTAS = [["Muy malo", "#C8423B"], ["Malo", "#E8793A"], ["Regular", "#D9A520"], ["Bueno", "#5FA83A"], ["Muy bueno", "#16924F"]];
  const rumbo = (g) => PUNTOS[Math.round((g % 360) / 22.5) % 16];
  const enDir = (lista, g) => lista.some(d => Math.abs(((g - GRADOS[d]) + 540) % 360 - 180) <= 30);
  function color(kn) {
    return kn < 8 ? "#CFE3F2" : kn < 12 ? "#9FE0B5" : kn < 16 ? "#56C97A" : kn < 20 ? "#F5E063" : kn < 25 ? "#F7A840" : kn < 30 ? "#F06A4A" : kn < 35 ? "#E0457B" : "#B36BE0";
  }
  function evaluar(s, w, g, d, codigo) {
    const experto = /experto/i.test(s.nivel);
    let n = w < 8 ? 0 : w < 11 ? 1 : w < 14 ? 2 : w < 18 ? 3 : w <= (experto ? 38 : 28) ? 4 : w <= (experto ? 45 : 34) ? 3 : w <= (experto ? 50 : 40) ? 1 : 0;
    if (w >= 6 && s.peligro.length && enDir(s.peligro, d)) n = 0;
    else if (w >= 8 && !enDir(s.buenos, d)) n = Math.min(n, 1);
    if (w >= 12 && g - w >= 12) n = Math.max(0, n - 1);
    if (codigo >= 95) n = 0;
    return n;
  }
  const datosDe = (el) => ({
    lat: el.dataset.lat, lon: el.dataset.lon, tz: el.dataset.tz, nivel: el.dataset.nivel || "",
    buenos: (el.dataset.buenos || "").split(",").filter(Boolean), peligro: (el.dataset.peligro || "").split(",").filter(Boolean),
    celda: el.dataset.interior ? "land" : "sea",
  });

  // ---------- Página de un spot ----------
  const vivo = document.getElementById("vivo");
  if (vivo) {
    const s = datosDe(vivo);
    const u = `https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}&current=wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code,temperature_2m` +
      `&hourly=wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code&forecast_hours=14&wind_speed_unit=kn&timezone=${encodeURIComponent(s.tz)}&cell_selection=${s.celda}`;
    fetch(u).then(r => r.json()).then(j => {
      const c = j.current, n = evaluar(s, c.wind_speed_10m, c.wind_gusts_10m, c.wind_direction_10m, c.weather_code);
      const H = j.hourly;
      const horas = H.time.slice(1, 13).map((t, i) => {
        const k = i + 1, w = H.wind_speed_10m[k];
        return `<div class="hora" style="background:${color(w)}"><span>${t.slice(11, 16)}</span><b>${Math.round(w)}</b>${rumbo(H.wind_direction_10m[k])}</div>`;
      }).join("");
      vivo.innerHTML = `<span class="nota" style="background:${NOTAS[n][1]}">${NOTAS[n][0]}</span>
        <div class="ahora">
          <div class="dato" style="background:${color(c.wind_speed_10m)};color:#1b1b1b"><b>${Math.round(c.wind_speed_10m)} kn</b><span style="color:#333">Viento</span></div>
          <div class="dato"><b>${Math.round(c.wind_gusts_10m)} kn</b><span>Rachas</span></div>
          <div class="dato"><b>${rumbo(c.wind_direction_10m)}</b><span>Dirección (${Math.round(c.wind_direction_10m)}°)</span></div>
          <div class="dato"><b>${Math.round(c.temperature_2m)}°</b><span>Temperatura</span></div>
        </div>
        <div class="horas" aria-label="Próximas horas">${horas}</div>
        <p class="cargando" style="margin:8px 0 0">Viento en nudos según el modelo de previsión. Próximas 12 horas.</p>`;
    }).catch(() => { vivo.innerHTML = `<p class="cargando">No se ha podido cargar el viento ahora mismo.</p>`; });
  }

  // ---------- Página de una región o de todos los spots: viento de ahora en cada tarjeta ----------
  const tarjetas = [...document.querySelectorAll(".tarj[data-lat]")];
  if (tarjetas.length) {
    const grupos = [tarjetas.filter(t => !t.dataset.interior), tarjetas.filter(t => t.dataset.interior)];
    grupos.forEach((lista, k) => {
      for (let i = 0; i < lista.length; i += 80) {
        const trozo = lista.slice(i, i + 80);
        const u = `https://api.open-meteo.com/v1/forecast?latitude=${trozo.map(t => t.dataset.lat).join(",")}&longitude=${trozo.map(t => t.dataset.lon).join(",")}` +
          `&current=wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code&wind_speed_unit=kn&timezone=auto&cell_selection=${k ? "land" : "sea"}`;
        fetch(u).then(r => r.json()).then(j => {
          (Array.isArray(j) ? j : [j]).forEach((d, x) => {
            const t = trozo[x], c = d.current; if (!t || !c) return;
            const n = evaluar(datosDe(t), c.wind_speed_10m, c.wind_gusts_10m, c.wind_direction_10m, c.weather_code);
            const b = document.createElement("span"); b.className = "vivo"; b.style.background = color(c.wind_speed_10m);
            b.textContent = `${Math.round(c.wind_speed_10m)} kn ${rumbo(c.wind_direction_10m)} · ${NOTAS[n][0]}`;
            t.prepend(b);
          });
        }).catch(() => {});
      }
    });
  }
})();
