import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Traducciones completas y actualizadas
const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.thinkup': 'ThinkUp',
    'nav.webdev': 'WebDev',
    'nav.digital-route': 'Ruta Digital',
    'nav.growmkt': 'GrowMKT',
    'nav.showroom': 'Showroom',
    'nav.toolbox': 'Toolbox',
    'nav.ai-agents': 'Agentes IA',
    'nav.workshops': 'Workshops',
    'nav.academy': 'Academia',
    'nav.members': 'Miembros',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Membresía',
    
    // Home Page
    'home.hero.title': 'LAB DE INNOVACIÓN DIGITAL',
    'home.hero.subtitle': 'Laboratorio de Innovación, transformación digital, IA y diseño de herramientas digitales para el desarrollo humano y empresarial',
    'home.hero.get-membership': 'Obtener Membresía',
    'home.hero.view-tools': 'Ver Herramientas',
    
    // Stats
    'stats.tools': '50+',
    'stats.courses': '30+',
    'stats.faster': '80%+',
    'stats.efficient': '90%+',
    
    // Solutions
    'solutions.title': 'Soluciones y Herramientas',
    'solutions.description': 'Somos un Lab enfocado en brindar soluciones prácticas a MiPymes, Emprendedores y Profesionales Autónomos',
    
    // ThinkUp
    'thinkup.title': 'ThinkUp',
    'thinkup.description': 'Herramientas y marcos de pensamiento que le ayudarán a resolver problemas, tomar decisiones y comprender sistemas',
    'thinkup.access': 'Acceso Premium',
    
    // WebDev
    'webdev.title': 'WebDev',
    'webdev.description': 'Servicio de diseño web, Apps, ERP, CRM, POS, Scraping, Consultoría',
    'webdev.access': 'Acceso Libre',
    
    // Digital Route
    'digital-route.title': 'Ruta Digital',
    'digital-route.description': 'Herramienta de diagnóstico y Planeación de Transformación Digital',
    'digital-route.access': 'Acceso Libre',
    
    // GrowMKT
    'growmkt.title': 'GrowMKT',
    'growmkt.description': 'Suite digital para planeación de marketing',
    'growmkt.access': 'Acceso Premium',
    
    // Showroom
    'showroom.title': 'Showroom',
    'showroom.description': 'Aplicaciones utilitarias y Web-Apps personalizables',
    'showroom.access': 'Acceso Libre',
    
    // Toolbox
    'toolbox.title': 'Toolbox',
    'toolbox.description': 'Caja de Herramientas y Soluciones SaaS',
    'toolbox.access': 'Acceso Libre',
    
    // AI Agents
    'ai-agents.title': 'Agentes IA',
    'ai-agents.description': 'Obtenga su propio Agente de IA personalizado',
    'ai-agents.access': 'Acceso Libre',
    
    // Workshops
    'workshops.title': 'Workshops',
    'workshops.description': 'Talleres de Innovación, Creatividad, Design Thinking, Lean StartUp',
    'workshops.access': 'Acceso Libre',
    
    // Academy
    'academy.title': 'Academia',
    'academy.description': 'Aprendizaje práctico y efectivo',
    'academy.access': 'Acceso Premium',
    
    // Value Proposition
    'value.title': 'Acelere la Innovación que Impulsa Su Negocio',
    'value.description': 'En BrainLab combinamos visión estratégica con ejecución tecnológica de vanguardia. Entendemos sus desafíos y co-creamos soluciones de base digital que generan impacto real y sostenible en su negocio.',
    'value.subtitle': 'Estarán acompañados en cada paso del camino, desde la ideación y el diseño estratégico hasta la implementación tecnológica y la optimización continua.',
    'value.feature1': 'Enfoque centrado en resultados medibles',
    'value.feature2': 'Metodologías ágiles y adaptativas al cambio',
    'value.feature3': 'Alianzas estratégicas con tecnología de vanguardia',
    'value.cta': 'Soluciones integrales para impulsar tu negocio: desde consultoría estratégica hasta implementación tecnológica avanzada.',
    
    // Membership Plans
    'plans.basic': 'Básico / Starter',
    'plans.entrepreneur': 'Emprendedor',
    'plans.fullstack': 'FullStack',
    'plans.basic.desc': 'Degustación e intro para principiantes',
    'plans.entrepreneur.desc': 'Acceso a dos secciones principales + beneficios',
    'plans.fullstack.desc': 'Acceso completo + consultorías + descuentos',
    
    // Common
    'common.explore': 'Explorar',
    'common.learn-more': 'Saber Más',
    'common.get-started': 'Comenzar',
    'common.contact-us': 'Contáctanos',
    'common.free': 'Gratis',
    'common.premium': 'Premium',
    'common.coming-soon': 'Próximamente',
    'common.access-free': 'Acceso Libre',
    'common.access-premium': 'Acceso Premium',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.thinkup': 'ThinkUp',
    'nav.webdev': 'WebDev',
    'nav.digital-route': 'Digital Route',
    'nav.growmkt': 'GrowMKT',
    'nav.showroom': 'Showroom',
    'nav.toolbox': 'Toolbox',
    'nav.ai-agents': 'AI Agents',
    'nav.workshops': 'Workshops',
    'nav.academy': 'Academy',
    'nav.members': 'Members',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.register': 'Membership',
    
    // Home Page
    'home.hero.title': 'DIGITAL INNOVATION LAB',
    'home.hero.subtitle': 'Innovation Laboratory, digital transformation, AI and design of digital tools for human and business development',
    'home.hero.get-membership': 'Get Membership',
    'home.hero.view-tools': 'View Tools',
    
    // Stats
    'stats.tools': '50+',
    'stats.courses': '30+',
    'stats.faster': '80%+',
    'stats.efficient': '90%+',
    
    // Solutions
    'solutions.title': 'Solutions and Tools',
    'solutions.description': 'We are a Lab focused on providing practical solutions to SMEs, Entrepreneurs and Freelance Professionals',
    
    // ThinkUp
    'thinkup.title': 'ThinkUp',
    'thinkup.description': 'Thinking tools and frameworks that will help you solve problems, make decisions and understand systems',
    'thinkup.access': 'Premium Access',
    
    // WebDev
    'webdev.title': 'WebDev',
    'webdev.description': 'Web design service, Apps, ERP, CRM, POS, Scraping, Consulting',
    'webdev.access': 'Free Access',
    
    // Digital Route
    'digital-route.title': 'Digital Route',
    'digital-route.description': 'Diagnostic tool and Digital Transformation Planning',
    'digital-route.access': 'Free Access',
    
    // GrowMKT
    'growmkt.title': 'GrowMKT',
    'growmkt.description': 'Digital suite for marketing planning',
    'growmkt.access': 'Premium Access',
    
    // Showroom
    'showroom.title': 'Showroom',
    'showroom.description': 'Utility applications and customizable Web-Apps',
    'showroom.access': 'Free Access',
    
    // Toolbox
    'toolbox.title': 'Toolbox',
    'toolbox.description': 'Toolbox and SaaS Solutions',
    'toolbox.access': 'Free Access',
    
    // AI Agents
    'ai-agents.title': 'AI Agents',
    'ai-agents.description': 'Get your own personalized AI Agent',
    'ai-agents.access': 'Free Access',
    
    // Workshops
    'workshops.title': 'Workshops',
    'workshops.description': 'Innovation, Creativity, Design Thinking, Lean StartUp Workshops',
    'workshops.access': 'Free Access',
    
    // Academy
    'academy.title': 'Academy',
    'academy.description': 'Practical and effective learning',
    'academy.access': 'Premium Access',
    
    // Value Proposition
    'value.title': 'Accelerate Innovation that Drives Your Business',
    'value.description': 'At BrainLab we combine strategic vision with cutting-edge technological execution. We understand your challenges and co-create digital-based solutions that generate real and sustainable impact on your business.',
    'value.subtitle': 'You will be accompanied every step of the way, from ideation and strategic design to technological implementation and continuous optimization.',
    'value.feature1': 'Focus on measurable results',
    'value.feature2': 'Agile and adaptive methodologies to change',
    'value.feature3': 'Strategic partnerships with cutting-edge technology',
    'value.cta': 'Comprehensive solutions to boost your business: from strategic consulting to advanced technological implementation.',
    
    // Membership Plans
    'plans.basic': 'Basic / Starter',
    'plans.entrepreneur': 'Entrepreneur',
    'plans.fullstack': 'FullStack',
    'plans.basic.desc': 'Tasting and intro for beginners',
    'plans.entrepreneur.desc': 'Access to two main sections + benefits',
    'plans.fullstack.desc': 'Full access + consultancies + discounts',
    
    // Common
    'common.explore': 'Explore',
    'common.learn-more': 'Learn More',
    'common.get-started': 'Get Started',
    'common.contact-us': 'Contact Us',
    'common.free': 'Free',
    'common.premium': 'Premium',
    'common.coming-soon': 'Coming Soon',
    'common.access-free': 'Free Access',
    'common.access-premium': 'Premium Access',
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    // Detectar ubicación geográfica para idioma por defecto
    const detectLanguage = () => {
      const browserLang = navigator.language.split('-')[0] as Language
      const savedLang = localStorage.getItem('brainlab-language') as Language
      
      // Para EEUU, Canadá y países de habla inglesa, inglés por defecto
      const englishCountries = ['us', 'ca', 'gb', 'au', 'nz']
      const userCountry = navigator.language.split('-')[1]?.toLowerCase()
      
      if (savedLang && ['es', 'en'].includes(savedLang)) {
        setLanguage(savedLang)
      } else if (userCountry && englishCountries.includes(userCountry)) {
        setLanguage('en')
      } else if (['es', 'en'].includes(browserLang)) {
        setLanguage(browserLang)
      } else {
        // Por defecto inglés para mercados internacionales
        setLanguage('en')
      }
    }

    detectLanguage()
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('brainlab-language', lang)
    // Actualizar el HTML lang attribute
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}