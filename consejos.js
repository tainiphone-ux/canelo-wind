// Consejos y avisos de seguridad de cada spot (por su id de spots.js).
// consejos: lista de frases cortas. seguridad: aviso en rojo (solo si hace falta).
// peligro: direcciones de viento de tierra (off-shore): esas horas salen «Muy malo» con aviso.
// marea: "alta" si el spot necesita marea alta: avisa de la hora de la bajamar.
// Son orientativos: siempre conviene preguntar en las escuelas de la zona.

const CONSEJOS = {
  // ---------- TENERIFE ----------
  "el-medano": {
    consejos: [
      "Con alisio fuerte el viento acelera junto a Montaña Roja: lleva una talla menos de vela, cometa o ala.",
      "Normalmente sopla más a mediodía y por la tarde que a primera hora.",
      "Monta y sal por la playa central; en verano respeta la zona de baño balizada.",
    ],
    seguridad: "Con viento del NE el viento es de lado y algo hacia fuera (side-off) en parte de la bahía: si rompes material, la corriente te aleja hacia mar abierto. No salgas solo y avisa a alguien en tierra.",
  },
  "el-cabezo": {
    consejos: [
      "Usa escarpines: el fondo es de roca.",
      "Mira la gráfica de mareas: con marea alta hay más agua sobre la roca.",
      "Spot de olas: material pequeño y tabla de olas.",
    ],
    marea: "alta",
    seguridad: "Fondo de roca y olas: solo para gente con experiencia. Con marea baja queda muy poca agua sobre la roca.",
  },
  "la-tejita": {
    consejos: [
      "Monta el kite en la parte más alejada de los bañistas.",
      "Con viento muy del norte, Montaña Roja tapa el viento cerca de la orilla y queda racheado.",
    ],
    seguridad: "Playa con muchos bañistas (zona nudista incluida): mantén siempre distancia y nunca vueles el kite por encima de la gente.",
  },
  "muelle-granadilla": {
    consejos: [
      "Buen sitio para aprender wing y windsurf: agua plana y viento constante.",
      "Si vas con escuela, ellos te dicen por dónde entrar y salir.",
    ],
    seguridad: "Junto a un puerto: no entres en la bocana ni en la zona de maniobra de los barcos.",
  },
  "poris": {
    consejos: [
      "Usa escarpines: hay piedras en la orilla.",
      "Con alisio del NE el agua dentro de la bahía queda más recogida.",
    ],
    seguridad: "Rocas en la orilla y en los lados de la bahía. Con viento fuerte llega muy racheado.",
  },
  "guimar": {
    consejos: [
      "Funciona mejor cuando el viento viene más del norte y en El Médano se queda flojo.",
      "Para wing, mejor con marea alta (mira la gráfica de mareas).",
      "Hay duchas al norte de la playa y se aparca fácil.",
    ],
    marea: "alta",
    seguridad: "Con marea baja aparecen piedras cerca de la orilla: cuidado al entrar y salir, sobre todo con foil.",
  },
  "playa-troya": {
    consejos: [
      "Funciona los pocos días de viento del oeste o del sur.",
      "Es zona de surf: respeta a los surfistas y a los bañistas.",
    ],
    peligro: ["NE", "N", "E"],
    seguridad: "Con el alisio del NE aquí el viento sopla de tierra hacia el mar (off-shore): si te pasa algo, te aleja de la costa. No salgas con viento del NE.",
  },

  // ---------- GRAN CANARIA ----------
  "pozo-izquierdo": {
    consejos: [
      "Material pequeño: en verano es normal pasar de 30 nudos.",
      "Usa escarpines: playa de piedras.",
      "Entra y sal por la rampa y mira bien el ritmo de las olas.",
    ],
    seguridad: "Viento muy fuerte y racheado, olas y fondo de piedra: solo para expertos. No salgas solo.",
  },
  "vargas": {
    consejos: [
      "Buena alternativa cuando en Pozo sopla demasiado.",
      "Usa escarpines: hay piedras en la orilla.",
    ],
    seguridad: "Fondo de piedra en la orilla y algo de ola: cuidado al entrar y salir.",
  },
  "arinaga": {
    consejos: [
      "Agua más plana: buena para kite y wing.",
      "En verano hay más bañistas: busca la zona más despejada.",
    ],
    seguridad: "",
  },
  "bahia-feliz": {
    consejos: [
      "Ideal para aprender: hay escuelas y el agua es plana.",
      "Viento constante con el alisio, de lado a la playa.",
    ],
    seguridad: "Hay rocas en la entrada al agua y zona de baño: entra por donde te indiquen las escuelas.",
  },

  // ---------- FUERTEVENTURA ----------
  "sotavento": {
    consejos: [
      "La laguna se llena con la marea: ve entre 2 horas antes y 2 horas después de la pleamar (mira la gráfica de mareas).",
      "Dentro de la laguna el agua es plana y poco profunda: perfecto para aprender.",
      "El viento acelera mucho en verano: lleva material pequeño.",
    ],
    marea: "alta",
    seguridad: "Con la marea bajando la laguna se vacía rápido: puedes quedarte sin agua y golpear el fondo con la quilla o el foil. Fuera de la laguna el viento sopla hacia fuera (side-off) y te aleja de la costa.",
  },
  "risco-del-paso": {
    consejos: [
      "Viento muy acelerado en verano: material pequeño.",
      "Mira también la marea: cambia mucho la orilla.",
    ],
    seguridad: "Viento fuerte y racheado, de lado y hacia fuera (side-off): si rompes material te aleja de la costa. No salgas solo.",
  },
  "matas-blancas": {
    consejos: [
      "Agua plana y viento muy acelerado: lleva poca superficie.",
      "Las rachas bajan de la montaña: espera a ver cómo viene antes de lanzar.",
    ],
    seguridad: "Viento muy racheado por la montaña. Lanza y aterriza el kite con espacio y siempre con ayuda.",
  },
  "flag-beach": {
    consejos: [
      "Viento de lado a la playa con el alisio: cómodo para kite.",
      "Lleva agua y comida: casi no hay servicios en la playa.",
    ],
    seguridad: "Hay arrecife en los dos extremos de la playa: mantente en la zona central de arena.",
  },
  "el-cotillo": {
    consejos: [
      "Spot de olas en la costa oeste: material de olas.",
      "Mira bien la previsión de olas antes de ir.",
    ],
    seguridad: "Olas fuertes, corrientes y viento de lado hacia fuera (side-off): solo para expertos. No salgas solo.",
  },

  // ---------- LANZAROTE ----------
  "famara": {
    consejos: [
      "Playa muy larga: si rompes, intenta llegar a la orilla a favor del viento.",
      "Con nordeste el viento es de lado (side-shore): el mejor para Famara.",
    ],
    seguridad: "Corrientes muy fuertes y olas: bandera roja permanente para el baño. No salgas solo y nunca con viento que sople hacia el mar.",
  },
  "costa-teguise": {
    consejos: [
      "Dentro de la bahía agua plana para aprender; fuera, olas para avanzados.",
      "Hay escuelas de windsurf en la playa de Las Cucharas.",
    ],
    seguridad: "Rocas en la entrada y en los lados de la bahía: cuidado con marea baja.",
  },
  "la-santa": {
    consejos: [
      "Ola de arrecife de mucha calidad: solo con material de olas.",
    ],
    seguridad: "Arrecife poco profundo y olas grandes: solo para expertos. Un golpe contra el fondo es muy peligroso.",
  },
  "playa-honda": {
    consejos: [
      "Mejor con viento del este o del sureste, que sopla de lado a la playa.",
    ],
    peligro: ["N", "NE"],
    seguridad: "Con viento del N o NE sopla de tierra hacia el mar (off-shore): no salgas. Está junto al aeropuerto: infórmate de dónde está permitido volar el kite.",
  },

  // ---------- ANDALUCÍA (Cádiz) ----------
  "valdevaqueros": {
    consejos: [
      "Con levante fuerte lleva poca superficie: el viento es muy racheado.",
      "Con poniente el viento es más suave y constante.",
      "En verano el aparcamiento se llena pronto: llega temprano.",
    ],
    seguridad: "Con levante el viento sale hacia fuera en parte de la playa y empuja hacia el Estrecho, con mucho tráfico de barcos. En verano solo se puede salir en las zonas de kite balizadas.",
  },
  "los-lances": {
    consejos: [
      "Funciona con levante y con poniente.",
      "En temporada alta hay tramos donde el kite está prohibido: mira los carteles.",
    ],
    seguridad: "Cerca de Tarifa, con levante, el viento sopla hacia fuera. Respeta la zona de bañistas.",
  },
  "bolonia": {
    consejos: [
      "Mejor con poniente: viento limpio y agua bonita.",
      "Es espacio natural protegido: no dejes nada en la playa.",
    ],
    seguridad: "Con levante el viento llega muy racheado desde la sierra.",
  },
  "canos-de-meca": {
    consejos: [
      "Con levante se forman olas y el viento acelera en el cabo de Trafalgar.",
    ],
    seguridad: "Rocas y corrientes junto al cabo de Trafalgar: no te acerques al cabo.",
  },

  // ---------- MURCIA (Mar Menor) ----------
  "los-narejos": {
    consejos: [
      "Agua plana y poco profunda: de los mejores sitios de España para aprender.",
      "En verano la térmica entra casi a diario por la tarde.",
    ],
    seguridad: "Poca profundidad: con foil puedes tocar fondo. Respeta las zonas de baño balizadas.",
  },
  "lo-pagan": {
    consejos: [
      "Agua muy poco profunda: ideal para aprender y practicar.",
    ],
    seguridad: "Muy poca profundidad: con foil cuidado con el fondo. Respeta las zonas de baño.",
  },

  // ---------- COMUNIDAD VALENCIANA ----------
  "el-saler": {
    consejos: [
      "La térmica del este entra a partir de mediodía en primavera y verano.",
      "Está junto al Parque Natural de la Albufera: respeta las dunas.",
    ],
    seguridad: "En verano solo se puede salir en las zonas balizadas para kite.",
  },
  "oliva": {
    consejos: [
      "Viento térmico regular en verano, más por la tarde.",
    ],
    seguridad: "",
  },
  "santa-pola": {
    consejos: [
      "Térmica casi diaria en verano y agua bastante plana.",
      "Buen sitio para aprender.",
    ],
    seguridad: "",
  },

  // ---------- CATALUÑA ----------
  "sant-pere-pescador": {
    consejos: [
      "Con tramontana sopla muy fuerte: material pequeño.",
      "En verano, la térmica del sur entra por la tarde y es más suave.",
    ],
    seguridad: "Con tramontana fuerte el viento sopla hacia fuera (side-off) y muy racheado: si rompes, te aleja mar adentro. Kite solo en la zona regulada.",
  },
  "delta-ebro": {
    consejos: [
      "Agua plana y poco profunda en la bahía dels Alfacs.",
      "Lleva repelente: hay muchos mosquitos.",
    ],
    seguridad: "Hay viveros de mejillones (bateas) en la bahía: no te acerques.",
  },
  "castelldefels": {
    consejos: [
      "La térmica del sur entra a partir de mediodía.",
    ],
    seguridad: "En verano hay mucha gente: solo en los pasillos de entrada y salida balizados.",
  },

  // ---------- ISLAS BALEARES ----------
  "pollenca": {
    consejos: [
      "La térmica (embat) entra casi cada tarde de verano.",
      "Bahía grande y protegida: buena para aprender.",
    ],
    seguridad: "Hay barcos en la bahía: mira bien antes de cruzar.",
  },
  "alcudia": {
    consejos: [
      "Playa muy larga con viento térmico del este.",
    ],
    seguridad: "En verano, solo en las zonas balizadas para deportes de viento.",
  },
  "sa-rapita": {
    consejos: [
      "La térmica del sur entra por la tarde.",
    ],
    seguridad: "Zona de bañistas en verano: mantén siempre la distancia.",
  },

  // ---------- GALICIA Y ASTURIAS ----------
  "razo": {
    consejos: [
      "Agua fría: neopreno de 4/3 o 5/4 casi todo el año.",
      "Con nordeste el viento es de lado: el mejor para este spot.",
    ],
    seguridad: "Atlántico abierto: olas y corrientes fuertes. No salgas solo.",
  },
  "xago": {
    consejos: [
      "Agua fría: neopreno de 4/3 o 5/4.",
      "Mejor con nordeste en verano.",
    ],
    seguridad: "Olas y corrientes. No salgas solo.",
  },

  // ---------- NUEVOS (08-11-2026) ----------
  "abades": {
    consejos: ["Bahía tranquila entre El Médano y Porís, con el alisio del NE.", "Usa escarpines: hay piedras en la entrada."],
    seguridad: "Rocas a los lados de la bahía. Con viento fuerte llega racheado.",
  },
  "burrero": {
    consejos: ["Más viento en la parte sur de la playa; al norte hay un rincón de arena más resguardado.", "Con mar de fondo del norte entran olas para hacer wave."],
    seguridad: "Playa de piedras y la ola rompe cerca de las rocas: no es sitio para saltar. Viento del NE algo hacia fuera (side-off).",
  },
  "ojos-de-garza": {
    consejos: ["La alternativa cuando en Pozo sopla demasiado.", "Mejor con viento del N o NNE. Aparcar es difícil los fines de semana."],
    seguridad: "Viento racheado y zona de rocas al sur de la salida: entra y sal por el sitio de siempre.",
  },
  "tarajalillo": {
    consejos: ["Spot del sur con viento casi todo el año, junto a Bahía Feliz.", "Se juntan kiters y windsurfistas: respeta las zonas de cada uno."],
    seguridad: "Hay rocas y bañistas cerca: mira bien por dónde entras.",
  },
  "salinas-pozo": {
    consejos: ["Viento de lado (side-shore) y olas largas para hacer wave.", "Material pequeño en verano."],
    seguridad: "Viento muy fuerte y olas sobre fondo de piedra: solo intermedios altos y expertos.",
  },
  "costa-calma": {
    consejos: ["Al norte de la laguna de Sotavento, con el mismo alisio acelerado.", "Buena para kite con viento de lado."],
    seguridad: "Fuera de la orilla el viento sopla un poco hacia el mar: no te alejes mucho.",
  },
  "majanicho": {
    consejos: ["Ola de arrecife para windsurf en el norte de Fuerteventura.", "Mira la marea: con marea baja hay muy poca agua sobre el arrecife."],
    marea: "alta",
    seguridad: "Arrecife poco profundo, olas y corrientes: solo para expertos. No salgas solo.",
  },
  "matagorda": {
    consejos: ["Zona de kite junto a Puerto del Carmen.", "En verano hay muchos bañistas: usa la zona de kite."],
    seguridad: "Cerca del aeropuerto de Lanzarote: vuela el kite solo en la zona permitida.",
  },
  "punta-paloma": {
    consejos: ["Entre Valdevaqueros y Bolonia, con la gran duna detrás.", "Con levante el viento es fuerte y racheado; con poniente, más limpio."],
    seguridad: "Con levante el viento sopla hacia fuera y empuja hacia el Estrecho. Respeta las zonas balizadas en verano.",
  },
  "sancti-petri": {
    consejos: ["Playa larga de Chiclana; funciona con poniente y con levante.", "Mira la marea: la corriente del caño de Sancti Petri es fuerte."],
    seguridad: "Corriente fuerte en la boca del caño de Sancti Petri: no te acerques al canal.",
  },
  "los-alamos": {
    consejos: ["Zona oficial de kite de Torremolinos, cerca de Málaga.", "La térmica del suroeste entra muchas tardes de primavera a otoño."],
    seguridad: "Playa con muchos bañistas: sal y entra solo por el pasillo balizado.",
  },
  "mazagon": {
    consejos: ["El spot más conocido de Huelva, playa muy larga.", "Mira la marea: cambia mucho la orilla."],
    seguridad: "",
  },
  "torregarcia": {
    consejos: ["Playa larga al este de Almería, junto al Cabo de Gata.", "Funciona con levante y con poniente."],
    seguridad: "Es parque natural: respeta las normas y las zonas de baño.",
  },
  "los-urrutias": {
    consejos: ["Sur del Mar Menor, agua plana y poco profunda.", "Ideal para aprender y practicar con la térmica."],
    seguridad: "Muy poca profundidad: con foil cuidado con el fondo.",
  },
  "pinedo": {
    consejos: ["La playa de kite de Valencia ciudad.", "La térmica del este entra a mediodía en primavera y verano."],
    seguridad: "En verano solo se puede salir en la zona balizada para kite.",
  },
  "arenales-del-sol": {
    consejos: ["Playa larga de Elche, con térmica casi diaria en verano.", "Hay escuelas de kite en la zona."],
    seguridad: "Está cerca del aeropuerto de Alicante: kite solo en la zona permitida.",
  },
  "roses": {
    consejos: ["Golfo de Roses: con tramontana sopla muy fuerte.", "En verano entra la térmica del sur por la tarde."],
    seguridad: "Con tramontana el viento sopla hacia fuera y muy racheado: si rompes, te aleja de la costa.",
  },
  "fornells": {
    consejos: ["Bahía muy cerrada y protegida en el norte de Menorca: agua plana.", "Buena para aprender y para wing con la tramontana."],
    seguridad: "Hay barcos fondeados en la bahía: mira bien antes de cruzar.",
  },
  "doninos": {
    consejos: ["El spot más valorado de Galicia, cerca de Ferrol.", "Agua fría: neopreno de 4/3 o 5/4."],
    seguridad: "Olas fuertes y corrientes del Atlántico: para gente con experiencia. No salgas solo.",
  },
  "a-lanzada": {
    consejos: ["Playa larga y famosa de las Rías Baixas.", "Con nortada en verano sopla casi a diario. Agua fría."],
    seguridad: "Corrientes en los extremos de la playa: mantente en la zona central.",
  },
  "somo": {
    consejos: ["Frente a Santander; dentro de la ría el agua está más plana.", "Mira la marea: sube y baja más de 3 metros."],
    seguridad: "Corrientes fuertes en la boca de la ría con la marea: no te metas en el canal.",
  },
  "laredo": {
    consejos: ["Playa de La Salve: con viento del este acelera por efecto embudo.", "Mira la marea: sube y baja más de 3 metros."],
    seguridad: "Con marea baja la playa se hace enorme y con marea alta queda poca arena: calcula bien la vuelta.",
  },

  // ---------- PENÍNSULA: LOTE 2 (08-11-2026) ----------
  "zahara": {
    consejos: ["Con levante el viento sale de la sierra y llega racheado.", "Con poniente, agua más bonita y viento más limpio."],
    seguridad: "Con levante, viento hacia fuera en parte de la playa: no te alejes de la orilla.",
  },
  "camposoto": {
    consejos: ["Mejor con poniente: viento de lado y constante.", "Es parque natural: no dejes nada en la playa."],
    seguridad: "Al sur, la punta del Boquerón tiene corrientes con la marea: no te acerques.",
  },
  "cortadura": {
    consejos: ["Funciona con poniente, de lado a la playa.", "En verano hay zona balizada para kite."],
    seguridad: "Playa urbana con muchos bañistas en verano: solo por la zona de kite.",
  },
  "chipiona": {
    consejos: ["Mira la marea: cambia mucho la playa.", "Con poniente el viento entra limpio del mar."],
    seguridad: "Corrientes cerca de la desembocadura del Guadalquivir: no te alejes hacia el norte.",
  },
  "isla-canela": {
    consejos: ["La térmica entra a mediodía en verano.", "Mira la marea: la playa cambia mucho."],
    seguridad: "Corrientes en la desembocadura del Guadiana: no te acerques al río.",
  },
  "el-portil": {
    consejos: ["Mejor con la térmica del suroeste en verano.", "Hay escuelas de kite en la zona."],
    seguridad: "",
  },
  "guadalmar": {
    consejos: ["Funciona con poniente y con levante.", "Está junto a un paraje natural: respeta las zonas protegidas."],
    seguridad: "Cerca del aeropuerto de Málaga: vuela el kite solo en la zona permitida.",
  },
  "torre-del-mar": {
    consejos: ["Con poniente el viento entra de lado.", "En verano hay zona de kite balizada."],
    seguridad: "Playa con muchos bañistas en verano: solo por la zona de kite.",
  },
  "playa-granada": {
    consejos: ["Funciona con poniente y con levante.", "Playa de grava fina: usa escarpines."],
    seguridad: "",
  },
  "balerma": {
    consejos: ["Mejor con poniente.", "Playa de arena y grava: usa escarpines."],
    seguridad: "",
  },
  "roquetas": {
    consejos: ["Hay escuelas de kite en la zona.", "Funciona con poniente y con levante."],
    seguridad: "En verano hay muchos bañistas: solo por la zona de kite.",
  },
  "la-manga": {
    consejos: ["Agua plana: ideal para aprender y para wing.", "La térmica entra casi a diario en verano."],
    seguridad: "Poca profundidad: con foil cuidado con el fondo.",
  },
  "bolnuevo": {
    consejos: ["La térmica del sur entra por la tarde.", "Agua clara y fondo de arena."],
    seguridad: "",
  },
  "cullera": {
    consejos: ["La térmica entra a mediodía.", "Hay escuelas en la zona."],
    seguridad: "En verano solo en las zonas balizadas.",
  },
  "denia": {
    consejos: ["La térmica del este entra a mediodía.", "Playa larga de arena."],
    seguridad: "En verano solo en las zonas balizadas para kite.",
  },
  "la-mata": {
    consejos: ["Térmica casi diaria en verano.", "Hay escuelas de kite en la zona."],
    seguridad: "",
  },
  "benicassim": {
    consejos: ["La térmica entra a mediodía.", "Playa de arena con fondo suave."],
    seguridad: "En verano solo en las zonas balizadas.",
  },
  "lescala": {
    consejos: ["Con tramontana sopla fuerte.", "En verano entra la térmica del sur."],
    seguridad: "Con tramontana el viento sopla hacia fuera: no te alejes.",
  },
  "riumar": {
    consejos: ["Playas enormes con mucho espacio.", "Lleva repelente: hay mosquitos."],
    seguridad: "Corrientes cerca de la desembocadura del Ebro: no te acerques.",
  },
  "torredembarra": {
    consejos: ["El garbí entra a partir de mediodía.", "Hay escuelas en la zona."],
    seguridad: "En verano solo en los pasillos balizados.",
  },
  "port-de-la-selva": {
    consejos: ["Con tramontana sopla muy fuerte y racheado: material pequeño.", "La tramontana es más frecuente en otoño, invierno y primavera."],
    seguridad: "Tramontana muy racheada. Rocas en los extremos de la bahía y barcos del puerto: navega lejos de la bocana.",
  },
  "pals": {
    consejos: ["Playa muy larga y abierta: hay sitio para montar y despegar.", "Con levante (E) entra mar de fondo y ola."],
    peligro: ["O", "NO"],
    seguridad: "Con viento de tierra (oeste o noroeste) sopla hacia fuera: no salgas. En verano respeta la zona de bañistas.",
  },
  "palamos": {
    consejos: ["El garbí entra a partir de mediodía en primavera y verano.", "Dentro de la bahía el agua está más plana."],
    peligro: ["N", "NO"],
    seguridad: "Hay puerto con barcos entrando y saliendo: no navegues por la bocana. Con tramontana el viento sopla hacia fuera.",
  },
  "vilassar-de-mar": {
    consejos: ["El garbí entra a mediodía en primavera y verano.", "Se baja a la playa por los pasos bajo la vía del tren."],
    peligro: ["N", "NO", "O"],
    seguridad: "Con viento de tierra (noroeste) sopla hacia fuera. En verano, solo por los pasillos balizados.",
  },
  "malgrat-de-mar": {
    consejos: ["Playa larga y ancha, con sitio para montar el kite.", "Con levante entra ola."],
    peligro: ["N", "NO", "O"],
    seguridad: "Cerca de la desembocadura de la Tordera puede haber corrientes y troncos. Con viento de tierra sopla hacia fuera.",
  },
  "el-prat": {
    consejos: ["El garbí entra a partir de mediodía.", "Playa larga y más tranquila que Castelldefels."],
    peligro: ["N", "NO"],
    seguridad: "Está al lado del aeropuerto: kite solo donde esté permitido y nunca hacia la zona de los aviones. Parte de la playa es espacio natural protegido.",
  },
  "son-serra": {
    consejos: ["Con viento del norte y nordeste entran olas.", "Fondo de arena con alguna roca."],
    seguridad: "Rocas en algunos tramos de la orilla: entra por la zona de arena.",
  },
  "palma": {
    consejos: ["El embat entra casi cada tarde de verano.", "Hay escuelas de kite en la zona."],
    seguridad: "Cerca del aeropuerto de Palma: kite solo en la zona permitida.",
  },
  "son-bou": {
    consejos: ["Funciona con viento del sur, que entra de lado.", "En verano hay zona de lanzamiento para kite."],
    seguridad: "Playa muy turística en verano: solo por la zona habilitada.",
  },
  "san-xurxo": {
    consejos: ["Con nordeste el viento entra de lado.", "Agua fría: neopreno de 4/3 o 5/4."],
    seguridad: "Olas y corrientes fuertes: solo con experiencia.",
  },
  "traba": {
    consejos: ["Con nordeste en verano funciona casi a diario.", "Agua fría: neopreno grueso."],
    seguridad: "Atlántico abierto: olas y corrientes. No salgas solo.",
  },
  "corrubedo": {
    consejos: ["Con la nortada de verano sopla casi a diario.", "Es parque natural: respeta las dunas."],
    seguridad: "Olas y corrientes del Atlántico: no salgas solo.",
  },
  "liencres": {
    consejos: ["Mira la marea: sube y baja más de 3 metros.", "Es parque natural: respeta las dunas."],
    seguridad: "Corrientes en la desembocadura del Pas: no te acerques.",
  },
  "orinon": {
    consejos: ["Dentro de la ría el agua está más plana.", "Mira la marea: sube y baja más de 3 metros."],
    seguridad: "Corriente en la ría con la marea: no te metas en el canal.",
  },
  "zarautz": {
    consejos: ["Con viento del norte entran olas.", "En verano hay restricciones por los bañistas."],
    seguridad: "Olas y corrientes del Cantábrico: no salgas solo.",
  },
  "hondarribia": {
    consejos: ["Dentro de la bahía el agua está más plana.", "Mira la marea: cambia mucho el fondo."],
    seguridad: "Corriente del Bidasoa con la marea y barcos del puerto: mira bien antes de cruzar.",
  },
  "santillana": {
    consejos: ["La térmica entra por la tarde en primavera y verano.", "Agua dulce: sin olas, perfecto para aprender."],
    seguridad: "Con el embalse bajo aparecen piedras y troncos: mira el fondo.",
  },
  "embalse-ebro": {
    consejos: ["Mucho espacio y agua plana.", "Agua fría: neopreno casi todo el año."],
    seguridad: "Zona aislada: no salgas solo y avisa a alguien en tierra.",
  },
  "ullibarri": {
    consejos: ["Agua plana: bueno para aprender.", "Hay playas habilitadas y club náutico."],
    seguridad: "Respeta las zonas de baño y las de navegación.",
  },
  "puerto-lajas": {
    consejos: ["Buena para wing incluso con poco viento.", "Mejor con marea alta: con marea baja hay que cruzar piedras y arrecife para llegar al agua."],
    marea: "alta",
    seguridad: "Con marea baja hay arrecife de roca en la orilla: usa escarpines y cuidado con el foil. Con viento del oeste sopla hacia fuera.",
  },
};
