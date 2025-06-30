import React, { useState, useEffect } from 'react';
import { X, Gift, Clock, Star, CheckCircle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface BypassLeadCaptureProps {
  onCapture: (leadData: any) => void;
}

const BypassLeadCapture: React.FC<BypassLeadCaptureProps> = ({ onCapture }) => {
  const [showBypassBanner, setShowBypassBanner] = useState(false);
  const [bannerExpanded, setBannerExpanded] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [inactivityTime, setInactivityTime] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [bannerShown, setBannerShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    interests: [] as string[]
  });

  const interestOptions = [
    { value: 'thinkup', label: 'Marcos de Pensamiento', icon: '🧠' },
    { value: 'webdev', label: 'Desarrollo de Producto/Proyecto/Web-Apps', icon: '💻' },
    { value: 'marketing', label: 'Tools de Marketing', icon: '📈' },
    { value: 'learning', label: 'Aprendizaje', icon: '📚' }
  ];

  useEffect(() => {
    // Timer para tiempo en sitio
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 1000);

    // Timer para inactividad
    const inactivityTimer = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivity;
      setInactivityTime(timeSinceLastActivity / 1000);
    }, 1000);

    // Detectar scroll
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollPercentage(scrollPercent);
      setLastActivity(Date.now());

      // Mostrar banner al 70% de scroll
      if (scrollPercent >= 70 && !bannerShown) {
        setShowBypassBanner(true);
        setBannerShown(true);
      }
    };

    // Detectar actividad
    const handleActivity = () => {
      setLastActivity(Date.now());
      setInactivityTime(0);
    };

    // Mostrar banner después de 60 segundos de inactividad
    const checkInactivity = () => {
      if (inactivityTime >= 60 && !bannerShown) {
        setShowBypassBanner(true);
        setBannerShown(true);
      }
    };

    const inactivityCheck = setInterval(checkInactivity, 5000);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keypress', handleActivity);
    document.addEventListener('click', handleActivity);

    return () => {
      clearInterval(timer);
      clearInterval(inactivityTimer);
      clearInterval(inactivityCheck);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keypress', handleActivity);
      document.removeEventListener('click', handleActivity);
    };
  }, [inactivityTime, bannerShown, lastActivity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.whatsapp || formData.interests.length === 0) {
      return;
    }

    setIsSubmitting(true);

    const leadData = {
      ...formData,
      source: 'bypass_access',
      bypassHours: 100,
      timestamp: new Date().toISOString(),
      behavior: {
        timeOnSite,
        scrollPercentage,
        triggerType: scrollPercentage >= 70 ? 'scroll' : 'inactivity'
      }
    };

    // Generar código de bypass único
    const bypassCode = generateBypassCode();
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onCapture(leadData);
    setShowBypassBanner(false);
    setBannerExpanded(false);
    
    // Mostrar mensaje de éxito
    showSuccessMessage(bypassCode);
    setIsSubmitting(false);
  };

  const generateBypassCode = () => {
    return 'BP' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const showSuccessMessage = (bypassCode: string) => {
    // Crear elemento de notificación elegante
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-white border border-gray-200 rounded-2xl shadow-elegant z-50 max-w-sm p-6 transform transition-all duration-500 ease-out';
    notification.style.transform = 'translateX(100%)';
    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0 w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow-soft">
          <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-gray-900">¡Bypass enviado!</p>
          <p class="text-sm text-gray-600 mt-1">Revisa tu email para acceder</p>
          <div class="mt-2 bg-gradient-shine rounded-lg px-3 py-2 shadow-silver">
            <p class="text-xs text-gray-500">Código:</p>
            <p class="font-mono font-bold text-brainlab-primary">${bypassCode}</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 5000);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (!showBypassBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner desplegable */}
        <div className="bg-gradient-shine border border-gray-200 rounded-t-2xl shadow-silver overflow-hidden">
          {/* Header del banner */}
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            onClick={() => setBannerExpanded(!bannerExpanded)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow-soft">
                <Gift className="h-4 w-4 text-white" />
              </div>
              <p className="text-gray-700 font-medium">
                ¿Te interesa pero necesitas ayuda para decidir?
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                {bannerExpanded ? 'Cerrar' : 'Abrir'}
              </span>
              {bannerExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>

          {/* Formulario desplegable */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            bannerExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Obtén tu Bypass gratuito
                </h3>
                <p className="text-gray-600 text-sm">
                  Cuéntanos cuál es tu área de interés y recibirás un <span className="font-semibold text-brainlab-primary">Bypass</span> con 
                  acceso gratuito e ilimitado a nuestra plataforma por <span className="font-bold text-brainlab-accent">100 horas</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Áreas de interés */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Áreas de interés (selecciona las que apliquen) *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map(option => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInterestToggle(option.value)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                          formData.interests.includes(option.value)
                            ? 'border-brainlab-accent bg-gradient-to-r from-accent-50 to-primary-50 text-brainlab-primary shadow-glow-soft'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{option.icon}</span>
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campos de información */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brainlab-accent focus:border-transparent transition-all duration-200 placeholder-gray-500 shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brainlab-accent focus:border-transparent transition-all duration-200 placeholder-gray-500 shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brainlab-accent focus:border-transparent transition-all duration-200 placeholder-gray-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
                
                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={isSubmitting || formData.interests.length === 0}
                  className="w-full bg-gradient-elegant text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-elegant transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generando tu Bypass...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Gift className="h-5 w-5" />
                      <span>Obtener mi Bypass de 100 horas</span>
                    </div>
                  )}
                </button>
              </form>

              {/* Nota de privacidad */}
              <p className="text-xs text-gray-500 text-center mt-3">
                🔒 Tus datos están seguros. No spam. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BypassLeadCapture;