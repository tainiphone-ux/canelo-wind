// Lista de spots. Para añadir uno nuevo, copia un bloque y cambia los datos.
// lat/lon: punto en el agua, frente a la playa.
// buenos: direcciones de viento que funcionan bien en el spot (N, NE, E, SE, S, SO, O, NO).
// enlaces: anemómetros (viento medido ahora) y webcams.

const ESTACIONES = {
  // Estaciones oficiales de AEMET y aeropuertos (viento medido de verdad)
  tfs:  { nombre: "AEMET · Aeropuerto Tenerife Sur", url: "https://www.aemet.es/es/eltiempo/observacion/ultimosdatos?k=can&l=C429I&datos=det" },
  gcl:  { nombre: "AEMET · Aeropuerto de Gran Canaria", url: "https://www.aemet.es/es/eltiempo/observacion/ultimosdatos?k=can&l=C649I&datos=det" },
  fue:  { nombre: "AEMET · Aeropuerto de Fuerteventura", url: "https://www.aemet.es/es/eltiempo/observacion/ultimosdatos?k=can&l=C249I&datos=det" },
  lzt:  { nombre: "AEMET · Aeropuerto de Lanzarote", url: "https://www.aemet.es/es/eltiempo/observacion/ultimosdatos?k=can&l=C029O&datos=det" },
};

