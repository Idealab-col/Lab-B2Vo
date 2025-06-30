import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Code, 
  Route, 
  TrendingUp, 
  Target, 
  Wrench, 
  Bot, 
  BookOpen, 
  GraduationCap,
  Users, 
  Download, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Rocket,
  MessageCircle,
  Crosshair,
  Lightbulb,
  Heart,
  Compass,
  Puzzle,
  Award,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FlowingTags from '../components/FlowingTags';
import BypassLeadCapture from '../components/BypassLeadCapture';

const HomePage = () => {
  const { t, language } = useLanguage();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const solutions = [
    {
      icon: Brain,
      title: t('thinkup.title'),
      description: t('thinkup.description'),
      access: t('thinkup.access'),
      color: "from-brainlab-primary to-brainlab-secondary",
      href: "/thinkup",
      isPremium: true,
      priority: true
    },
    {
      icon: Code,
      title: t('webdev.title'),
      description: t('webdev.description'),
      access: t('webdev.access'),
      color: "from-brainlab-dark to-brainlab-primary",
      href: "/webdev",
      isPremium: false,
      priority: true
    },
    {
      icon: Route,
      title: t('digital-route.title'),
      description: t('digital-route.description'),
      access: t('digital-route.access'),
      color: "from-green-500 to-emerald-600",
      href: "/ruta-digital",
      isPremium: false,
      priority: true
    },
    {
      icon: TrendingUp,
      title: t('growmkt.title'),
      description: t('growmkt.description'),
      access: t('growmkt.access'),
      color: "from-orange-500 to-red-500",
      href: "/growmkt",
      isPremium: true,
      priority: true
    },
    {
      icon: Target,
      title: t('showroom.title'),
      description: t('showroom.description'),
      access: t('showroom.access'),
      color: "from-brainlab-secondary to-pink-500",
      href: "/showroom",
      isPremium: false,
      priority: false
    },
    {
      icon: Wrench,
      title: t('toolbox.title'),
      description: t('toolbox.description'),
      access: t('toolbox.access'),
      color: "from-red-500 to-rose-600",
      href: "/toolbox",
      isPremium: false,
      priority: false
    },
    {
      icon: Bot,
      title: t('ai-agents.title'),
      description: t('ai-agents.description'),
      access: t('ai-agents.access'),
      color: "from-indigo-500 to-brainlab-secondary",
      href: "/agentes-ia",
      isPremium: false,
      priority: false
    },
    {
      icon: Crosshair,
      title: t('workshops.title'),
      description: t('workshops.description'),
      access: t('workshops.access'),
      color: "from-pink-500 to-rose-500",
      href: "/workshops",
      isPremium: false,
      priority: false
    },
    {
      icon: GraduationCap,
      title: t('academy.title'),
      description: t('academy.description'),
      access: t('academy.access'),
      color: "from-emerald-500 to-teal-600",
      href: "/academia",
      isPremium: true,
      priority: false
    }
  ];

  const prioritySolutions = solutions.filter(s => s.priority);
  const otherSolutions = solutions.filter(s => !s.priority);

  const membershipPlans = [
    {
      name: t('plans.basic'),
      description: t('plans.basic.desc'),
      price: language === 'es' ? 'Gratis' : 'Free',
      features: [
        language === 'es' ? 'Acceso a Showroom' : 'Access to Showroom',
        language === 'es' ? 'Acceso a Toolbox' : 'Access to Toolbox',
        language === 'es' ? 'Acceso a Agentes IA' : 'Access to AI Agents',
        language === 'es' ? 'Soporte básico' : 'Basic support'
      ],
      color: 'border-gray-300',
      gradient: 'bg-gradient-shine'
    },
    {
      name: t('plans.entrepreneur'),
      description: t('plans.entrepreneur.desc'),
      price: '$29/mes',
      features: [
        language === 'es' ? '2 secciones premium' : '2 premium sections',
        language === 'es' ? 'Comunidad exclusiva' : 'Exclusive community',
        language === 'es' ? '10% descuento servicios' : '10% service discount',
        language === 'es' ? 'Soporte prioritario' : 'Priority support'
      ],
      color: 'border-brainlab-primary',
      gradient: 'bg-gradient-primary',
      popular: true
    },
    {
      name: t('plans.fullstack'),
      description: t('plans.fullstack.desc'),
      price: '$79/mes',
      features: [
        language === 'es' ? 'Acceso completo' : 'Full access',
        language === 'es' ? '2 consultorías incluidas' : '2 consultancies included',
        language === 'es' ? '20% descuento servicios' : '20% service discount',
        language === 'es' ? 'Workshops incluidos' : 'Workshops included',
        language === 'es' ? 'Soporte 24/7' : '24/7 support'
      ],
      color: 'border-brainlab-accent',
      gradient: 'bg-gradient-accent'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí integrarías con Brevo
    console.log('Contact form:', contactForm);
  };

  const handleBypassCapture = (leadData: any) => {
    // Aquí enviarías los datos a tu sistema de leads
    console.log('Bypass lead captured:', leadData);
    
    // Integrar con Brevo, Supabase, etc.
    // sendToBrevo(leadData);
    // saveToSupabase(leadData);
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section - Head y Titular */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight">
                <span className="bg-gradient-elegant bg-clip-text text-transparent">
                  {t('home.hero.title')}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                {t('home.hero.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/miembros"
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-elegant transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105"
              >
                <Users className="h-5 w-5" />
                <span>{t('home.hero.get-membership')}</span>
              </Link>
              <Link
                to="/thinkup"
                className="border-2 border-brainlab-accent text-brainlab-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brainlab-accent hover:text-white transition-all duration-200 flex items-center space-x-2 shadow-glow-soft"
              >
                <Download className="h-5 w-5" />
                <span>{t('home.hero.view-tools')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Indicadores en cifras */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200 mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">{language === 'es' ? 'Herramientas' : 'Tools'}</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-display font-bold bg-gradient-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200 mb-2">
                30+
              </div>
              <div className="text-gray-600 font-medium">{language === 'es' ? 'Cursos' : 'Courses'}</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-display font-bold bg-gradient-elegant bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200 mb-2">
                80%+
              </div>
              <div className="text-gray-600 font-medium">{language === 'es' ? 'Más Veloz' : 'Faster'}</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200 mb-2">
                90%+
              </div>
              <div className="text-gray-600 font-medium">{language === 'es' ? 'Más Eficaz' : 'More Efficient'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Soluciones y Herramientas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {language === 'es' ? 'Soluciones y Herramientas' : 'Solutions and Tools'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              {t('solutions.description')}
            </p>
          </div>

          {/* Priority Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {prioritySolutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-all duration-300 border border-gray-100 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                  {solution.isPremium ? (
                    <span className="bg-gradient-accent text-white px-2 py-1 rounded-full text-xs font-medium shadow-glow-soft">
                      Premium
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {language === 'es' ? 'Libre' : 'Free'}
                    </span>
                  )}
                </div>
                
                <div className={`w-12 h-12 bg-gradient-to-r ${solution.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  <solution.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{solution.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{solution.description}</p>
                <Link 
                  to={solution.href} 
                  className="text-brainlab-accent font-medium flex items-center space-x-1 hover:space-x-2 transition-all duration-200 hover:text-brainlab-primary"
                >
                  <span>{t('common.explore')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Other Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {otherSolutions.map((solution, index) => (
              <div key={index} className="bg-gradient-shine rounded-xl p-4 hover:bg-white hover:shadow-silver transition-all duration-300 border border-gray-100 group">
                <div className={`w-8 h-8 bg-gradient-to-r ${solution.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-md`}>
                  <solution.icon className="h-4 w-4 text-white" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{solution.title}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{solution.description}</p>
                <Link 
                  to={solution.href} 
                  className="text-brainlab-accent text-xs font-medium flex items-center space-x-1 hover:text-brainlab-primary transition-colors"
                >
                  <span>{t('common.explore')}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Acelere la Innovación que Impulsa Su Negocio */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              {language === 'es' ? 'Acelere la Innovación que Impulsa Su Negocio' : 'Accelerate Innovation that Drives Your Business'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6 font-medium">
              {language === 'es' 
                ? 'En BrainLab combinamos visión estratégica con ejecución tecnológica de vanguardia. Entendemos sus desafíos y co-creamos soluciones de base digital que generan impacto real y sostenible en su negocio.'
                : 'At BrainLab we combine strategic vision with cutting-edge technological execution. We understand your challenges and co-create digital-based solutions that generate real and sustainable impact on your business.'
              }
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 font-medium">
              {language === 'es'
                ? 'Estarán acompañados en cada paso del camino, desde la ideación y el diseño estratégico hasta la implementación tecnológica y la optimización continua.'
                : 'You will be accompanied every step of the way, from ideation and strategic design to technological implementation and continuous optimization.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-soft">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'es' ? 'Enfoque centrado en resultados medibles' : 'Focus on measurable results'}
              </h3>
            </div>
            <div className="text-center">
              <div className="bg-gradient-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-soft">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'es' ? 'Metodologías ágiles y adaptativas al cambio' : 'Agile and adaptive methodologies to change'}
              </h3>
            </div>
            <div className="text-center">
              <div className="bg-gradient-elegant w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-soft">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'es' ? 'Alianzas estratégicas con tecnología de vanguardia' : 'Strategic partnerships with cutting-edge technology'}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NUEVA SECCIÓN: Filosofía BrainLab */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              {language === 'es' ? 'Filosofía BrainLab' : 'BrainLab Philosophy'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 font-medium">
              {language === 'es' 
                ? 'Nuestra misión es democratizar el acceso a metodologías de pensamiento avanzado y herramientas de innovación que tradicionalmente solo estaban disponibles para grandes corporaciones.'
                : 'Our mission is to democratize access to advanced thinking methodologies and innovation tools that were traditionally only available to large corporations.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Pilar 1: Pensamiento Crítico */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Pensamiento Crítico' : 'Critical Thinking'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'es' 
                  ? 'Desarrollamos la capacidad de analizar, evaluar y sintetizar información de manera objetiva para tomar decisiones fundamentadas.'
                  : 'We develop the ability to analyze, evaluate and synthesize information objectively to make informed decisions.'
                }
              </p>
            </div>

            {/* Pilar 2: Innovación Práctica */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Innovación Práctica' : 'Practical Innovation'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'es' 
                  ? 'Transformamos ideas creativas en soluciones tangibles que generan valor real para personas y organizaciones.'
                  : 'We transform creative ideas into tangible solutions that generate real value for people and organizations.'
                }
              </p>
            </div>

            {/* Pilar 3: Aprendizaje Continuo */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Compass className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Aprendizaje Continuo' : 'Continuous Learning'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'es' 
                  ? 'Fomentamos una mentalidad de crecimiento constante, adaptándose a los cambios y evolucionando con el entorno.'
                  : 'We foster a mindset of constant growth, adapting to changes and evolving with the environment.'
                }
              </p>
            </div>

            {/* Pilar 4: Impacto Sostenible */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'es' ? 'Impacto Sostenible' : 'Sustainable Impact'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'es' 
                  ? 'Creamos soluciones que no solo resuelven problemas inmediatos, sino que construyen capacidades duraderas.'
                  : 'We create solutions that not only solve immediate problems, but build lasting capabilities.'
                }
              </p>
            </div>
          </div>

          {/* Valores Core */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {language === 'es' ? 'Nuestros Valores Core' : 'Our Core Values'}
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'es' 
                  ? 'Estos principios guían cada decisión, cada herramienta que creamos y cada interacción con nuestra comunidad.'
                  : 'These principles guide every decision, every tool we create and every interaction with our community.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Valor 1: Simplicidad Inteligente */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Puzzle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {language === 'es' ? 'Simplicidad Inteligente' : 'Intelligent Simplicity'}
                  </h4>
                </div>
                <p className="text-gray-600">
                  {language === 'es' 
                    ? 'Convertimos lo complejo en simple, sin perder profundidad ni rigor metodológico.'
                    : 'We turn the complex into simple, without losing depth or methodological rigor.'
                  }
                </p>
              </div>

              {/* Valor 2: Excelencia Accesible */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {language === 'es' ? 'Excelencia Accesible' : 'Accessible Excellence'}
                  </h4>
                </div>
                <p className="text-gray-600">
                  {language === 'es' 
                    ? 'Democratizamos herramientas de clase mundial para que cualquier persona pueda acceder a ellas.'
                    : 'We democratize world-class tools so anyone can access them.'
                  }
                </p>
              </div>

              {/* Valor 3: Crecimiento Humano */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {language === 'es' ? 'Crecimiento Humano' : 'Human Growth'}
                  </h4>
                </div>
                <p className="text-gray-600">
                  {language === 'es' 
                    ? 'Priorizamos el desarrollo integral de las personas por encima de las métricas comerciales.'
                    : 'We prioritize the integral development of people over commercial metrics.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA ¿Listo para transformar tu negocio? */}
      <section className="py-20 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            {language === 'es' ? '¿Listo para transformar tu negocio?' : 'Ready to transform your business?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-medium">
            {language === 'es' 
              ? 'Únete a cientos de emprendedores que ya están acelerando su crecimiento con BrainLab'
              : 'Join hundreds of entrepreneurs who are already accelerating their growth with BrainLab'
            }
          </p>
          <Link
            to="/miembros"
            className="inline-flex items-center space-x-2 bg-white text-brainlab-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Rocket className="h-5 w-5" />
            <span>{t('common.get-started')}</span>
          </Link>
        </div>
      </section>

      {/* 7. Planes de Membresía */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {language === 'es' ? 'Planes de Membresía' : 'Membership Plans'}
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              {language === 'es' ? 'Elige el plan que mejor se adapte a tus necesidades' : 'Choose the plan that best fits your needs'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-elegant border-2 ${plan.color} ${plan.popular ? 'scale-105 shadow-glow' : ''} relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-glow-soft">
                      {language === 'es' ? 'Más Popular' : 'Most Popular'}
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-3xl font-display font-bold bg-gradient-elegant bg-clip-text text-transparent">{plan.price}</div>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular 
                    ? 'bg-gradient-primary text-white hover:shadow-elegant' 
                    : 'border-2 border-gray-300 text-gray-700 hover:border-brainlab-accent hover:text-brainlab-accent'
                }`}>
                  {plan.price === 'Gratis' || plan.price === 'Free' 
                    ? (language === 'es' ? 'Comenzar Gratis' : 'Start Free')
                    : (language === 'es' ? 'Elegir Plan' : 'Choose Plan')
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Form ¿Tienes alguna consulta? */}
      <section className="py-20 bg-gradient-shine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-elegant">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {language === 'es' ? '¿Tienes alguna consulta?' : 'Do you have any questions?'}
              </h2>
              <p className="text-gray-600">
                {language === 'es' 
                  ? 'Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.'
                  : 'We are here to help you. Send us a message and we will respond soon.'
                }
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Nombre' : 'Name'}
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brainlab-accent focus:border-transparent shadow-sm"
                    placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brainlab-accent focus:border-transparent shadow-sm"
                    placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'es' ? 'Mensaje' : 'Message'}
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brainlab-accent focus:border-transparent shadow-sm"
                  placeholder={language === 'es' ? 'Cuéntanos en qué podemos ayudarte...' : 'Tell us how we can help you...'}
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  type="submit"
                  className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-elegant transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{language === 'es' ? 'Enviar Mensaje' : 'Send Message'}</span>
                </button>
                <a
                  href="https://wa.me/573102199646"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 9. Río de Etiquetas Tecnologías, Metodologías y Beneficios */}
      <FlowingTags />

      {/* 10. Banner desplegable con form ¿Te interesa pero necesitas ayuda para decidir? */}
      <BypassLeadCapture onCapture={handleBypassCapture} />
    </div>
  );
};

export default HomePage;