import React, { useState } from 'react';
import { 
  Code, 
  Smartphone, 
  Monitor, 
  Zap, 
  Palette, 
  Settings, 
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  Users,
  Clock,
  Award
} from 'lucide-react';

const WebDevPage = () => {
  const [selectedService, setSelectedService] = useState('websites');

  const services = [
    {
      id: 'websites',
      name: 'Sitios Web',
      icon: Monitor,
      description: 'Sitios web profesionales y responsivos',
      features: ['Diseño responsive', 'SEO optimizado', 'Velocidad premium', 'Panel admin'],
      startingPrice: '$299'
    },
    {
      id: 'webapps',
      name: 'Web Apps',
      icon: Code,
      description: 'Aplicaciones web interactivas y funcionales',
      features: ['Base de datos', 'Autenticación', 'API integrada', 'Dashboard'],
      startingPrice: '$799'
    },
    {
      id: 'mobile',
      name: 'Apps Móviles',
      icon: Smartphone,
      description: 'Aplicaciones móviles nativas y PWA',
      features: ['iOS & Android', 'Push notifications', 'Offline mode', 'App Store'],
      startingPrice: '$1299'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: Zap,
      description: 'Tiendas online completas y optimizadas',
      features: ['Pagos integrados', 'Inventario', 'Analytics', 'Marketing'],
      startingPrice: '$599'
    },
    {
      id: 'custom',
      name: 'Desarrollo Custom',
      icon: Settings,
      description: 'Soluciones personalizadas para tu negocio',
      features: ['Análisis completo', 'Arquitectura custom', 'Integración', 'Soporte'],
      startingPrice: 'Cotización'
    }
  ];

  const portfolio = [
    {
      id: 1,
      title: 'E-commerce Fashion',
      category: 'E-commerce',
      image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Stripe', 'Supabase'],
      description: 'Tienda online con más de 1000 productos'
    },
    {
      id: 2,
      title: 'App de Gestión',
      category: 'Web App',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      description: 'Sistema de gestión empresarial completo'
    },
    {
      id: 3,
      title: 'Landing Corporativa',
      category: 'Website',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      tech: ['React', 'Tailwind', 'Netlify'],
      description: 'Sitio corporativo con alta conversión'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Consulta Inicial',
      description: 'Analizamos tus necesidades y objetivos',
      duration: '1-2 días'
    },
    {
      step: 2,
      title: 'Propuesta & Diseño',
      description: 'Creamos mockups y definimos arquitectura',
      duration: '3-5 días'
    },
    {
      step: 3,
      title: 'Desarrollo',
      description: 'Construimos tu solución con las mejores prácticas',
      duration: '1-4 semanas'
    },
    {
      step: 4,
      title: 'Testing & Deploy',
      description: 'Pruebas exhaustivas y lanzamiento',
      duration: '2-3 días'
    },
    {
      step: 5,
      title: 'Soporte & Mantenimiento',
      description: 'Soporte continuo y actualizaciones',
      duration: 'Ongoing'
    }
  ];

  const technologies = [
    { name: 'React', logo: '⚛️', category: 'Frontend' },
    { name: 'Node.js', logo: '🟢', category: 'Backend' },
    { name: 'Supabase', logo: '🔥', category: 'Database' },
    { name: 'Tailwind', logo: '🎨', category: 'Styling' },
    { name: 'Netlify', logo: '🚀', category: 'Hosting' },
    { name: 'Stripe', logo: '💳', category: 'Payments' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              WebDev <span className="text-blue-300">Studio</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Desarrollo de sitios web, aplicaciones y soluciones digitales 
              que impulsan tu negocio al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Ver Portfolio</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-200">
                Cotizar Proyecto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones digitales completas adaptadas a las necesidades de tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedService === service.id ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{service.startingPrice}</span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Portfolio de Proyectos
            </h2>
            <p className="text-xl text-gray-600">
              Algunos de nuestros trabajos más destacados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">5.0</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-xl text-gray-600">
              Metodología probada para entregar resultados excepcionales
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block"></div>
            
            <div className="space-y-12">
              {process.map((step, index) => (
                <div key={step.step} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="flex-1 lg:pr-8">
                    <div className={`bg-white rounded-xl p-6 shadow-lg ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-600 font-medium">{step.duration}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Step number */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mx-4">
                    {step.step}
                  </div>
                  
                  <div className="flex-1 lg:pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tecnologías que Usamos
            </h2>
            <p className="text-xl text-gray-600">
              Stack moderno y probado para máximo rendimiento
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="text-3xl mb-2">{tech.logo}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-xs text-gray-500">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para llevar tu negocio al siguiente nivel?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Conversemos sobre tu proyecto y creemos algo increíble juntos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Agendar Consulta</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Descargar Portafolio</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevPage;