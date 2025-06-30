import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, User, LogIn, Globe, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut, loading } = useAuth();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.thinkup'), href: '/thinkup' },
    { name: t('nav.webdev'), href: '/webdev' },
    { name: t('nav.digital-route'), href: '/ruta-digital' },
    { name: t('nav.growmkt'), href: '/growmkt' },
    { name: t('nav.showroom'), href: '/showroom' },
    { name: t('nav.toolbox'), href: '/toolbox' },
    { name: t('nav.ai-agents'), href: '/agentes-ia' },
    { name: t('nav.workshops'), href: '/workshops' },
    { name: t('nav.academy'), href: '/academia' },
    { name: 'Blog', href: '/blog' }, // Nuevo enlace al blog
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-brainlab-primary p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">BrainLab</span>
              <span className="text-xs text-gray-500 block leading-none">
                {language === 'es' ? 'Innovación Digital' : 'Digital Innovation'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Texto Compacto */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.slice(0, 6).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-brainlab-primary text-white shadow-md'
                    : 'text-gray-700 hover:text-brainlab-accent hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Dropdown for more items */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brainlab-accent hover:bg-gray-100">
                {language === 'es' ? 'Más' : 'More'}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  {navigation.slice(6).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Language Toggle & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-brainlab-accent transition-colors p-2 rounded-lg hover:bg-gray-100"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Salir</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-brainlab-accent transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{t('nav.login')}</span>
                </Link>
                <Link
                  to="/registro"
                  className="bg-brainlab-primary text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all duration-200 flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>{t('nav.register')}</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-brainlab-accent hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-brainlab-primary text-white'
                      : 'text-gray-700 hover:text-brainlab-accent hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-brainlab-accent w-full text-left"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === 'es' ? 'English' : 'Español'}</span>
                </button>
                
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      {user.user_metadata?.full_name || user.email}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-gray-700 hover:text-brainlab-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/registro"
                      className="block px-3 py-2 bg-brainlab-primary text-white rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;