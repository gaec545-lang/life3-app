const BLOCKS = {
  1: {
    id: 1,
    title: "Simple Present",
    unit: "Unit 1 — Lifestyle",
    unitNumber: 1,
    color: "#f5c842",
    icon: "🕐",

    explain: {
      description: "Se usa para hablar de hechos que siempre son verdad y de hábitos o rutinas diarias.",
      whenToUse: [
        { icon: "🔄", label: "Hábitos y rutinas", example: "I work long hours every day." },
        { icon: "✅", label: "Hechos siempre verdaderos", example: "Water boils at 100°C." },
        { icon: "⏰", label: "Horarios y programas fijos", example: "The train leaves at 8 AM." }
      ],
      rules: [
        { formula: "I / You / We / They + verbo base", example: "They sleep 8 hours." },
        { formula: "He / She / It + verbo + -s/-es", example: "She sleeps 8 hours." },
        { formula: "Negativo: don't / doesn't + verbo base", example: "He doesn't sleep well." },
        { formula: "Pregunta: Do / Does + sujeto + verbo base?", example: "Does she feel tired?" }
      ],
      exceptions: [
        "Verbos terminados en -o, -s, -sh, -ch, -x: añaden -es → goes, watches, fixes",
        "Verbos terminados en consonante + y: cambian a -ies → study → studies",
        "Verbo BE es irregular: am / is / are (no usa do/does)"
      ]
    },

    examples: [
      { en: "I often get home late from work.", es: "A menudo llego tarde a casa del trabajo.", highlight: "often" },
      { en: "He sleeps eight hours every night.", es: "Él duerme ocho horas cada noche.", highlight: "sleeps" },
      { en: "Does she feel tired during the day?", es: "¿Se siente cansada durante el día?", highlight: "Does...feel" },
      { en: "They don't sleep well.", es: "Ellos no duermen bien.", highlight: "don't sleep" },
      { en: "The average human needs eight hours of sleep.", es: "El humano promedio necesita ocho horas de sueño.", highlight: "needs" },
      { en: "We rarely go to bed at sunset.", es: "Raramente nos vamos a la cama al atardecer.", highlight: "go" }
    ],

    exercises: [
      {
        type: "multiple-choice",
        question: 'Elige la forma correcta: "She _____ eight hours every night."',
        options: ["sleep", "sleeps", "is sleep", "sleeping"],
        answer: "sleeps",
        feedback: "Con He/She/It usamos el verbo + -s en el Simple Present."
      },
      {
        type: "fill-blank",
        question: 'Completa: "He _______ (not/sleep) well."',
        answer: "doesn't sleep",
        accepted: ["doesn't sleep", "does not sleep"],
        feedback: "Con He/She/It, el negativo es doesn't + verbo base."
      },
      {
        type: "word-order",
        question: "Ordena para formar una oración correcta:",
        words: ["often", "I", "late", "home", "get"],
        answer: "I often get home late",
        feedback: "Los adverbios de frecuencia van antes del verbo principal."
      },
      {
        type: "translation",
        question: "Traduce: 'Ella trabaja muchas horas todos los días.'",
        answer: "She works long hours every day.",
        accepted: ["She works long hours every day.", "She works a lot of hours every day."],
        feedback: "Recuerda el -s con she."
      },
      {
        type: "error-detection",
        question: 'Encuentra el error: "She don\'t sleep well at night."',
        options: [
          '"don\'t" debería ser "doesn\'t"',
          '"sleep" debería ser "sleeping"',
          '"at night" debería ser "in the night"',
          "No hay error"
        ],
        answer: '"don\'t" debería ser "doesn\'t"',
        feedback: "Con She/He/It usamos doesn't, no don't."
      },
      {
        type: "multiple-choice",
        question: '"_____ they go to bed late?" — "Yes, they do."',
        options: ["Does", "Do", "Is", "Are"],
        answer: "Do",
        feedback: "Con I/You/We/They, las preguntas usan Do."
      },
      {
        type: "fill-blank",
        question: 'Completa: "The train _______ (leave) at 8 AM every day."',
        answer: "leaves",
        accepted: ["leaves"],
        feedback: "Train = he/she/it → leave + s = leaves."
      },
      {
        type: "matching",
        question: "Conecta cada oración con su uso del Simple Present:",
        pairs: [
          { left: "I work long hours.", right: "Hábito/rutina" },
          { left: "Water boils at 100°C.", right: "Hecho siempre verdadero" },
          { left: "She studies every night.", right: "Hábito/rutina" }
        ]
      }
    ]
  },

  2: {
    id: 2,
    title: "Adverbios de Frecuencia",
    unit: "Unit 1 — Lifestyle",
    unitNumber: 1,
    color: "#f5c842",
    icon: "📊",

    explain: {
      description: "Los adverbios de frecuencia indican con qué frecuencia ocurre una acción.",
      whenToUse: [
        { icon: "📈", label: "Describir frecuencia de hábitos", example: "I always brush my teeth." },
        { icon: "🗓️", label: "Expresar rutinas con intensidad", example: "She rarely eats fast food." }
      ],
      rules: [
        { formula: "100% → always → usually → often → sometimes → rarely → 0% → never", example: "" },
        { formula: "Posición: ANTES del verbo principal", example: "I often go to the gym." },
        { formula: "Posición: DESPUÉS del verbo BE", example: "She is always late." },
        { formula: "Expresiones (once a week, every day): AL FINAL de la oración", example: "I visit my grandparents every month." }
      ],
      exceptions: [
        "Con el verbo BE el adverbio va DESPUÉS: 'She is always late.' (no 'She always is late.')",
        "Sometimes puede ir al inicio de la oración: 'Sometimes I go to the gym.'"
      ]
    },

    examples: [
      { en: "She's usually late for work.", es: "Ella suele llegar tarde al trabajo.", highlight: "usually" },
      { en: "I often wake up at seven.", es: "A menudo me despierto a las siete.", highlight: "often" },
      { en: "Do you often wake up in the middle of the night?", es: "¿A menudo te despiertas en medio de la noche?", highlight: "often" },
      { en: "Every month, I visit my grandparents.", es: "Cada mes visito a mis abuelos.", highlight: "Every month" },
      { en: "She wakes up two or three times a night.", es: "Ella se despierta dos o tres veces por noche.", highlight: "two or three times a night" },
      { en: "I never go to bed before midnight.", es: "Nunca me voy a la cama antes de medianoche.", highlight: "never" }
    ],

    exercises: [
      {
        type: "multiple-choice",
        question: '"She _____ late for work." — ¿Cuál es la posición correcta de "always"?',
        options: ["always is", "is always", "is always be", "always are"],
        answer: "is always",
        feedback: "Con el verbo BE, el adverbio va DESPUÉS: 'She is always late.'"
      },
      {
        type: "word-order",
        question: "Ordena correctamente:",
        words: ["often", "I", "restaurant", "a", "at", "eat"],
        answer: "I often eat at a restaurant",
        feedback: "El adverbio 'often' va antes del verbo principal 'eat'."
      },
      {
        type: "fill-blank",
        question: 'Completa: "We go on vacation _______ a year." (twice)',
        answer: "twice",
        accepted: ["twice"],
        feedback: "Las expresiones de frecuencia como 'twice a year' van al final."
      },
      {
        type: "multiple-choice",
        question: '"My brother _____ plays tennis on Saturday mornings." (always)',
        options: ["always plays", "plays always", "always is playing", "is always plays"],
        answer: "always plays",
        feedback: "Adverbio ANTES del verbo principal (que no es BE)."
      },
      {
        type: "translation",
        question: "Traduce: 'Ella raramente se queda despierta hasta medianoche.'",
        answer: "She rarely stays up until midnight.",
        accepted: ["She rarely stays up until midnight.", "She rarely stays awake until midnight."],
        feedback: "'rarely' va antes del verbo 'stays'."
      },
      {
        type: "error-detection",
        question: '"I go usually to the gym after work."',
        options: [
          '"usually" debería ir antes de "go"',
          '"after work" debería ser "after the work"',
          '"go" debería ser "goes"',
          "No hay error"
        ],
        answer: '"usually" debería ir antes de "go"',
        feedback: "Correcto: 'I usually go to the gym after work.'"
      },
      {
        type: "matching",
        question: "Ordena del más frecuente al menos frecuente:",
        pairs: [
          { left: "always", right: "100%" },
          { left: "usually", right: "90%" },
          { left: "sometimes", right: "50%" },
          { left: "never", right: "0%" }
        ]
      },
      {
        type: "multiple-choice",
        question: '"_____ month, I visit my grandparents." — ¿Cuál encaja?',
        options: ["Every", "Always", "Often", "Usually"],
        answer: "Every",
        feedback: "'Every month' es una expresión de frecuencia que va al inicio o final."
      }
    ]
  },

  3: {
    id: 3,
    title: "Simple Present vs Present Continuous",
    unit: "Unit 1 — Lifestyle",
    unitNumber: 1,
    color: "#f58c00",
    icon: "🔄",

    explain: {
      description: "El Simple Present describe rutinas y hechos permanentes. El Present Continuous describe lo que pasa AHORA o situaciones temporales.",
      whenToUse: [
        { icon: "🔁", label: "Simple Present: hábitos/hechos fijos", example: "I go to the gym every day." },
        { icon: "⏩", label: "Present Continuous: acción en este momento", example: "I'm going to the gym right now." },
        { icon: "📉", label: "Present Continuous: situación cambiante", example: "Young people are moving to the city." }
      ],
      rules: [
        { formula: "Present Continuous: am/is/are + verbo-ing", example: "She is speaking." },
        { formula: "Negativo: am/is/are + NOT + verbo-ing", example: "They aren't traveling." },
        { formula: "Pregunta: Am/Is/Are + sujeto + verbo-ing?", example: "Is he working?" }
      ],
      exceptions: [
        "Los verbos 'stative' NO se usan en continuo: like, love, know, want, need, believe, understand.",
        "❌ I'm liking this. → ✅ I like this.",
        "❌ She's knowing the answer. → ✅ She knows the answer."
      ]
    },

    examples: [
      { en: "I'm speaking to you right now.", es: "Te estoy hablando ahora mismo.", highlight: "I'm speaking" },
      { en: "She usually wakes up at 7 AM.", es: "Ella suele despertarse a las 7 AM.", highlight: "usually wakes up" },
      { en: "Young people are moving to the city.", es: "Los jóvenes se están mudando a la ciudad.", highlight: "are moving" },
      { en: "Men live to the same age as women.", es: "Los hombres viven hasta la misma edad que las mujeres.", highlight: "live" },
      { en: "Can you wait? I'm replying to an email.", es: "¿Puedes esperar? Estoy respondiendo un email.", highlight: "I'm replying" },
      { en: "He's reading a really interesting book at the moment.", es: "Está leyendo un libro muy interesante en este momento.", highlight: "He's reading" }
    ],

    exercises: [
      {
        type: "multiple-choice",
        question: '"We _____ Spanish at the moment." — Simple Present o Continuous?',
        options: ["study", "are studying", "studies", "is studying"],
        answer: "are studying",
        feedback: "'At the moment' indica que la acción está pasando AHORA → Present Continuous."
      },
      {
        type: "multiple-choice",
        question: '"Men _____ to the same age as women." — ¿Hecho fijo o ahora?',
        options: ["are living", "is living", "live", "lives"],
        answer: "live",
        feedback: "Es un hecho siempre verdadero → Simple Present."
      },
      {
        type: "error-detection",
        question: '"I\'m liking this movie very much."',
        options: [
          '"like" es un verbo stative — no se usa en continuo',
          '"much" debería ser "very"',
          '"this" debería ser "these"',
          "No hay error"
        ],
        answer: '"like" es un verbo stative — no se usa en continuo',
        feedback: "✅ Correcto: 'I like this movie very much.'"
      },
      {
        type: "fill-blank",
        question: '"She _______ (read) a book right now."',
        answer: "is reading",
        accepted: ["is reading", "'s reading"],
        feedback: "'Right now' indica acción en progreso → Present Continuous."
      },
      {
        type: "translation",
        question: "Traduce: '¿Qué estás haciendo en este momento?'",
        answer: "What are you doing at the moment?",
        accepted: ["What are you doing at the moment?", "What are you doing right now?"],
        feedback: "Present Continuous para acciones en progreso ahora."
      },
      {
        type: "word-order",
        question: "Ordena:",
        words: ["she", "is", "not", "traveling", "this", "week"],
        answer: "She is not traveling this week",
        feedback: "Negativo del Present Continuous: is + not + verbo-ing."
      },
      {
        type: "matching",
        question: "¿Simple Present (SP) o Present Continuous (PC)?",
        pairs: [
          { left: "I go to work every day.", right: "SP — rutina" },
          { left: "I'm going to work right now.", right: "PC — ahora" },
          { left: "Water boils at 100°C.", right: "SP — hecho fijo" },
          { left: "She's working from home these days.", right: "PC — situación temporal" }
        ]
      },
      {
        type: "multiple-choice",
        question: '"How often _____ you _____ to the gym?" — Simple Present',
        options: ["are/going", "do/go", "is/going", "have/gone"],
        answer: "do/go",
        feedback: "Preguntas en Simple Present: Do + sujeto + verbo base."
      }
    ]
  },

  4: {
    id: 4,
    title: "Modal Verbs for Rules",
    unit: "Unit 2 — Competitions",
    unitNumber: 2,
    color: "#4c9de0",
    icon: "📋",

    explain: {
      description: "Los verbos modales expresan si algo es obligatorio, permitido o prohibido según las reglas.",
      whenToUse: [
        { icon: "⚽", label: "Reglas de juegos y deportes", example: "Players must wear a helmet." },
        { icon: "🏢", label: "Normas de lugares o situaciones", example: "You can't smoke here." },
        { icon: "📝", label: "Requisitos y permisos", example: "You don't have to arrive early." }
      ],
      rules: [
        { formula: "must / have to → OBLIGACIÓN (es necesario)", example: "Each team must have five people." },
        { formula: "can → PERMISO (está permitido)", example: "Players can pick up the ball." },
        { formula: "can't → PROHIBICIÓN (no está permitido)", example: "They can't change the wheels." },
        { formula: "don't have to → NO OBLIGACIÓN (no es necesario, pero puedes)", example: "You don't have to be an adult." },
        { formula: "Estructura: sujeto + modal + verbo BASE (sin 'to')", example: "She must go." }
      ],
      exceptions: [
        "'Must' no tiene forma pasada → en pasado se usa 'had to': 'She had to wear a helmet.'",
        "'Must not / mustn't' = prohibición fuerte. 'Don't have to' = no obligación. ¡Son opuestos!",
        "have to sí se conjuga: he HAS to / they HAVE to"
      ]
    },

    examples: [
      { en: "Each team must have five people.", es: "Cada equipo debe tener cinco personas.", highlight: "must" },
      { en: "They can't change the wheels.", es: "No pueden cambiar las ruedas.", highlight: "can't" },
      { en: "All the teams have to start at the same place.", es: "Todos los equipos tienen que empezar en el mismo lugar.", highlight: "have to" },
      { en: "Players can pick up the ball and run with it.", es: "Los jugadores pueden tomar el balón y correr con él.", highlight: "can" },
      { en: "You don't have to be an adult.", es: "No tienes que ser adulto.", highlight: "don't have to" },
      { en: "You must be over 18 years old.", es: "Debes tener más de 18 años.", highlight: "must" }
    ],

    exercises: [
      {
        type: "multiple-choice",
        question: 'Las reglas dicen que sí es necesario hacerlo. ¿Qué modal usar?',
        options: ["can", "don't have to", "must", "can't"],
        answer: "must",
        feedback: "'must' o 'have to' expresan obligación — algo es NECESARIO."
      },
      {
        type: "multiple-choice",
        question: '"You _____ smoke in the restaurant." (está prohibido)',
        options: ["must", "can", "don't have to", "can't"],
        answer: "can't",
        feedback: "'can't' expresa prohibición — no está permitido."
      },
      {
        type: "fill-blank",
        question: '"In tennis, players _______ use video replay. (no es obligatorio, pero pueden)"',
        answer: "don't have to",
        accepted: ["don't have to", "do not have to"],
        feedback: "'don't have to' = no es obligatorio, pero está permitido."
      },
      {
        type: "error-detection",
        question: '"She must to wear a helmet when she plays."',
        options: [
          '"must to" debería ser solo "must"',
          '"wear" debería ser "wears"',
          '"when" debería ser "while"',
          "No hay error"
        ],
        answer: '"must to" debería ser solo "must"',
        feedback: "Los modales van directamente con el verbo base: 'must wear' (sin 'to')."
      },
      {
        type: "translation",
        question: "Traduce: 'No puedes argumentar con el árbitro.'",
        answer: "You can't argue with the referee.",
        accepted: ["You can't argue with the referee.", "You cannot argue with the referee."],
        feedback: "Prohibición → can't + verbo base."
      },
      {
        type: "matching",
        question: "Conecta el modal con su significado:",
        pairs: [
          { left: "must / have to", right: "Es obligatorio" },
          { left: "can", right: "Está permitido" },
          { left: "can't", right: "Está prohibido" },
          { left: "don't have to", right: "No es obligatorio" }
        ]
      },
      {
        type: "multiple-choice",
        question: 'En el pasado: "She _____ wear a uniform at school."',
        options: ["must", "had to", "have to", "can"],
        answer: "had to",
        feedback: "'must' no tiene pasado → usamos 'had to' para expresar obligación pasada."
      },
      {
        type: "word-order",
        question: "Forma una regla de fútbol:",
        words: ["players", "can't", "touch", "the", "ball", "their", "with", "hands"],
        answer: "Players can't touch the ball with their hands",
        feedback: "Modal + verbo base directamente."
      }
    ]
  },

  5: {
    id: 5,
    title: "La Forma -ing (Gerundio)",
    unit: "Unit 2 — Competitions",
    unitNumber: 2,
    color: "#4c9de0",
    icon: "🏃",

    explain: {
      description: "El verbo en forma -ing puede funcionar como sustantivo: como sujeto de una oración, como objeto de ciertos verbos, y después de preposiciones.",
      whenToUse: [
        { icon: "📌", label: "Como sujeto de la oración", example: "Learning English is fun." },
        { icon: "❤️", label: "Después de verbos de gusto/sentimiento", example: "I love watching movies." },
        { icon: "🔗", label: "Después de preposiciones", example: "She's good at swimming." }
      ],
      rules: [
        { formula: "Verbo-ing como SUJETO", example: "Learning to win is important." },
        { formula: "Después de: like, love, hate, enjoy, prefer, mind, avoid, finish", example: "I hate losing." },
        { formula: "Después de preposiciones: at, in, of, about, for...", example: "I'm good at losing." }
      ],
      exceptions: [
        "Después de 'want', 'would like', 'decide', 'hope', 'plan' → INFINITIVO (to + verbo): 'I want to win.'",
        "Ortografía: verbos CVC (consonante-vocal-consonante) doblan la consonante: run → running, swim → swimming",
        "Verbos terminados en -e: borran la -e: ride → riding, make → making"
      ]
    },

    examples: [
      { en: "Learning to win and lose is important.", es: "Aprender a ganar y perder es importante.", highlight: "Learning" },
      { en: "Some parents hate losing.", es: "A algunos padres les disgusta perder.", highlight: "losing" },
      { en: "She is good at swimming.", es: "Ella es buena nadando.", highlight: "swimming" },
      { en: "I love watching sports on TV.", es: "Me encanta ver deportes por TV.", highlight: "watching" },
      { en: "He avoids running during rush hour.", es: "Él evita correr durante la hora pico.", highlight: "running" },
      { en: "What sports do you enjoy doing?", es: "¿Qué deportes disfrutas hacer?", highlight: "doing" }
    ],

    exercises: [
      {
        type: "fill-blank",
        question: '"I love _______ (watch) tennis on TV."',
        answer: "watching",
        accepted: ["watching"],
        feedback: "Después de 'love' usamos verbo-ing: watching."
      },
      {
        type: "multiple-choice",
        question: '"_____ to win and lose is important in education."',
        options: ["Learn", "Learning", "Learned", "To learned"],
        answer: "Learning",
        feedback: "El gerundio (-ing) puede ser el sujeto de la oración."
      },
      {
        type: "error-detection",
        question: '"She is good at to swim."',
        options: [
          '"to swim" debería ser "swimming"',
          '"good" debería ser "well"',
          '"at" debería ser "in"',
          "No hay error"
        ],
        answer: '"to swim" debería ser "swimming"',
        feedback: "Después de preposiciones siempre usamos verbo-ing: 'good at swimming'."
      },
      {
        type: "multiple-choice",
        question: '"I want _____ the championship." — ¿-ing o infinitivo?',
        options: ["winning", "to win", "win", "won"],
        answer: "to win",
        feedback: "Después de 'want' usamos infinitivo (to + verbo base): 'want to win'."
      },
      {
        type: "translation",
        question: "Traduce: 'Ella evita conducir durante la hora pico.'",
        answer: "She avoids driving during rush hour.",
        accepted: ["She avoids driving during rush hour.", "She avoids driving in rush hour."],
        feedback: "'avoid' + verbo-ing."
      },
      {
        type: "fill-blank",
        question: '"_______ (run) every day improves your health."',
        answer: "Running",
        accepted: ["Running"],
        feedback: "run → running (dobla la n: consonante-vocal-consonante)."
      },
      {
        type: "word-order",
        question: "Ordena:",
        words: ["hate", "Some", "parents", "losing"],
        answer: "Some parents hate losing",
        feedback: "'hate' + verbo-ing."
      },
      {
        type: "matching",
        question: "¿Qué sigue después de cada verbo?",
        pairs: [
          { left: "I want ___", right: "to win (infinitivo)" },
          { left: "I enjoy ___", right: "winning (gerundio -ing)" },
          { left: "I'm good at ___", right: "winning (gerundio -ing)" },
          { left: "I'd like ___", right: "to win (infinitivo)" }
        ]
      }
    ]
  },

  6: {
    id: 6,
    title: "Comparativos y Superlativos",
    unit: "Unit 3 — Transportation",
    unitNumber: 3,
    color: "#4caf76",
    icon: "📐",

    explain: {
      description: "Se usan para comparar dos o más cosas. El comparativo compara dos; el superlativo identifica el extremo del grupo.",
      whenToUse: [
        { icon: "⚖️", label: "Comparar dos cosas", example: "A bus is cheaper than a taxi." },
        { icon: "🏆", label: "El extremo de un grupo", example: "The plane is the fastest." }
      ],
      rules: [
        { formula: "Adjetivos CORTOS (1 sílaba): + -er / the + -est", example: "fast → faster → the fastest" },
        { formula: "Adjetivos LARGOS (2+ sílabas): more... / the most...", example: "expensive → more expensive → the most expensive" },
        { formula: "Comparativo + THAN", example: "Trains are faster than buses." },
        { formula: "Superlativo + THE", example: "The subway is the cheapest option." }
      ],
      exceptions: [
        "Irregulares: good → better → the best | bad → worse → the worst | far → farther → the farthest",
        "Adjetivos de 2 sílabas en -y: cambian y→i y añaden -er/-est: happy → happier → the happiest",
        "Adjetivos terminados en CVC doblan la consonante: big → bigger → the biggest"
      ]
    },

    examples: [
      { en: "My bicycle is faster than your car during rush hour.", es: "Mi bicicleta es más rápida que tu carro en horas pico.", highlight: "faster than" },
      { en: "The bus is the most popular form of transportation.", es: "El autobús es la forma de transporte más popular.", highlight: "the most popular" },
      { en: "Eight-thirty is the worst time for traffic.", es: "Las ocho y media es el peor momento para el tráfico.", highlight: "the worst" },
      { en: "Trains are quicker than cars, but planes are the fastest.", es: "Los trenes son más rápidos que los coches, pero los aviones son los más rápidos.", highlight: "quicker than / the fastest" },
      { en: "Going by bicycle is healthier than going by car.", es: "Ir en bicicleta es más saludable que ir en coche.", highlight: "healthier than" }
    ],

    exercises: [
      {
        type: "fill-blank",
        question: '"The subway is _______ (cheap) than a taxi."',
        answer: "cheaper",
        accepted: ["cheaper"],
        feedback: "'cheap' es un adjetivo corto: cheap + -er = cheaper."
      },
      {
        type: "multiple-choice",
        question: '"Which is _____ type of transportation in the city?"',
        options: ["the most popular", "more popular", "the popularest", "most popular"],
        answer: "the most popular",
        feedback: "Superlativo de adjetivo largo: the most + adjetivo."
      },
      {
        type: "error-detection",
        question: '"Planes are more fast than trains."',
        options: [
          '"more fast" debería ser "faster"',
          '"than" debería ser "that"',
          '"Planes" debería ser "The planes"',
          "No hay error"
        ],
        answer: '"more fast" debería ser "faster"',
        feedback: "'fast' es corto → usamos faster, no more fast."
      },
      {
        type: "translation",
        question: "Traduce: 'El metro es el medio de transporte más rápido.'",
        answer: "The subway is the fastest means of transportation.",
        accepted: ["The subway is the fastest means of transportation.", "The subway is the fastest type of transportation.", "The subway is the fastest form of transportation."],
        feedback: "Superlativo: the + adjetivo + -est."
      },
      {
        type: "multiple-choice",
        question: '"My commute today was _____ than yesterday." (bad)',
        options: ["badder", "more bad", "worse", "worst"],
        answer: "worse",
        feedback: "'bad' es irregular: bad → worse → the worst."
      },
      {
        type: "fill-blank",
        question: '"Bicycles are _______ (good) for the environment than cars."',
        answer: "better",
        accepted: ["better"],
        feedback: "'good' es irregular: good → better → the best."
      },
      {
        type: "word-order",
        question: "Forma una oración con superlativo:",
        words: ["is", "the", "This", "the", "train", "fastest", "city", "in"],
        answer: "This is the fastest train in the city",
        feedback: "Superlativo: the + adjetivo + -est."
      },
      {
        type: "matching",
        question: "Conecta el adjetivo con su comparativo/superlativo:",
        pairs: [
          { left: "good", right: "better / the best" },
          { left: "bad", right: "worse / the worst" },
          { left: "far", right: "farther / the farthest" },
          { left: "big", right: "bigger / the biggest" }
        ]
      }
    ]
  },

  7: {
    id: 7,
    title: "As...as / Not as...as",
    unit: "Unit 3 — Transportation",
    unitNumber: 3,
    color: "#4caf76",
    icon: "⚖️",

    explain: {
      description: "Se usa para comparar dos cosas indicando si son iguales o diferentes en alguna cualidad.",
      whenToUse: [
        { icon: "🟰", label: "Igualdad: son lo mismo", example: "A camel is as useful as a car." },
        { icon: "≠", label: "Desigualdad: uno es menos que el otro", example: "A camel isn't as fast as a car." }
      ],
      rules: [
        { formula: "IGUALDAD: A + be + as + adjetivo + as + B", example: "Animal transport is as popular as modern vehicles." },
        { formula: "DESIGUALDAD: A + be + not as + adjetivo + as + B", example: "A camel isn't as comfortable as a car." }
      ],
      exceptions: [
        "Se puede decir 'not so...as' en lugar de 'not as...as' — igual de correcto.",
        "No confundir con 'more...than': 'A car is more comfortable than a camel' = 'A camel isn't as comfortable as a car'."
      ]
    },

    examples: [
      { en: "Animal transport is as popular as modern vehicles.", es: "El transporte animal es tan popular como los vehículos modernos.", highlight: "as popular as" },
      { en: "A camel isn't as comfortable as a car.", es: "Un camello no es tan cómodo como un coche.", highlight: "isn't as comfortable as" },
      { en: "The subway from Hong Kong isn't as expensive as a taxi.", es: "El metro de Hong Kong no es tan caro como un taxi.", highlight: "isn't as expensive as" },
      { en: "Riding a bike is as popular as jogging.", es: "Montar en bici es tan popular como trotar.", highlight: "as popular as" },
      { en: "Los Angeles airport is as busy as London Heathrow.", es: "El aeropuerto de Los Ángeles es tan concurrido como el de Heathrow.", highlight: "as busy as" }
    ],

    exercises: [
      {
        type: "fill-blank",
        question: '"The bus isn\'t _______ (expensive) _______ the taxi."',
        answer: "as expensive as",
        accepted: ["as expensive as"],
        feedback: "Desigualdad: not as + adjetivo + as."
      },
      {
        type: "multiple-choice",
        question: '"A camel is _____ useful _____ a car in the desert."',
        options: ["as / as", "more / than", "so / that", "very / as"],
        answer: "as / as",
        feedback: "Igualdad: as + adjetivo + as."
      },
      {
        type: "translation",
        question: "Traduce: 'El tren no es tan rápido como el avión.'",
        answer: "The train isn't as fast as the plane.",
        accepted: ["The train isn't as fast as the plane.", "The train is not as fast as the plane."],
        feedback: "Desigualdad: isn't/is not + as + adjetivo + as."
      },
      {
        type: "error-detection",
        question: '"My car is as faster as your car."',
        options: [
          '"as faster as" debería ser "as fast as"',
          '"car" debería ser "cars"',
          '"is" debería ser "are"',
          "No hay error"
        ],
        answer: '"as faster as" debería ser "as fast as"',
        feedback: "Con as...as usamos el adjetivo en forma BASE: as fast as (no faster)."
      },
      {
        type: "multiple-choice",
        question: 'Reescribe: "A bus is cheaper than a taxi." — Usando not as...as:',
        options: [
          "A taxi is not as cheap as a bus.",
          "A bus is not as cheap as a taxi.",
          "A taxi is not as cheaper as a bus.",
          "A bus not as cheap than a taxi."
        ],
        answer: "A taxi is not as cheap as a bus.",
        feedback: "Si el bus es más barato, el taxi NO es tan barato como el bus."
      },
      {
        type: "word-order",
        question: "Forma una oración de igualdad:",
        words: ["popular", "Cycling", "jogging", "as", "is", "as"],
        answer: "Cycling is as popular as jogging",
        feedback: "Igualdad: sujeto + is + as + adjetivo + as + complemento."
      }
    ]
  },

  8: {
    id: 8,
    title: "Modificadores de Comparativos",
    unit: "Unit 3 — Transportation",
    unitNumber: 3,
    color: "#4caf76",
    icon: "📏",

    explain: {
      description: "Palabras que modifican el GRADO de diferencia entre dos cosas en una comparación.",
      whenToUse: [
        { icon: "📉", label: "Pequeña diferencia", example: "Taxis are a bit more expensive than buses." },
        { icon: "📈", label: "Gran diferencia", example: "Planes are much faster than trains." }
      ],
      rules: [
        { formula: "Diferencia PEQUEÑA: a bit / a little + comparativo", example: "The taxi is a bit faster." },
        { formula: "Diferencia GRANDE: much / a lot / far + comparativo", example: "The subway is much cheaper than a taxi." },
        { formula: "Van ANTES del comparativo", example: "a bit cheaper / much better" }
      ],
      exceptions: [
        "No uses 'very' con comparativos: ❌ 'very faster' → ✅ 'much faster'",
        "'far' como modificador es más formal: 'far more expensive'"
      ]
    },

    examples: [
      { en: "Sometimes these taxis are a bit cheaper and a little faster.", es: "A veces estos taxis son un poco más baratos y un poco más rápidos.", highlight: "a bit cheaper / a little faster" },
      { en: "Black-cab drivers are much faster because they know the best routes.", es: "Los taxistas de cab negro son mucho más rápidos porque conocen las mejores rutas.", highlight: "much faster" },
      { en: "They think private taxis are a lot less reliable.", es: "Creen que los taxis privados son mucho menos confiables.", highlight: "a lot less reliable" },
      { en: "The new subway line is far more efficient than the old buses.", es: "La nueva línea de metro es mucho más eficiente que los autobuses viejos.", highlight: "far more efficient" }
    ],

    exercises: [
      {
        type: "multiple-choice",
        question: '"The train is _____ faster than the bus." — Gran diferencia',
        options: ["a bit", "a little", "much", "more"],
        answer: "much",
        feedback: "Para una gran diferencia usamos 'much' antes del comparativo."
      },
      {
        type: "fill-blank",
        question: '"Taxis are _______ (a bit) more expensive than buses." — pequeña diferencia',
        answer: "a bit",
        accepted: ["a bit", "a little"],
        feedback: "Para una pequeña diferencia: a bit / a little + comparativo."
      },
      {
        type: "error-detection",
        question: '"The bus is very cheaper than the taxi."',
        options: [
          '"very" debería ser "much" o "a lot"',
          '"cheaper" debería ser "more cheap"',
          '"than" debería ser "that"',
          "No hay error"
        ],
        answer: '"very" debería ser "much" o "a lot"',
        feedback: "Con comparativos NO usamos 'very' — usamos 'much', 'a lot', 'far' o 'a bit'."
      },
      {
        type: "translation",
        question: "Traduce: 'El metro es mucho más rápido que el autobús.'",
        answer: "The subway is much faster than the bus.",
        accepted: ["The subway is much faster than the bus.", "The metro is much faster than the bus.", "The subway is a lot faster than the bus."],
        feedback: "Gran diferencia → much/a lot + comparativo + than."
      },
      {
        type: "matching",
        question: "Clasifica el modificador:",
        pairs: [
          { left: "a bit", right: "Diferencia pequeña" },
          { left: "much", right: "Diferencia grande" },
          { left: "a little", right: "Diferencia pequeña" },
          { left: "far", right: "Diferencia grande" }
        ]
      }
    ]
  },

  9: {
    id: 9,
    title: "Simple Past (Pasado Simple)",
    unit: "Unit 4 — Challenges",
    unitNumber: 4,
    color: "#e05252",
    icon: "⏮️",

    explain: {
      description: "Se usa para hablar de acciones o eventos completamente terminados en el pasado, normalmente con un tiempo específico.",
      whenToUse: [
        { icon: "✅", label: "Acción terminada en el pasado", example: "She climbed Mount Everest in 2015." },
        { icon: "📖", label: "Narrar eventos en orden", example: "She trained, competed, and won." },
        { icon: "🕐", label: "Tiempo pasado específico (yesterday, last year, in 2010)", example: "He went abroad in 1978." }
      ],
      rules: [
        { formula: "Verbos REGULARES: + -ed", example: "work → worked | live → lived | study → studied" },
        { formula: "Verbos IRREGULARES: forma especial (memorizar)", example: "go → went | have → had | grow → grew | be → was/were" },
        { formula: "NEGATIVO: didn't + verbo BASE", example: "She didn't win." },
        { formula: "PREGUNTA: Did + sujeto + verbo BASE?", example: "Did he study architecture?" },
        { formula: "BE: was (I/He/She/It) / were (You/We/They)", example: "Was she born in Nepal?" }
      ],
      exceptions: [
        "El verbo BE forma negativo/pregunta diferente: wasn't/weren't | Was/Were (sin 'did')",
        "Verbos en -e: solo añaden -d: live → lived | ride → rode (si irregular)",
        "Verbos CVC: doblan consonante: stop → stopped | plan → planned",
        "Verbos en consonante + y: cambian -y por -ied: study → studied | try → tried"
      ]
    },

    examples: [
      { en: "Pasang lived with her younger sister in Lukla.", es: "Pasang vivió con su hermana menor en Lukla.", highlight: "lived" },
      { en: "People didn't have homes or food.", es: "La gente no tenía casas ni comida.", highlight: "didn't have" },
      { en: "Where did you grow up?", es: "¿Dónde creciste?", highlight: "did...grow up" },
      { en: "Marjan grew up in Kabul.", es: "Marjan creció en Kabul.", highlight: "grew up" },
      { en: "He wasn't easy to become an architect.", es: "No fue fácil convertirse en arquitecto.", highlight: "wasn't" },
      { en: "When was she born?", es: "¿Cuándo nació ella?", highlight: "was...born" }
    ],

    exercises: [
      {
        type: "fill-blank",
        question: '"She _______ (grow) up in Afghanistan."',
        answer: "grew",
        accepted: ["grew"],
        feedback: "'grow' es irregular: grow → grew."
      },
      {
        type: "multiple-choice",
        question: '"People _____ have homes after the earthquake."',
        options: ["didn't", "doesn't", "wasn't", "weren't"],
        answer: "didn't",
        feedback: "Negativo de Simple Past: didn't + verbo base (para todos menos BE)."
      },
      {
        type: "error-detection",
        question: '"Did she studied architecture in college?"',
        options: [
          '"studied" debería ser "study"',
          '"Did" debería ser "Does"',
          '"in college" debería ser "at college"',
          "No hay error"
        ],
        answer: '"studied" debería ser "study"',
        feedback: "Con 'Did', el verbo va en forma BASE: 'Did she study...'"
      },
      {
        type: "fill-blank",
        question: '"He _______ (not / want) to take photos of local news."',
        answer: "didn't want",
        accepted: ["didn't want", "did not want"],
        feedback: "Negativo: didn't + verbo base: didn't want."
      },
      {
        type: "translation",
        question: "Traduce: '¿Cuándo fue ella a Kabul por primera vez?'",
        answer: "When did she go to Kabul for the first time?",
        accepted: ["When did she go to Kabul for the first time?", "When did she first go to Kabul?"],
        feedback: "Pregunta en Simple Past: When + did + sujeto + verbo base?"
      },
      {
        type: "multiple-choice",
        question: '"She _____ born in 1985."',
        options: ["was", "were", "did", "had"],
        answer: "was",
        feedback: "BE en pasado: I/He/She/It → was. No se usa 'did' con BE."
      },
      {
        type: "word-order",
        question: "Forma la pregunta:",
        words: ["she", "Where", "grow", "did", "up"],
        answer: "Where did she grow up",
        feedback: "Pregunta: Wh- + did + sujeto + verbo base."
      },
      {
        type: "matching",
        question: "Conecta el verbo con su forma en Simple Past:",
        pairs: [
          { left: "go", right: "went" },
          { left: "have", right: "had" },
          { left: "grow", right: "grew" },
          { left: "study", right: "studied" }
        ]
      }
    ]
  },

  10: {
    id: 10,
    title: "Past Continuous + Simple Past",
    unit: "Unit 4 — Challenges",
    unitNumber: 4,
    color: "#e05252",
    icon: "⏯️",

    explain: {
      description: "El Past Continuous describe una acción en progreso en el pasado. Se combina con el Simple Past para indicar que una acción más corta interrumpió a la más larga.",
      whenToUse: [
        { icon: "🔄", label: "Acción en progreso cuando otra la interrumpe", example: "While they were going down, Simpson fell." },
        { icon: "🎬", label: "Dos acciones simultáneas en el pasado", example: "He wasn't moving, but he was still breathing." },
        { icon: "🌅", label: "Descripción del contexto/fondo de una historia", example: "The sun was shining when they left." }
      ],
      rules: [
        { formula: "Past Continuous: was / were + verbo-ING", example: "They were going down the mountain." },
        { formula: "Negativo: was / were + NOT + verbo-ing", example: "He wasn't moving." },
        { formula: "WHILE + Past Continuous (acción larga)", example: "While she was sleeping, ..." },
        { formula: "WHEN + Simple Past (acción corta que interrumpe)", example: "...the phone rang." }
      ],
      exceptions: [
        "Los verbos 'stative' tampoco se usan en Past Continuous: ❌ 'I was knowing' → ✅ 'I knew'",
        "La cláusula con WHILE puede ir al inicio o al final: 'He fell while they were climbing.' / 'While they were climbing, he fell.'"
      ]
    },

    examples: [
      { en: "While they were going down the mountain, Simpson fell.", es: "Mientras bajaban la montaña, Simpson cayó.", highlight: "were going / fell" },
      { en: "He wasn't moving, but he was still breathing.", es: "No se estaba moviendo, pero todavía respiraba.", highlight: "wasn't moving / was still breathing" },
      { en: "The sun was shining when they left their tents.", es: "El sol brillaba cuando dejaron sus tiendas.", highlight: "was shining / left" },
      { en: "I was working when you called me.", es: "Estaba trabajando cuando me llamaste.", highlight: "was working / called" },
      { en: "What were you doing when the earthquake happened?", es: "¿Qué estabas haciendo cuando ocurrió el terremoto?", highlight: "were you doing / happened" }
    ],

    exercises: [
      {
        type: "fill-blank",
        question: '"While they _______ (go) down, Simpson fell."',
        answer: "were going",
        accepted: ["were going"],
        feedback: "Past Continuous: were + verbo-ing (para They)."
      },
      {
        type: "multiple-choice",
        question: '"The sun _____ when Yates left his tent."',
        options: ["was shining", "shone", "were shining", "is shining"],
        answer: "was shining",
        feedback: "Acción en progreso (fondo) → Past Continuous: was shining."
      },
      {
        type: "error-detection",
        question: '"While she was sleep, the phone rang."',
        options: [
          '"sleep" debería ser "sleeping"',
          '"rang" debería ser "was ringing"',
          '"While" debería ser "When"',
          "No hay error"
        ],
        answer: '"sleep" debería ser "sleeping"',
        feedback: "Past Continuous necesita verbo-ing: was sleeping."
      },
      {
        type: "translation",
        question: "Traduce: '¿Qué estabas haciendo cuando ocurrió el accidente?'",
        answer: "What were you doing when the accident happened?",
        accepted: ["What were you doing when the accident happened?", "What were you doing when the accident occurred?"],
        feedback: "Pregunta en Past Continuous: What + were + sujeto + verbo-ing?"
      },
      {
        type: "multiple-choice",
        question: '"He broke his knee while he _____ down the mountain."',
        options: ["went", "goes", "was going", "is going"],
        answer: "was going",
        feedback: "La acción continua (fondo) usa Past Continuous: was going."
      },
      {
        type: "fill-blank",
        question: '"I _______ (work) on my own when a group came in."',
        answer: "was working",
        accepted: ["was working"],
        feedback: "I + was + verbo-ing."
      },
      {
        type: "word-order",
        question: "Ordena:",
        words: ["was", "She", "when", "studying", "called", "I"],
        answer: "She was studying when I called",
        feedback: "Past Continuous (acción larga) + when + Simple Past (acción corta)."
      },
      {
        type: "matching",
        question: "¿Qué forma va con cada conector?",
        pairs: [
          { left: "while + ___ (acción larga)", right: "Past Continuous (was/were -ing)" },
          { left: "when + ___ (acción que interrumpe)", right: "Simple Past (-ed / irregular)" },
          { left: "He wasn't ___", right: "Past Continuous negativo" },
          { left: "The sun ___ (shine) when we left.", right: "was shining" }
        ]
      }
    ]
  }
};

const DAILY_PHRASES = [
  {
    day: 1,
    en: "I often get home late from work, but I always feel better after a good night's sleep.",
    es: "A menudo llego tarde a casa del trabajo, pero siempre me siento mejor después de dormir bien.",
    topics: ["Simple Present", "Adverbios de Frecuencia"]
  },
  {
    day: 2,
    en: "While I was cooking dinner, my friend called me with great news.",
    es: "Mientras cocinaba la cena, mi amigo me llamó con buenas noticias.",
    topics: ["Past Continuous", "Simple Past"]
  },
  {
    day: 3,
    en: "Taking the subway is much faster than driving during rush hour.",
    es: "Tomar el metro es mucho más rápido que manejar durante la hora pico.",
    topics: ["-ing form", "Modificadores de comparativos"]
  },
  // ... (continuar hasta día 30)
];

