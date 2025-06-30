import React from 'react';
import { Crown, CheckCircle, X, Star, Users, Zap, Shield, Headphones, Brain, Code, TrendingUp, BookOpen } from 'lucide-react';

const MembersPage = () => {
  const plans = [
    {
      name: "Básico / Starter",
      price: "Gratis",
      period: "siempre",
      description: "Degustación e intro para principiantes",
      features: [
        "Acceso a Showroom (apps utilitarias)",
        "Acceso a Toolbox (SaaS partners)",
        "Acceso a Agentes IA (simulador)",
        "Diagnóstico Ruta Digital básico",
        "Soporte por email",
        "Comunidad básica"
      ],
      limitations: [
        "Sin acceso a ThinkUp premium",
        "Sin acceso a GrowMKT",
        "Sin acceso a Academia",
        "Sin consultorías",
        "Sin descuentos en servicios"
      ],
      buttonText: "Comenzar Gratis",
      buttonStyle: "bg-gray-600 text-white hover:bg-gray-700",
      popular: false,
      highlight: false
    },
    {
      name: "Emprendedor",
      price: "$29",
      period: "mes",
      description: "Acceso a dos secciones principales + beneficios",
      features: [
        "Todo lo del plan Básico",
        "Acceso a 2 secciones premium:",
        "• ThinkUp + GrowMKT, o",
        "• GrowMKT + Academia, o", 
        "• ThinkUp + Academia",
        "Comunidad exclusiva de emprendedores",
        "10% descuento en servicios WebDev",
        "1 Workshop incluido por trimestre",
        "Soporte prioritario",
        "Actualizaciones tempranas"
      ],
      limitations: [],
      buttonText: "Elegir Emprendedor",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
      popular: true,
      highlight: true
    },
    {
      name: "FullStack",
      price: "$79",
      period: "mes",
      description: "Acceso completo + consultorías + descuentos",
      features: [
        "Acceso completo a todas las secciones",
        "ThinkUp: Todos los marcos de pensamiento",
        "GrowMKT: Suite completa de marketing",
        "Academia: Todos los cursos premium",
        "2 consultorías personalizadas incluidas",
        "Todos los Workshops incluidos",
        "20% descuento en servicios WebDev",
        "Soporte 24/7 prioritario",
        "Acceso anticipado a nuevas herramientas",
        "Sesiones 1:1 con expertos",
        "Comunidad VIP"
      ],
      limitations: [],
      buttonText: "Elegir FullStack",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
      popular: false,
      highlight: false
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Marcos de Pensamiento",
      description: "50+ herramientas para toma de decisiones y resolución de problemas"
    },
    {
      icon: TrendingUp,
      title: "Suite de Marketing",
      description: "Herramientas completas para planificación y ejecución de marketing"
    },
    {
      icon: BookOpen,
      title: "Academia Premium",
      description: "Cursos especializados con certificación oficial"
    },
    {
      icon: Code,
      title: "Servicios WebDev",
      description: "Desarrollo web profesional con descuentos exclusivos"
    },
    {
      icon: Users,
      title: "Comunidad Exclusiva",
      description: "Conecta con emprendedores y profesionales de alto nivel"
    },
    {
      icon: Headphones,
      title: "Soporte Experto",
      description: "Asesoría directa de nuestro equipo de especialistas"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "CEO, TechStart",
      content: "Los marcos de pensamiento de ThinkUp transformaron mi forma de tomar decisiones. El ROI fue inmediato.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      plan: "FullStack"
    },
    {
      name: "Ana García",
      role: "Fundadora, EcoShop",
      content: "GrowMKT me ayudó a estructurar mi estrategia de marketing. Los resultados superaron mis expectativas.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      plan: "Emprendedor"
    },
    {
      name: "Roberto Silva",
      role: "Director, InnovaLab",
      content: "La combinación de herramientas y consultoría es perfecta. Nuestro equipo es mucho más eficiente.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100",
      plan: "FullStack"
    }
  ];

  const planComparison = [
    { feature: "Acceso a Showroom", basic: true, entrepreneur: true, fullstack: true },
    { feature: "Acceso a Toolbox", basic: true, entrepreneur: true, fullstack: true },
    { feature: "Acceso a Agentes IA", basic: true, entrepreneur: true, fullstack: true },
    { feature: "Ruta Digital básica", basic: true, entrepreneur: true, fullstack: true },
    { feature: "ThinkUp (marcos de pensamiento)", basic: false, entrepreneur: "Opcional", fullstack: true },
    { feature: "GrowMKT (suite marketing)", basic: false, entrepreneur: "Opcional", fullstack: true },
    { feature: "Academia (cursos premium)", basic: false, entrepreneur: "Opcional", fullstack: true },
    { feature: "Workshops incluidos", basic: false, entrepreneur: "1/trimestre", fullstack: "Todos" },
    { feature: "Consultorías incluidas", basic: false, entrepreneur: false, fullstack: "2/mes" },
    { feature: "Descuento servicios WebDev", basic: false, entrepreneur: "10%", fullstack: "20%" },
    { feature: "Soporte", basic: "Email", entrepreneur: "Prioritario", fullstack: "24/7" },
    { feature: "Comunidad", basic: "Básica", entrepreneur: "Exclusiva", fullstack: "VIP" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Planes de Membresía BrainLab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Accede a marcos de pensamiento, herramientas de marketing, cursos especializados 
            y servicios de desarrollo con descuentos exclusivos
          </p>
          
          {/* Trial Banner */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-4 max-w-md mx-auto">
            <p className="font-semibold">🎉 Prueba gratis por 14 días</p>
            <p className="text-sm opacity-90">Sin compromiso, cancela cuando quieras</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${
              plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
            } ${plan.highlight ? 'border-2 border-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Crown className="h-4 w-4" />
                    <span>Más Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Gratis" && (
                      <span className="text-gray-500">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comparación Detallada de Planes
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Características</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Básico</th>
                    <th className="text-center py-4 px-4 font-semibold text-blue-600">Emprendedor</th>
                    <th className="text-center py-4 px-4 font-semibold text-purple-600">FullStack</th>
                  </tr>
                </thead>
                <tbody>
                  {planComparison.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-600">{row.basic}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {typeof row.entrepreneur === 'boolean' ? (
                          row.entrepreneur ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-sm text-blue-600 font-medium">{row.entrepreneur}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {typeof row.fullstack === 'boolean' ? (
                          row.fullstack ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-sm text-purple-600 font-medium">{row.fullstack}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir BrainLab?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lo que dicen nuestros miembros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {testimonial.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-gray-600">Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplican en el siguiente ciclo de facturación.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Qué incluyen las consultorías del plan FullStack?</h3>
              <p className="text-gray-600">Sesiones 1:1 de 60 minutos con nuestros expertos en estrategia, marketing o transformación digital.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Los descuentos en WebDev se aplican a todos los servicios?</h3>
              <p className="text-gray-600">Sí, los descuentos se aplican a desarrollo web, apps, consultoría y todos nuestros servicios tecnológicos.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Hay garantía de devolución?</h3>
              <p className="text-gray-600">Ofrecemos garantía de devolución de 30 días si no estás completamente satisfecho.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;