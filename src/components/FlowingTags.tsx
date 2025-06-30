import React from 'react';

const FlowingTags = () => {
  // Etiquetas organizadas por categorías con todos los términos solicitados
  const tagCategories = [
    // Marcos de Pensamiento y Metodologías
    {
      category: "Pensamiento",
      tags: [
        "Marcos de Pensamiento", "Frameworks", "Toma de Decisiones", "Resolución de Conflictos", 
        "Pensamiento Crítico", "Pensamiento Estratégico", "Pensamiento Sistémico", "Problem Solver",
        "Design Thinking", "Lean StartUp", "Canvas", "Agile", "Mejora Continua"
      ]
    },
    // Tecnología y Desarrollo
    {
      category: "Tecnología", 
      tags: [
        "I.A. Aplicada", "WebDev", "Desarrollo", "Sistemas", "Métodos", "Toolbox", 
        "Automatización", "Innovación", "Solución", "React", "Node.js", "Apps Móviles"
      ]
    },
    // Marketing y Negocio
    {
      category: "Marketing",
      tags: [
        "ThinkUp", "GrowMKT", "Marketing", "Business Model", "Plan Estratégico", 
        "Growth Hacking", "SEO", "Analytics", "Lead Generation", "Conversión"
      ]
    },
    // Transformación y Evolución
    {
      category: "Digital",
      tags: [
        "Transformación Digital", "Evolución", "Cambio", "Mejora", "Procesos", 
        "Estrategia", "Gestión", "Digitalización", "Optimización", "BrainLab"
      ]
    },
    // Emprendimiento y Crecimiento
    {
      category: "Emprendimiento",
      tags: [
        "Emprendimiento", "StartUp", "Workshops", "Crecimiento", "Impulso", 
        "Aceleración", "Escalar", "Trabajo en Equipo", "Aprendizaje"
      ]
    },
    // Beneficios y Resultados
    {
      category: "Beneficios",
      tags: [
        "Rendimiento", "Productividad", "Eficiencia", "Rentabilidad", 
        "80% Más Rápido", "90% Más Eficiente", "ROI Inmediato", "Soporte 24/7"
      ]
    }
  ];

  // Combinar todas las etiquetas en un solo array para el flujo
  const allTags = tagCategories.flatMap(cat => 
    cat.tags.map(tag => ({
      text: tag,
      category: cat.category
    }))
  );

  // Crear diferentes arrays para cada flujo
  const createFlowArray = (startIndex: number, length: number) => {
    const flow = [];
    for (let i = 0; i < length; i++) {
      flow.push(allTags[(startIndex + i) % allTags.length]);
    }
    return flow;
  };

  const flow1 = createFlowArray(0, allTags.length * 2);
  const flow2 = createFlowArray(Math.floor(allTags.length / 3), allTags.length * 2);
  const flow3 = createFlowArray(Math.floor(allTags.length / 2), allTags.length * 2);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Pensamiento": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700";
      case "Tecnología": return "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700";
      case "Marketing": return "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700";
      case "Digital": return "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700";
      case "Emprendimiento": return "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700";
      case "Beneficios": return "bg-gradient-to-r from-brainlab-accent to-cyan-500 text-white hover:from-cyan-400 hover:to-brainlab-accent";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Tecnologías, Metodologías y Beneficios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre todo lo que puedes lograr con nuestro ecosistema integral de herramientas y servicios
          </p>
        </div>
      </div>

      <div className="relative space-y-6">
        {/* Primer río - Flujo hacia la derecha */}
        <div className="flex space-x-4 animate-flow-right">
          {flow1.map((tag, index) => (
            <div
              key={`right-${index}`}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer transform
                ${getCategoryColor(tag.category)}
              `}
            >
              {tag.text}
            </div>
          ))}
        </div>

        {/* Segundo río - Flujo hacia la izquierda */}
        <div className="flex space-x-4 animate-flow-left">
          {flow2.map((tag, index) => (
            <div
              key={`left-${index}`}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer transform
                ${getCategoryColor(tag.category)}
              `}
            >
              {tag.text}
            </div>
          ))}
        </div>

        {/* Tercer río - Flujo hacia la derecha (velocidad media) */}
        <div className="flex space-x-4 animate-flow-right-slow">
          {flow3.map((tag, index) => (
            <div
              key={`middle-${index}`}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer transform
                ${getCategoryColor(tag.category)}
              `}
            >
              {tag.text}
            </div>
          ))}
        </div>
      </div>

      {/* Gradientes laterales para efecto de desvanecimiento */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-blue-50 via-blue-50 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default FlowingTags;