const SPOTS = [
  // ---------- TENERIFE ----------
  {
    id: "el-medano", nombre: "El Médano (playa)", isla: "Tenerife", zona: "Granadilla",
    lat: 28.041, lon: -16.535, deportes: ["windsurf", "kite", "wing"],
    buenos: ["NE", "E", "N"], nivel: "Todos los niveles",
    nota: "El spot más conocido de Tenerife. Alisio del NE casi todo el año, agua bastante plana dentro de la bahía.",
    anemometros: [
      { nombre: "Windfinder · El Médano", url: "https://www.windfinder.com/report/el_medano" },
      ESTACIONES.tfs,
    ],
    webcams: [
      { nombre: "Skyline · Surf y kite El Médano", url: "https://www.skylinewebcams.com/es/webcam/espana/canarias/santa-cruz-de-tenerife/surf-kitesurf-medano.html" },
      { nombre: "Skyline · Playa de El Médano", url: "https://www.skylinewebcams.com/es/webcam/espana/canarias/santa-cruz-de-tenerife/playa-de-el-medano.html" },
      { nombre: "Windfinder · webcams El Médano", url: "https://www.windfinder.com/webcams/el_medano" },
    ],
  },
  {
    id: "el-cabezo", nombre: "El Cabezo", isla: "Tenerife", zona: "El Médano",
    lat: 28.052, lon: -16.522, deportes: ["windsurf", "wing"],
    buenos: ["NE", "E", "N"], nivel: "Avanzado (olas)",
    nota: "Spot de olas y viento fuerte, sede del PWA. Fondo de roca: cuidado con la marea baja.",
    anemometros: [
      { nombre: "Windfinder · El Médano", url: "https://www.windfinder.com/report/el_medano" },
      ESTACIONES.tfs,
    ],
    webcams: [
      { nombre: "Windfinder · webcams El Médano / El Cabezo", url: "https://www.windfinder.com/webcams/el_medano" },
    ],
  },
  {
    id: "la-tejita", nombre: "La Tejita", isla: "Tenerife", zona: "Granadilla",
    lat: 28.030, lon: -16.553, deportes: ["kite", "wing"],
    buenos: ["NE", "E"], nivel: "Intermedio",
    nota: "Playa larga al otro lado de Montaña Roja. Zona de kite (respeta las zonas de baño).",
    anemometros: [ESTACIONES.tfs],
    webcams: [
      { nombre: "Skyline · El Médano - La Tejita", url: "https://www.skylinewebcams.com/es/webcam/espana/canarias/santa-cruz-de-tenerife/el-medano-playa-la-tejita.html" },
    ],
  },

  // ---------- GRAN CANARIA ----------
  {
    id: "pozo-izquierdo", nombre: "Pozo Izquierdo", isla: "Gran Canaria", zona: "Santa Lucía de Tirajana",
    lat: 27.817, lon: -15.418, deportes: ["windsurf", "wing"],
    buenos: ["NE", "N", "E"], nivel: "Experto",
    nota: "Uno de los spots más ventosos del mundo (PWA). En verano el viento puede pasar de 35-40 nudos.",
    anemometros: [
      { nombre: "Windfinder · Pozo Izquierdo", url: "https://www.windfinder.com/forecast/gran_canaria_pozo_izquierdo" },
      ESTACIONES.gcl,
    ],
    webcams: [
      { nombre: "in2theBeach · Pozo Izquierdo", url: "https://en.in2thebeach.es/webcam/70/pozo-izquierdo" },
      { nombre: "in2theBeach · Bahía de Pozo", url: "https://en.in2thebeach.es/webcam/14/bahia-de-pozo-izquierdo" },
      { nombre: "Surf-Forecast · webcams Pozo", url: "https://www.surf-forecast.com/breaks/Pozo-Izquierdo/webcams/latest" },
    ],
  },
  {
    id: "vargas", nombre: "Vargas", isla: "Gran Canaria", zona: "Agüimes",
    lat: 27.896, lon: -15.385, deportes: ["windsurf", "wing", "kite"],
    buenos: ["NE", "N"], nivel: "Intermedio / avanzado",
    nota: "Alternativa a Pozo cuando allí sopla demasiado. Olas pequeñas y viento algo menor.",
    anemometros: [
      { nombre: "Windfinder · Vargas", url: "https://www.windfinder.com/report/vargas" },
      ESTACIONES.gcl,
    ],
    webcams: [
      { nombre: "Windfinder · webcams Vargas", url: "https://www.windfinder.com/webcams/vargas" },
    ],
  },
  {
    id: "arinaga", nombre: "Arinaga", isla: "Gran Canaria", zona: "Agüimes",
    lat: 27.858, lon: -15.388, deportes: ["windsurf", "kite", "wing"],
    buenos: ["NE", "N"], nivel: "Intermedio",
    nota: "Bahía con agua más plana, buena para kite y wing.",
    anemometros: [ESTACIONES.gcl],
    webcams: [
      { nombre: "Windfinder · webcams Gran Canaria", url: "https://www.windfinder.com/webcams/gando_gran_canaria" },
    ],
  },
  {
    id: "bahia-feliz", nombre: "Bahía Feliz / Playa del Águila", isla: "Gran Canaria", zona: "San Bartolomé de Tirajana",
    lat: 27.783, lon: -15.513, deportes: ["windsurf", "wing"],
    buenos: ["NE", "E", "N"], nivel: "Todos los niveles",
    nota: "Escuelas de windsurf, agua plana con viento constante. Sede de pruebas de slalom.",
    anemometros: [
      { nombre: "Windfinder · Bahía Feliz", url: "https://www.windfinder.com/forecast/gran_canaria_bahia_feliz_aguila_playa" },
      ESTACIONES.gcl,
    ],
    webcams: [
      { nombre: "in2theBeach · Águila Playa", url: "https://en.in2thebeach.es/webcam/92/aguila-playa" },
    ],
  },

  // ---------- FUERTEVENTURA ----------
  {
    id: "sotavento", nombre: "Sotavento (laguna)", isla: "Fuerteventura", zona: "Pájara",
    lat: 28.130, lon: -14.205, deportes: ["windsurf", "kite", "wing"],
    buenos: ["NE", "N", "E"], nivel: "Todos los niveles",
    nota: "Laguna enorme que se llena con la marea alta. Sede del Mundial de windsurf, kite y wing.",
    anemometros: [
      { nombre: "Windfinder · Sotavento", url: "https://www.windfinder.com/report/sotavento" },
      ESTACIONES.fue,
    ],
    webcams: [
      { nombre: "Windfinder · webcams Sotavento", url: "https://www.windfinder.com/webcams/sotavento" },
    ],
  },
  {
    id: "risco-del-paso", nombre: "Risco del Paso", isla: "Fuerteventura", zona: "Pájara",
    lat: 28.103, lon: -14.243, deportes: ["windsurf", "kite", "wing"],
    buenos: ["NE", "N"], nivel: "Intermedio / avanzado",
    nota: "Al sur de la laguna de Sotavento, viento muy acelerado en verano.",
    anemometros: [
      { nombre: "Windfinder · Sotavento", url: "https://www.windfinder.com/report/sotavento" },
      ESTACIONES.fue,
    ],
    webcams: [
      { nombre: "Windfinder · webcams Sotavento", url: "https://www.windfinder.com/webcams/sotavento" },
    ],
  },
  {
    id: "matas-blancas", nombre: "Matas Blancas", isla: "Fuerteventura", zona: "Pájara",
    lat: 28.175, lon: -14.160, deportes: ["kite", "wing", "windsurf"],
    buenos: ["NE", "N"], nivel: "Intermedio",
    nota: "Viento acelerado y racheado, agua plana. Muy usado por kiters.",
    anemometros: [
      { nombre: "Windfinder · Sotavento", url: "https://www.windfinder.com/report/sotavento" },
      ESTACIONES.fue,
    ],
    webcams: [],
  },
  {
    id: "flag-beach", nombre: "Flag Beach (Corralejo)", isla: "Fuerteventura", zona: "La Oliva",
    lat: 28.715, lon: -13.830, deportes: ["kite", "windsurf", "wing"],
    buenos: ["NE", "N", "E"], nivel: "Intermedio",
    nota: "Playa larga junto a las dunas de Corralejo. Viento side-on con el alisio.",
    anemometros: [ESTACIONES.fue],
    webcams: [
      { nombre: "Windfinder · webcams Flag Beach", url: "https://www.windfinder.com/webcams/flag_beach" },
      { nombre: "Skyline · Grandes Playas Corralejo", url: "https://www.skylinewebcams.com/es/webcam/espana/canarias/corralejo/grandes-playas-corralejo.html" },
    ],
  },
  {
    id: "el-cotillo", nombre: "El Cotillo", isla: "Fuerteventura", zona: "La Oliva",
    lat: 28.690, lon: -14.016, deportes: ["kite", "windsurf"],
    buenos: ["NE", "N", "E"], nivel: "Avanzado (olas)",
    nota: "Costa oeste, olas y viento side-off con el NE. Solo para gente con experiencia.",
    anemometros: [
      { nombre: "Windfinder · El Cotillo", url: "https://www.windfinder.com/report/fuerteventura_el_cotillo" },
      ESTACIONES.fue,
    ],
    webcams: [
      { nombre: "El Cotillo · Piedra Playa", url: "https://www.fuerteventuraplayas.com/en/?p=2310" },
      { nombre: "Windfinder · webcams El Cotillo", url: "https://www.windfinder.com/webcams/fuerteventura_el_cotillo" },
    ],
  },

  // ---------- LANZAROTE ----------
  {
    id: "famara", nombre: "Famara", isla: "Lanzarote", zona: "Teguise",
    lat: 29.115, lon: -13.560, deportes: ["kite", "windsurf", "wing"],
    buenos: ["NE", "N"], nivel: "Intermedio / avanzado",
    nota: "Playa de 6 km bajo el risco de Famara. Olas y corrientes: bandera roja permanente para el baño.",
    anemometros: [
      { nombre: "Windfinder · Famara", url: "https://www.windfinder.com/forecast/lanzarote_famara" },
      ESTACIONES.lzt,
    ],
    webcams: [
      { nombre: "Windfinder · webcams Famara", url: "https://www.windfinder.com/webcams/famara" },
    ],
  },
  {
    id: "costa-teguise", nombre: "Costa Teguise (Las Cucharas)", isla: "Lanzarote", zona: "Teguise",
    lat: 28.996, lon: -13.488, deportes: ["windsurf", "kite", "wing"],
    buenos: ["NE", "N", "E"], nivel: "Todos los niveles",
    nota: "Bahía con escuelas de windsurf. Dentro, agua plana; fuera, olas.",
    anemometros: [
      { nombre: "Windfinder · Costa Teguise", url: "https://www.windfinder.com/forecast/costa_teguise_los_charcos" },
      ESTACIONES.lzt,
    ],
    webcams: [
      { nombre: "Surf-Forecast · webcams Las Cucharas", url: "https://www.surf-forecast.com/breaks/Las-Cucharas-Costa-Teguise/webcams/latest" },
    ],
  },
  {
    id: "la-santa", nombre: "La Santa", isla: "Lanzarote", zona: "Tinajo",
    lat: 29.118, lon: -13.655, deportes: ["windsurf", "wing"],
    buenos: ["NE", "N"], nivel: "Experto (olas)",
    nota: "Ola de arrecife de mucha calidad. Solo expertos.",
    anemometros: [ESTACIONES.lzt],
    webcams: [
      { nombre: "Windfinder · webcams La Santa", url: "https://www.windfinder.com/webcams/lanzarote_la_santa" },
    ],
  },
  {
    id: "playa-honda", nombre: "Playa Honda", isla: "Lanzarote", zona: "San Bartolomé",
    lat: 28.950, lon: -13.585, deportes: ["kite", "windsurf", "wing"],
    buenos: ["E", "SE", "S"], nivel: "Intermedio",
    nota: "Junto al aeropuerto, viento off-shore con el N/NE: cuidado. Mejor con viento del E/SE.",
    anemometros: [ESTACIONES.lzt],
    webcams: [
      { nombre: "Windfinder · webcams Lanzarote", url: "https://www.windfinder.com/webcams/lanzarote" },
    ],
  },
];
