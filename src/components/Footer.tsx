import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">BrainLab</span>
                <span className="text-xs text-gray-400 block leading-none">Innovación Digital</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Laboratorio de innovación, transformación digital y desarrollo de herramientas 
              digitales para el desarrollo humano y empresarial.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Herramientas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Herramientas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/thinkup" className="text-gray-400 hover:text-white transition-colors">ThinkUp</Link></li>
              <li><Link to="/webdev" className="text-gray-400 hover:text-white transition-colors">WebDev</Link></li>
              <li><Link to="/ruta-digital" className="text-gray-400 hover:text-white transition-colors">Ruta Digital</Link></li>
              <li><Link to="/growmkt" className="text-gray-400 hover:text-white transition-colors">GrowMKT</Link></li>
              <li><Link to="/showroom" className="text-gray-400 hover:text-white transition-colors">Showroom</Link></li>
              <li><Link to="/toolbox" className="text-gray-400 hover:text-white transition-colors">Toolbox</Link></li>
              <li><Link to="/agentes-ia" className="text-gray-400 hover:text-white transition-colors">Agentes IA</Link></li>
            </ul>
          </div>

          {/* Capacitación */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Capacitación</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/workshops" className="text-gray-400 hover:text-white transition-colors">Workshops</Link></li>
              <li><Link to="/academia" className="text-gray-400 hover:text-white transition-colors">Academia</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">info@brainlab.com.co</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+57 (310) 219-9646</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">Colombia</span>
              </li>
              <li>
                <a
                  href="https://wa.me/573102199646"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 BrainLab. Todos los derechos reservados. | 
            <Link to="/privacidad" className="hover:text-white ml-1">Política de Privacidad</Link> | 
            <Link to="/terminos" className="hover:text-white ml-1">Términos de Uso</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;