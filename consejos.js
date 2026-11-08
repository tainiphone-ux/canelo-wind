// Consejos y avisos de seguridad de cada spot (por su id de spots.js).
// consejos: lista de frases cortas. seguridad: aviso en rojo (solo si hace falta).
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
    seguridad: "Con marea baja aparecen piedras cerca de la orilla: cuidado al entrar y salir, sobre todo con foil.",
  },
  "playa-troya": {
    consejos: [
      "Funciona los pocos días de viento del oeste o del sur.",
      "Es zona de surf: respeta a los surfistas y a los bañistas.",
    ],
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
};
