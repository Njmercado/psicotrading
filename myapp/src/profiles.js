const PROFILES = [
  {
    id: 'estratega_sereno',
    name: 'ESTRATEGA SERENO',
    ranges: { CONTROL: [80,100], DISCIPLINA: [80,100], GESTION: [75,100], TOLERANCIA: [70,90], SESGOS: [65,85] },
    desc: 'Eres un trader analítico, paciente y emocionalmente estable. Tomas decisiones racionales basadas en datos, no en impulsos. Mantienes la calma incluso cuando el mercado se mueve violentamente en tu contra. Tu fortaleza principal es la consistencia: sigues tu plan sin importar lo que sienta tu cuerpo. Rara vez te dejas arrastrar por la euforia de las ganancias o el pánico de las pérdidas. Operas como un cirujano: preciso, metódico, sin prisa. Tu mayor riesgo es el exceso de análisis que te hace perder oportunidades claras o el perfeccionismo que no te permite tolerar errores normales.'
  },
  {
    id: 'trader_reactivo',
    name: 'TRADER REACTIVO',
    ranges: { CONTROL: [20,45], DISCIPLINA: [25,50], GESTION: [30,50], TOLERANCIA: [20,45], SESGOS: [35,55] },
    desc: 'Actúas rápido, casi instintivamente, ante los movimientos del mercado. Tu cuerpo reacciona antes que tu mente: abres operaciones impulsivamente, modificas stop loss en caliente, cierras posiciones por miedo súbito. Tus emociones están a flor de piel cuando operas: sientes cada vela, cada tick, cada cambio. La frustración te consume rápidamente y te cuesta esperar confirmaciones porque la ansiedad te empuja a "hacer algo". Después de perder, entras en modo venganza automáticamente. Tienes energía, pasión y velocidad de respuesta, pero tu trading es una montaña rusa emocional. Un día ganas mucho, al siguiente pierdes más. Tu mayor enemigo eres tú mismo cuando estás alterado.'
  },
  {
    id: 'trader_resiliente',
    name: 'TRADER RESILIENTE',
    ranges: { CONTROL: [65,85], DISCIPLINA: [60,80], GESTION: [60,80], TOLERANCIA: [75,100], SESGOS: [60,75] },
    desc: 'Te levantas rápido después de caer. Una pérdida no te destruye; te enseña. Mantienes una visión de largo plazo incluso en rachas difíciles. No te rindes fácilmente y transformas errores en aprendizaje sin dramatismo. Tu estabilidad emocional no viene de no sentir, sino de saber procesar lo que sientes. Puedes perder 3 trades seguidos y en el cuarto operar con la misma claridad mental. Aceptas que el trading es probabilidad, no certeza, y eso te da paz. Tu fortaleza es la adaptabilidad: ajustas, mejoras, sigues. Pero a veces cargas demasiado emocionalmente sin darte cuenta, porque "aguantar" se volvió tu identidad. Cuidado con no tomarte los descansos que necesitas.'
  },
  {
    id: 'trader_analitico',
    name: 'TRADER ANALÍTICO',
    ranges: { CONTROL: [65,85], DISCIPLINA: [75,95], GESTION: [80,100], TOLERANCIA: [60,80], SESGOS: [70,90] },
    desc: 'Evalúas cada movimiento antes de actuar. Tu mente funciona como un algoritmo: lógica, datos, probabilidades. Priorizas la estructura sobre la intuición y la razón sobre la emoción. Calculas riesgos con precisión casi obsesiva. Llevas registro detallado de todo. No entras en operaciones "porque sí"; necesitas confirmación técnica, fundamental y emocional. Eres estable, predecible y racional. Tu fortaleza es la gestión impecable del riesgo. Pero a veces pierdes oportunidades por exceso de cautela. Analizas tanto que el momento pasa. Tu parálisis no viene del miedo, sino del perfeccionismo analítico. Tu mente es tu mayor herramienta... y tu mayor obstáculo.'
  },
  {
    id: 'trader_intuitivo',
    name: 'TRADER INTUITIVO',
    ranges: { CONTROL: [50,70], DISCIPLINA: [45,65], GESTION: [45,65], TOLERANCIA: [50,70], SESGOS: [40,60] },
    desc: 'Tomas decisiones rápidas basadas en "sensaciones" que no siempre puedes explicar. Tu experiencia te da un "olfato" para el mercado. Percibes dinámicas que otros no ven. Eres creativo, espontáneo y flexible. No necesitas 10 indicadores; con un vistazo "sabes" hacia dónde va el precio. Esta intuición te ha dado grandes aciertos... y también grandes pérdidas. Porque a veces confundes intuición con deseo. Ves patrones donde no los hay. Actúas antes de confirmar. Tu mente rápida es tu ventaja competitiva, pero también tu talón de Aquiles cuando tus emociones distorsionan lo que "sientes". Necesitas equilibrar tu don con objetividad.'
  },
  {
    id: 'trader_emocionalmente_conectado',
    name: 'TRADER EMOCIONALMENTE CONECTADO',
    ranges: { CONTROL: [70,90], DISCIPLINA: [60,80], GESTION: [60,75], TOLERANCIA: [70,90], SESGOS: [60,75] },
    desc: 'Operas desde la conexión con tus emociones, sin reprimirlas ni negarlas. Reconoces cuando sientes miedo, codicia, frustración... y puedes nombrarlas antes de que tomen control. Tu autoconciencia emocional es tu superpoder. No eres frío ni robótico; eres humano y consciente. Sabes cuándo parar porque tu cuerpo te habla. Respetas tus límites emocionales y mentales. No operas "en piloto automático"; cada decisión es intencional. Tu fortaleza es el equilibrio entre sentir y decidir. Pero a veces la sobreempatía contigo mismo (o con "el mercado") te hace dudar. Y el miedo a fallar puede paralizarte más de lo que admites.'
  },
  {
    id: 'trader_visionario',
    name: 'TRADER VISIONARIO',
    ranges: { CONTROL: [70,90], DISCIPLINA: [80,100], GESTION: [75,95], TOLERANCIA: [75,95], SESGOS: [70,90] },
    desc: 'Combinas pensamiento estratégico con autoconocimiento profundo. No solo operas; estudias, mejoras, evolucionas constantemente. Tienes mentalidad de crecimiento: cada experiencia es data para optimizar tu sistema. Eres analítico pero flexible, disciplinado pero adaptable. Mantienes una actitud realista sin perder la ambición. Tu visión es de largo plazo: sabes que hoy es un día de un proceso de años. No te apuras. No te desesperas. Confías en tu método porque lo has construido con paciencia. Tu punto fuerte es la adaptabilidad inteligente. Pero a veces te dispersas entre nuevas estrategias, libros, cursos, ideas... y pierdes foco en ejecutar lo que ya funciona.'
  },
  {
    id: 'trader_caotico',
    name: 'TRADER CAÓTICO',
    ranges: { CONTROL: [15,40], DISCIPLINA: [20,45], GESTION: [25,45], TOLERANCIA: [20,40], SESGOS: [30,50] },
    desc: 'Tu trading es impredecible, incluso para ti mismo. No tienes rutina estable. Un día sigues un plan, al siguiente improvisas completamente. Cambias de estrategia cada semana. Operas por impulso, por aburrimiento, por FOMO, por venganza. Tu gestión del riesgo es inconsistente: a veces arriesgas 1%, otras veces 20%. No llevas registro. No analizas tus errores. Tu mente está constantemente dispersa entre mil ideas. Sientes que "deberías" ser disciplinado, pero no lo logras. Después de cada pérdida prometes cambiar... y vuelves a lo mismo. Tu trading refleja caos interno. No es falta de inteligencia; es falta de estructura mental y emocional.'
  },
  {
    id: 'trader_perfeccionista',
    name: 'TRADER PERFECCIONISTA',
    ranges: { CONTROL: [50,70], DISCIPLINA: [70,90], GESTION: [70,90], TOLERANCIA: [40,60], SESGOS: [65,85] },
    desc: 'No toleras errores. Cada pérdida se siente como un fracaso personal. Tienes altos estándares para ti mismo y sufres cuando no los alcanzas. Eres disciplinado, analítico y meticuloso... pero eso te agota emocionalmente. Revisas tus operaciones mil veces. Te culpas por pérdidas normales. No celebras ganancias porque "pudieron ser mejores". Tu autoexigencia es brutal. Operas con miedo constante de equivocarte, lo que te hace dudar en entradas válidas. Tu búsqueda de perfección te paraliza más que te impulsa. Un trade perdedor puede arruinar tu día completo. Tu peor enemigo no es el mercado; es tu crítico interno que nunca está satisfecho.'
  },
  {
    id: 'trader_ansioso',
    name: 'TRADER ANSIOSO',
    ranges: { CONTROL: [30,55], DISCIPLINA: [45,65], GESTION: [40,60], TOLERANCIA: [35,55], SESGOS: [45,65] },
    desc: 'No puedes dejar de mirar los gráficos. Revisas tu celular cada 5 minutos. Piensas en el mercado incluso cuando no estás operando. Tu mente no descansa. Sientes inquietud constante, como si algo malo fuera a pasar. Cierras operaciones ganadoras demasiado pronto por miedo. Ajustas stop loss constantemente. Micromanagement extremo. Te cuesta dormir en días de operaciones abiertas. Tu cuerpo está en alerta permanente: taquicardia, tensión, pensamientos intrusivos. Operas no desde la estrategia, sino desde la necesidad de "controlar" la incertidumbre. Pero mientras más intentas controlar, más ansioso te vuelves. El trading se convirtió en tu fuente de estrés, no de libertad.'
  },
  {
    id: 'trader_impaciente',
    name: 'TRADER IMPACIENTE',
    ranges: { CONTROL: [45,65], DISCIPLINA: [40,60], GESTION: [35,55], TOLERANCIA: [40,60], SESGOS: [45,65] },
    desc: 'No puedes esperar. Si el mercado está lento, fuerzas entradas. Si no hay setup, inventas uno. La paciencia te resulta físicamente imposible. Necesitas acción constante. El aburrimiento te empuja a operar sin razón técnica. Cierras ganancias demasiado rápido porque "algo es mejor que nada". No dejas que tus trades respiren. Abandonas estrategias antes de darles tiempo de funcionar. Quieres resultados inmediatos. La palabra "esperar" no existe en tu vocabulario de trading. Tu velocidad puede ser ventaja... o autodestrucción. Porque en trading, a veces no hacer nada es hacer todo. Y tú no puedes quedarte quieto.'
  },
  {
    id: 'trader_dependiente',
    name: 'TRADER DEPENDIENTE',
    ranges: { CONTROL: [40,60], DISCIPLINA: [35,55], GESTION: [40,60], TOLERANCIA: [40,60], SESGOS: [40,60] },
    desc: 'Necesitas validación externa constante. Preguntas a otros si tu análisis es correcto. Copias señales de otros traders sin entenderlas. Buscas confirmación en grupos de Telegram, foros, redes sociales. No confías en tu propio criterio. Cuando ganas, atribuyes el éxito a "la suerte" o "la señal". Cuando pierdes, culpas a quien seguiste. Tu identidad como trader depende de la aprobación de otros. No has desarrollado tu propia voz. Operas desde la inseguridad, no desde la convicción. Tu mayor miedo no es perder dinero; es estar equivocado y que otros lo vean. Necesitas construir confianza interna, no buscar muletas externas.'
  },
  {
    id: 'trader_disociado',
    name: 'TRADER DISOCIADO',
    ranges: { CONTROL: [45,65], DISCIPLINA: [50,70], GESTION: [35,55], TOLERANCIA: [50,70], SESGOS: [50,70] },
    desc: 'Operas en "piloto automático". No sientes casi nada cuando ganas o pierdes. Tu desconexión emocional parece fortaleza, pero es disociación. No estás presente en tus operaciones. No registras, no analizas, no aprendes... porque no procesas. Tu indiferencia no es paz; es entumecimiento. Operas como si no fuera tu dinero, como si no importara. A veces arriesgas de más porque "no sientes" el peso de la pérdida. Esta desconexión protege tu ego del dolor, pero también te desconecta del aprendizaje. No puedes mejorar lo que no sientes. Tu reto es volver a conectar con tu experiencia sin colapsar emocionalmente.'
  },
  {
    id: 'trader_en_recuperacion',
    name: 'TRADER EN RECUPERACIÓN',
    ranges: { CONTROL: [50,70], DISCIPLINA: [55,75], GESTION: [50,70], TOLERANCIA: [60,80], SESGOS: [55,75] },
    desc: 'Has tenido pérdidas grandes. Quiebres emocionales. Rachas devastadoras. Pero estás aquí. Reconstruyéndote. Ya no operas desde la desesperación como antes. Estás aprendiendo a reconocer tus patrones. A ponerles nombre. A pausar cuando antes explotabas. Todavía tienes días malos, pero ya no te destruyen por completo. Estás en proceso de sanación. Tu trading está mejorando porque TÚ estás mejorando. Hay progreso, no perfección. Recaídas, pero también resilencia. Sabes que el camino es largo, pero por primera vez en mucho tiempo... tienes esperanza realista. Estás construyendo algo sostenible. Lento, pero real.'
  },
  {
    id: 'trader_equilibrado',
    name: 'TRADER EQUILIBRADO',
    ranges: { CONTROL: [65,85], DISCIPLINA: [65,85], GESTION: [65,85], TOLERANCIA: [65,85], SESGOS: [65,85] },
    desc: 'No eres perfecto, pero eres consistente. Tienes días buenos y malos, pero tu rango emocional es manejable. Sigues tu plan la mayoría de las veces. Cometes errores, los reconoces y ajustas. No te dejas arrastrar por euforia ni destruir por miedo. Tu gestión del riesgo es sólida sin ser rígida. Tienes conciencia de tus sesgos y trabajas activamente en ellos. No eres el mejor trader técnicamente, pero eres estable psicológicamente. Y eso, en trading, vale más que cualquier estrategia. Tu fortaleza es la sostenibilidad. Puedes hacer esto por años sin quemarte. Porque encontraste el equilibrio entre ambición y paz mental.'
  }
];

export default PROFILES;
