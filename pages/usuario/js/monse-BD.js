//  monse-BD.js  —  Base de datos simulada

const monseBD = [
  {
    id: 1,
    cargo: "Jefe de bodega",
    empresa: "Distribuidora Nacional S.A.",
    categoria: "Logística y transporte",
    departamento: "Santa Ana",
    ciudad: "Santa Ana",
    salario: "$500 - $650 mensuales",
    rangoSalario: "$450 - $600",
    horario: "Lunes a sábado — 8:00 am a 5:00 pm",
    contrato: "Contrato por tiempo indefinido",
    jornada: "Tiempo completo",
    modalidad: "Presencial",
    experiencia: "2 - 3 años",
    diasAtras: 20,
    descripcion: "Responsable de la organización, control y supervisión de bodegas, inventarios y procesos logísticos. Garantiza el flujo correcto de productos y materiales dentro de la empresa.",
    responsabilidades: [
      "Supervisar entradas y salidas de inventario.",
      "Controlar niveles de stock y generar reportes.",
      "Coordinar al personal de bodega.",
      "Verificar calidad y estado de los productos.",
      "Organizar rutas internas de distribución."
    ],
    requisitos: [
      "Bachillerato o técnico en logística.",
      "2 años de experiencia como encargado o asistente de bodega.",
      "Manejo de inventarios y paquetes de office.",
      "Buena organización y liderazgo."
    ],
    beneficios: [
      "Prestaciones de ley.",
      "Oportunidad de crecimiento.",
      "Ambiente laboral estable."
    ]
  },
  {
    id: 2,
    cargo: "Diseñador gráfico junior",
    empresa: "Agencia Creativa CTRL",
    categoria: "Diseño gráfico",
    departamento: "San Salvador",
    ciudad: "San Salvador",
    salario: "$450 - $550 mensuales",
    rangoSalario: "$450 - $600",
    horario: "Lunes a viernes — 8:00 am a 5:00 pm",
    contrato: "Contrato a plazo fijo",
    jornada: "Tiempo completo",
    modalidad: "Híbrido",
    experiencia: "1 - 2 años",
    diasAtras: 3,
    descripcion: "Creación de piezas visuales para redes sociales, materiales impresos y branding de clientes nacionales.",
    responsabilidades: [
      "Diseñar piezas para redes sociales y campañas.",
      "Editar fotos y videos cortos.",
      "Trabajar con el equipo creativo.",
      "Cumplir con tiempos de entrega."
    ],
    requisitos: [
      "Conocimiento en Adobe Illustrator y Photoshop.",
      "Portafolio de trabajos previos.",
      "Actitud proactiva y creativa."
    ],
    beneficios: [
      "Horario flexible.",
      "Trabajo híbrido.",
      "Capacitaciones mensuales."
    ]
  },
  {
    id: 3,
    cargo: "Desarrollador web Frontend",
    empresa: "TechApps El Salvador",
    categoria: "Tecnología / IT",
    departamento: "Sonsonate",
    ciudad: "Sonsonate",
    salario: "$800 - $1,200 mensuales",
    rangoSalario: "$800 - $1,000",
    horario: "Lunes a viernes — flexible",
    contrato: "Contrato freelance",
    jornada: "Medio tiempo",
    modalidad: "Remoto",
    experiencia: "1 - 2 años",
    diasAtras: 10,
    descripcion: "Desarrollo de interfaces modernas con React y Tailwind para aplicaciones web de clientes nacionales e internacionales.",
    responsabilidades: [
      "Desarrollar componentes en React.",
      "Integrar APIs REST.",
      "Colaborar con diseñadores UX.",
      "Mantener código limpio y documentado."
    ],
    requisitos: [
      "Conocimiento de HTML, CSS, JavaScript y React.",
      "Manejo de Git.",
      "Comunicación efectiva en remoto."
    ],
    beneficios: [
      "Trabajo 100% remoto.",
      "Pago en dólares.",
      "Horario flexible."
    ]
  },
  {
    id: 4,
    cargo: "Asistente contable",
    empresa: "Auditoría & Finanzas S.A.",
    categoria: "Contabilidad y finanzas",
    departamento: "San Salvador",
    ciudad: "San Salvador",
    salario: "$400 - $500 mensuales",
    rangoSalario: "$300 - $450",
    horario: "Lunes a viernes — 8:00 am a 5:00 pm",
    contrato: "Contrato por tiempo indefinido",
    jornada: "Tiempo completo",
    modalidad: "Presencial",
    experiencia: "Sin experiencia",
    diasAtras: 1,
    descripcion: "Apoyo al departamento de contabilidad en el registro de transacciones, conciliaciones bancarias y reportes financieros.",
    responsabilidades: [
      "Registrar facturas y comprobantes.",
      "Apoyar en declaraciones de IVA.",
      "Elaborar reportes financieros básicos."
    ],
    requisitos: [
      "Estudiante o egresado de contaduría.",
      "Manejo de Excel.",
      "Puntualidad y orden."
    ],
    beneficios: [
      "Prestaciones de ley.",
      "Oportunidad de aprendizaje.",
      "Buen ambiente laboral."
    ]
  },
  {
    id: 5,
    cargo: "Ejecutivo de ventas",
    empresa: "Seguros Confía",
    categoria: "Ventas y comercio",
    departamento: "Santa Ana",
    ciudad: "Santa Ana",
    salario: "Base $350 + comisiones",
    rangoSalario: "$300 - $450",
    horario: "Lunes a sábado — 8:00 am a 5:00 pm",
    contrato: "Contrato por tiempo indefinido",
    jornada: "Tiempo completo",
    modalidad: "Presencial",
    experiencia: "Menos de 1 año",
    diasAtras: 5,
    descripcion: "Captación y atención de clientes para productos de seguros de vida, vehiculares y empresariales.",
    responsabilidades: [
      "Prospectar clientes nuevos.",
      "Presentar productos y cerrar ventas.",
      "Dar seguimiento a cartera de clientes."
    ],
    requisitos: [
      "Bachillerato completo.",
      "Actitud positiva y facilidad de palabra.",
      "Vehículo propio (deseable)."
    ],
    beneficios: [
      "Comisiones sin techo.",
      "Capacitación pagada.",
      "Crecimiento rápido."
    ]
  },
  {
    id: 6,
    cargo: "Enfermera clínica",
    empresa: "Clínica San José",
    categoria: "Salud",
    departamento: "La Libertad",
    ciudad: "Santa Tecla",
    salario: "$600 - $750 mensuales",
    rangoSalario: "$600 - $800",
    horario: "Rotativo",
    contrato: "Contrato por tiempo indefinido",
    jornada: "Tiempo completo",
    modalidad: "Presencial",
    experiencia: "2 - 3 años",
    diasAtras: 7,
    descripcion: "Atención directa a pacientes en clínica privada, toma de signos vitales, aplicación de tratamientos y coordinación con médicos.",
    responsabilidades: [
      "Atender y monitorear pacientes.",
      "Administrar medicamentos.",
      "Coordinar con el equipo médico."
    ],
    requisitos: [
      "Título de enfermería registrado.",
      "2 años de experiencia clínica.",
      "Junta de Vigilancia activa."
    ],
    beneficios: [
      "Seguro médico.",
      "Estabilidad laboral.",
      "Prestaciones de ley."
    ]
  },
  {
    id: 7,
    cargo: "Community Manager",
    empresa: "Marketing360 SV",
    categoria: "Marketing y publicidad",
    departamento: "San Salvador",
    ciudad: "San Salvador",
    salario: "$500 - $700 mensuales",
    rangoSalario: "$450 - $600",
    horario: "Lunes a viernes — 8:00 am a 5:00 pm",
    contrato: "Contrato a plazo fijo",
    jornada: "Tiempo completo",
    modalidad: "Híbrido",
    experiencia: "1 - 2 años",
    diasAtras: 2,
    descripcion: "Gestión de redes sociales, creación de contenido y análisis de métricas para marcas nacionales.",
    responsabilidades: [
      "Crear y programar contenido.",
      "Gestionar comunidades en redes.",
      "Analizar métricas y generar reportes.",
      "Coordinar campañas pagadas."
    ],
    requisitos: [
      "Experiencia en redes sociales de marcas.",
      "Redacción creativa.",
      "Conocimiento de Meta Ads y Google Ads."
    ],
    beneficios: [
      "Trabajo híbrido.",
      "Equipo joven y dinámico.",
      "Posibilidad de contrato indefinido."
    ]
  }
];

// Función principal 
function getEmpleos() {
  return monseBD;
}