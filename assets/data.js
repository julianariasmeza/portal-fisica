
window.PORTAL = {
  modules: [
    {
      id: 'vectores',
      icon: '↗',
      name: 'Magnitudes y vectores',
      tag: 'Fundamentos',
      color: '#7359e8',
      description: 'Magnitudes escalares y vectoriales, representación, suma, componentes y fuerzas concurrentes.',
      presentation: '1-2.tex',
      practice: 'practicavectores.tex',
      sections: [
        'Magnitudes escalares y vectoriales',
        'Representación de vectores',
        'Suma gráfica de vectores',
        'Vectores perpendiculares',
        'Componentes rectangulares',
        'Fuerzas concurrentes'
      ],
      concepts: [
        {
          title: 'Magnitudes escalares y vectoriales',
          text: 'Una magnitud escalar se describe mediante un valor y una unidad. Una magnitud vectorial requiere además dirección y sentido.',
          formula: '\\vec{A}'
        },
        {
          title: 'Componentes rectangulares',
          text: 'Si el ángulo se mide desde el eje horizontal positivo, las componentes se obtienen mediante seno y coseno.',
          formula: 'A_x=A\\cos(\\theta),\\quad A_y=A\\sin(\\theta)'
        },
        {
          title: 'Magnitud de un vector',
          text: 'Las componentes perpendiculares forman un triángulo rectángulo.',
          formula: '|\\vec{A}|=\\sqrt{A_x^2+A_y^2}'
        }
      ],
      example: {
        title: 'Componentes de una fuerza',
        statement: 'Una fuerza de 50 N forma un ángulo de 30° con el eje horizontal positivo. Determiná sus componentes.',
        steps: [
          'Datos: F = 50 N; θ = 30°.',
          'Fₓ = F cos(θ) = 50 cos(30°) = 43,30 N.',
          'Fᵧ = F sen(θ) = 50 sen(30°) = 25,00 N.'
        ],
        answer: 'Fₓ = 43,30 N; Fᵧ = 25,00 N.'
      },
      quiz: [
        {
          q: '¿Cuál de estas magnitudes es vectorial?',
          options: ['Masa', 'Temperatura', 'Desplazamiento', 'Tiempo'],
          correct: 2,
          why: 'El desplazamiento tiene magnitud, dirección y sentido.'
        },
        {
          q: 'Un vector de 10 N apunta horizontalmente a la derecha. Su componente vertical es:',
          options: ['10 N', '0 N', '−10 N', '5 N'],
          correct: 1,
          why: 'El vector no tiene componente vertical.'
        },
        {
          q: 'Dos vectores perpendiculares de 3 N y 4 N tienen una resultante de:',
          options: ['7 N', '1 N', '12 N', '5 N'],
          correct: 3,
          why: 'Por Pitágoras: √(3²+4²) = 5 N.'
        }
      ]
    },

    {
      id: 'relativo',
      icon: '⇄',
      name: 'Movimiento relativo',
      tag: 'Cinemática',
      color: '#168d9b',
      description: 'Observadores, sistemas de referencia, vehículos y pasajeros en movimiento.',
      presentation: '2-2.tex',
      practice: 'practicamorelativo.tex',
      sections: [
        'Sistemas de referencia',
        'Velocidad relativa',
        'Vehículos en el mismo sentido',
        'Vehículos en sentidos contrarios',
        'Autobús y pasajeros',
        'Observadores externos'
      ],
      concepts: [
        {
          title: 'El movimiento depende del observador',
          text: 'Una persona sentada en un autobús está en reposo respecto al autobús, pero se mueve respecto al suelo.',
          formula: 'v_{P/S}=v_{P/B}+v_{B/S}'
        },
        {
          title: 'Velocidad relativa',
          text: 'En una dimensión se utilizan velocidades con signo; el signo indica el sentido.',
          formula: 'v_{A/B}=v_{A/S}-v_{B/S}'
        },
        {
          title: 'Rapidez relativa',
          text: 'La rapidez relativa es el valor absoluto de la velocidad relativa.',
          formula: '\\text{Rapidez relativa}=|v_{A/B}|'
        }
      ],
      example: {
        title: 'Pasajero dentro de un autobús',
        statement: 'Un autobús se mueve al este a 60 km/h. Un pasajero camina hacia atrás a 5 km/h respecto al autobús. ¿Cuál es su velocidad respecto al suelo?',
        steps: [
          'Datos: v₍bus/suelo₎ = +60 km/h; v₍pasajero/bus₎ = −5 km/h.',
          'v₍pasajero/suelo₎ = v₍pasajero/bus₎ + v₍bus/suelo₎.',
          'v₍pasajero/suelo₎ = −5 + 60 = +55 km/h.'
        ],
        answer: '55 km/h hacia el este respecto al suelo.'
      },
      quiz: [
        {
          q: 'Una persona sentada dentro de un autobús está, respecto al autobús:',
          options: ['Acelerando', 'En reposo', 'Moviéndose hacia atrás', 'En caída libre'],
          correct: 1,
          why: 'Su posición respecto al autobús no cambia.'
        },
        {
          q: 'A viaja a +80 km/h y B a +50 km/h. ¿Cuánto vale v(A/B)?',
          options: ['+130 km/h', '−30 km/h', '+30 km/h', '+50 km/h'],
          correct: 2,
          why: '80 − 50 = +30 km/h.'
        },
        {
          q: 'Un autobús va a +60 km/h y una persona camina hacia atrás a −5 km/h respecto a él. Respecto al suelo va a:',
          options: ['+55 km/h', '−65 km/h', '+65 km/h', '−55 km/h'],
          correct: 0,
          why: '−5 + 60 = +55 km/h.'
        }
      ]
    },

    {
      id: 'mrua',
      icon: '◉',
      name: 'MRUA y caída libre',
      tag: 'Cinemática',
      color: '#e08a38',
      description: 'Aceleración constante, frenado, caída libre y lanzamientos verticales.',
      presentation: '3-2.tex',
      practice: 'practicaMRUA.tex',
      sections: [
        'MRUA horizontal',
        'Velocidad y aceleración',
        'Frenado y desaceleración',
        'Caída libre desde el reposo',
        'Lanzamiento hacia abajo',
        'Lanzamiento hacia arriba'
      ],
      concepts: [
        {
          title: 'Aceleración constante',
          text: 'La velocidad cambia la misma cantidad en intervalos de tiempo iguales.',
          formula: 'a=\\frac{v-v_0}{t}'
        },
        {
          title: 'Ecuaciones del MRUA',
          text: 'Estas expresiones suponen aceleración constante y desplazamiento con signo.',
          formula: 'v=v_0+at,\\quad d=v_0t+\\frac{at^2}{2}'
        },
        {
          title: 'Ecuación sin tiempo',
          text: 'Se utiliza cuando no se conoce ni se necesita el tiempo.',
          formula: 'v^2=v_0^2+2ad'
        },
        {
          title: 'Caída libre',
          text: 'En un modelo ideal, sin resistencia del aire, la aceleración gravitatoria tiene magnitud 9,8 m/s². El signo depende del eje elegido.',
          formula: 'g=9,8\\;\\mathrm{m/s^2}'
        }
      ],
      example: {
        title: 'Automóvil que parte del reposo',
        statement: 'Un automóvil parte del reposo y acelera uniformemente a 2,5 m/s² durante 8 s. Calculá su velocidad final y desplazamiento.',
        steps: [
          'Datos: v₀ = 0 m/s; a = 2,5 m/s²; t = 8 s.',
          'v = v₀ + at = 0 + 2,5(8) = 20 m/s.',
          'd = v₀t + at²/2 = 0 + 2,5(8²)/2 = 80 m.'
        ],
        answer: 'v = 20 m/s; d = 80 m.'
      },
      quiz: [
        {
          q: 'La unidad SI de aceleración es:',
          options: ['m/s', 'm/s²', 'km/h', 'm²/s'],
          correct: 1,
          why: 'La aceleración es cambio de velocidad por unidad de tiempo.'
        },
        {
          q: 'Un objeto parte del reposo con a = 3 m/s² durante 4 s. Su velocidad final es:',
          options: ['7 m/s', '3 m/s', '12 m/s', '24 m/s'],
          correct: 2,
          why: 'v = 0 + 3(4) = 12 m/s.'
        },
        {
          q: 'Con el eje positivo hacia arriba, la aceleración gravitatoria es:',
          options: ['+9,8 m/s²', '0 m/s²', '−9,8 m/s²', 'Depende de la masa'],
          correct: 2,
          why: 'La gravedad apunta hacia abajo.'
        }
      ]
    },

    {
      id: 'graficas',
      icon: '⌁',
      name: 'Gráficas del movimiento',
      tag: 'Representación',
      color: '#d35d87',
      description: 'Interpretación de gráficas d–t, rapidez–tiempo y velocidad–tiempo.',
      presentation: '4.tex',
      practice: 'practicagraficas.tex',
      sections: [
        'Distancia y desplazamiento',
        'Gráficas posición–tiempo',
        'Pendiente y velocidad',
        'Gráficas rapidez–tiempo',
        'Áreas bajo la curva',
        'Gráficas velocidad–tiempo'
      ],
      concepts: [
        {
          title: 'Gráfica posición–tiempo',
          text: 'La pendiente de una gráfica de posición en función del tiempo representa la velocidad en el intervalo.',
          formula: 'v=\\frac{\\Delta d}{\\Delta t}'
        },
        {
          title: 'Gráfica rapidez–tiempo',
          text: 'El área bajo la curva representa la distancia recorrida.',
          formula: '\\text{Distancia}=\\text{área bajo la curva}'
        },
        {
          title: 'Gráfica velocidad–tiempo',
          text: 'El área algebraica bajo la curva representa el desplazamiento; las regiones negativas se restan.',
          formula: '\\Delta d=\\text{área con signo}'
        }
      ],
      example: {
        title: 'Interpretación de una gráfica d–t',
        statement: 'Un móvil cambia de posición de 2 m a 14 m entre t = 1 s y t = 5 s. Determiná su velocidad media.',
        steps: [
          'Datos: d₁ = 2 m; d₂ = 14 m; t₁ = 1 s; t₂ = 5 s.',
          'v = Δd/Δt = (14 − 2)/(5 − 1).',
          'v = 12/4 = 3 m/s.'
        ],
        answer: 'v = +3 m/s.'
      },
      quiz: [
        {
          q: 'En una gráfica posición–tiempo, la pendiente representa:',
          options: ['Aceleración', 'Fuerza', 'Velocidad', 'Masa'],
          correct: 2,
          why: 'v = Δd/Δt.'
        },
        {
          q: 'El área bajo una gráfica rapidez–tiempo representa:',
          options: ['Distancia', 'Aceleración', 'Masa', 'Tiempo'],
          correct: 0,
          why: 'El área tiene unidades de (m/s)·s = m.'
        },
        {
          q: 'Una línea horizontal en una gráfica posición–tiempo indica:',
          options: [
            'Velocidad constante distinta de cero',
            'Reposo',
            'Aceleración constante',
            'Caída libre'
          ],
          correct: 1,
          why: 'La posición no cambia con el tiempo.'
        }
      ]
    },

    {
      id: 'dinamica',
      icon: '⚖',
      name: 'Dinámica y leyes de Newton',
      tag: 'Dinámica',
      color: '#3469b3',
      description: 'Segunda ley de Newton, diagramas de cuerpo libre, fuerza normal, fricción, planos inclinados y sistemas de poleas.',
      presentation: '5.tex',
      practice: 'practicanewton3.tex',
      sections: [
        'Leyes de Newton',
        'Diagramas de cuerpo libre',
        'Fuerzas horizontales e inclinadas',
        'Fuerza normal y fricción',
        'Planos inclinados',
        'Máquina de Atwood',
        'Bloques conectados mediante poleas'
      ],
      concepts: [
        {
          title: 'Segunda ley de Newton',
          text: 'La fuerza resultante sobre un cuerpo es igual al producto de su masa por la aceleración.',
          formula: '\\sum F=ma'
        },
        {
          title: 'Peso de un cuerpo',
          text: 'El peso es la fuerza gravitatoria que actúa sobre un cuerpo.',
          formula: 'P=mg'
        },
        {
          title: 'Componentes de una fuerza',
          text: 'Cuando el ángulo se mide respecto al eje horizontal, se utilizan coseno y seno para obtener las componentes.',
          formula: 'F_x=F\\cos\\theta,\\quad F_y=F\\sin\\theta'
        },
        {
          title: 'Fuerza de fricción cinética',
          text: 'La fricción cinética se opone al deslizamiento relativo entre dos superficies.',
          formula: 'f_k=\\mu_k N'
        },
        {
          title: 'Plano inclinado',
          text: 'El peso se descompone en una componente paralela y otra perpendicular al plano.',
          formula: 'P_x=mg\\sin\\theta,\\quad P_y=mg\\cos\\theta'
        },
        {
          title: 'Máquina de Atwood',
          text: 'Para dos masas colgantes unidas por una cuerda ideal, la aceleración depende de la diferencia de sus pesos.',
          formula: 'a=\\frac{P_{mayor}-P_{menor}}{m_1+m_2}'
        },
        {
          title: 'Bloque horizontal y masa colgante',
          text: 'Si la masa colgante desciende y existe fricción sobre el bloque horizontal, esta se opone al movimiento.',
          formula: 'a=\\frac{P_{colgante}-f_k}{m_1+m_2}'
        }
      ],
      example: {
        title: 'Bloque horizontal con fricción y polea',
        statement: 'Un bloque de 20 kg está conectado mediante una cuerda ideal a una masa colgante de 33 kg. Si la fricción cinética sobre el bloque es de 21,56 N, determiná la aceleración y la tensión. Utilizá g = 9,8 m/s².',
        steps: [
          'Datos: m₁ = 20 kg; m₂ = 33 kg; fₖ = 21,56 N; g = 9,8 m/s².',
          'Peso colgante: P₂ = 33(9,8) = 323,4 N.',
          'Aceleración: a = (P₂ − fₖ)/(m₁ + m₂).',
          'a = (323,4 − 21,56)/(20 + 33) = 5,70 m/s².',
          'Tensión: T = m₁a + fₖ.',
          'T = 20(301,84/53) + 21,56 = 135,46 N.'
        ],
        answer: 'a ≈ 5,70 m/s²; T ≈ 135,46 N.'
      },
      quiz: [
        {
          q: '¿Cuál es la expresión de la segunda ley de Newton?',
          options: ['P = mg', 'ΣF = ma', 'v = d/t', 'f = μN'],
          correct: 1,
          why: 'La fuerza resultante es igual a la masa multiplicada por la aceleración.'
        },
        {
          q: 'Un bloque de 10 kg recibe una fuerza resultante de 50 N. ¿Cuál es su aceleración?',
          options: ['0,2 m/s²', '50 m/s²', '5 m/s²', '500 m/s²'],
          correct: 2,
          why: 'a = F/m = 50/10 = 5 m/s².'
        },
        {
          q: 'Un bloque de 20 kg está sobre una superficie horizontal. Si μₖ = 0,20, ¿cuánto vale la fricción cinética?',
          options: ['196 N', '39,2 N', '98 N', '4 N'],
          correct: 1,
          why: 'N = 20(9,8) = 196 N; fₖ = 0,20(196) = 39,2 N.'
        },
        {
          q: 'En un plano inclinado, ¿cuál es la componente del peso paralela al plano?',
          options: ['mg cos θ', 'mg', 'mg sen θ', 'ma'],
          correct: 2,
          why: 'La componente paralela del peso tiene magnitud mg sen θ.'
        },
        {
          q: 'En una máquina de Atwood ideal con masas diferentes, ¿cuál masa desciende?',
          options: ['La menor', 'La mayor', 'Ambas', 'Ninguna'],
          correct: 1,
          why: 'La masa mayor tiene un peso mayor y desciende.'
        }
      ]
    }
  ]
};

