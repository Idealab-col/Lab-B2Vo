import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Star, 
  Eye, 
  FileText, 
  Calculator, 
  BarChart3, 
  Users, 
  Calendar,
  Lock,
  Crown,
  Target,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ToolsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas las Herramientas', count: 47 },
    { id: 'decision', name: 'Toma de Decisiones', count: 12 },
    { id: 'problem', name: 'Resolución de Problemas', count: 8 },
    { id: 'strategy', name: 'Pensamiento Estratégico', count: 6 },
    { id: 'creativity', name: 'Creatividad', count: 5 },
    { id: 'communication', name: 'Comunicación', count: 4 },
    { id: 'other', name: 'Otros Modelos', count: 12 }
  ];

  const tools = [
    // Toma de Decisiones
    {
      id: 1,
      name: "Matriz de Eisenhower",
      description: "Prioriza tareas según urgencia e importancia para una gestión eficaz del tiempo",
      category: "decision",
      downloads: 2150,
      rating: 4.9,
      isPremium: true,
      icon: Target,
      tags: ["Excel", "PDF", "Plantilla"],
      type: "Urgente/Importante"
    },
    {
      id: 2,
      name: "Análisis Costo-Beneficio",
      description: "Evalúa decisiones éticas y comerciales con análisis cuantitativo adaptable",
      category: "decision",
      downloads: 1890,
      rating: 4.8,
      isPremium: true,
      icon: Calculator,
      tags: ["Excel", "Automatizada"],
      type: "Decisiones Éticas"
    },
    {
      id: 3,
      name: "Matriz de Decisión",
      description: "Sistema de pesos personalizables para decisiones complejas multicriterio",
      category: "decision",
      downloads: 1650,
      rating: 4.7,
      isPremium: true,
      icon: BarChart3,
      tags: ["Excel", "Pesos Personalizables"],
      type: "Multicriterio"
    },
    {
      id: 4,
      name: "Matriz Impacto-Esfuerzo",
      description: "Prioriza proyectos e iniciativas según su impacto potencial y esfuerzo requerido",
      category: "decision",
      downloads: 1420,
      rating: 4.6,
      isPremium: true,
      icon: TrendingUp,
      tags: ["Excel", "Priorización"],
      type: "Proyectos"
    },

    // Resolución de Problemas
    {
      id: 5,
      name: "5 Whys (5 Porqués)",
      description: "Encuentra la causa raíz de problemas mediante análisis iterativo profundo",
      category: "problem",
      downloads: 2890,
      rating: 4.9,
      isPremium: true,
      icon: Eye,
      tags: ["PDF", "Worksheet"],
      type: "Causa Raíz"
    },
    {
      id: 6,
      name: "First Principles Thinking",
      description: "Descompón problemas complejos hasta sus fundamentos básicos (método Tesla)",
      category: "problem",
      downloads: 1980,
      rating: 4.8,
      isPremium: true,
      icon: Zap,
      tags: ["Framework", "Tesla"],
      type: "Descomposición"
    },
    {
      id: 7,
      name: "Diagrama de Ishikawa",
      description: "Identifica causas potenciales de problemas con el diagrama espina de pescado",
      category: "problem",
      downloads: 2340,
      rating: 4.7,
      isPremium: true,
      icon: BarChart3,
      tags: ["Excel", "Diagrama"],
      type: "Espina de Pescado"
    },
    {
      id: 8,
      name: "Iceberg Model",
      description: "Analiza problemas en múltiples niveles: eventos, patrones, estructuras y modelos mentales",
      category: "problem",
      downloads: 1560,
      rating: 4.6,
      isPremium: true,
      icon: Eye,
      tags: ["Framework", "Sistémico"],
      type: "Análisis Sistémico"
    },

    // Pensamiento Estratégico
    {
      id: 9,
      name: "Análisis SWOT/FODA",
      description: "Evalúa fortalezas, debilidades, oportunidades y amenazas de tu organización",
      category: "strategy",
      downloads: 3420,
      rating: 4.9,
      isPremium: false,
      icon: Target,
      tags: ["Excel", "Estrategia"],
      type: "Análisis Estratégico"
    },
    {
      id: 10,
      name: "Second-Order Thinking",
      description: "Analiza consecuencias a largo plazo y efectos secundarios de decisiones estratégicas",
      category: "strategy",
      downloads: 1230,
      rating: 4.7,
      isPremium: true,
      icon: TrendingUp,
      tags: ["Framework", "Largo Plazo"],
      type: "Consecuencias"
    },

    // Creatividad
    {
      id: 11,
      name: "SCAMPER",
      description: "Genera alternativas creativas a productos existentes con 7 técnicas probadas",
      category: "creativity",
      downloads: 1890,
      rating: 4.8,
      isPremium: true,
      icon: Lightbulb,
      tags: ["Creatividad", "Innovación"],
      type: "Alternativas"
    },
    {
      id: 12,
      name: "Six Thinking Hats",
      description: "Método de Edward de Bono para explorar problemas desde 6 perspectivas diferentes",
      category: "creativity",
      downloads: 2100,
      rating: 4.9,
      isPremium: true,
      icon: Users,
      tags: ["De Bono", "Perspectivas"],
      type: "6 Sombreros"
    },

    // Comunicación
    {
      id: 13,
      name: "Pyramid Principle",
      description: "Estructura ideas de forma piramidal para comunicación clara y persuasiva",
      category: "communication",
      downloads: 1650,
      rating: 4.7,
      isPremium: true,
      icon: MessageSquare,
      tags: ["Comunicación", "Estructura"],
      type: "Estructura Piramidal"
    },
    {
      id: 14,
      name: "Storytelling Canvas",
      description: "Plantilla narrativa para crear historias impactantes y memorables",
      category: "communication",
      downloads: 1420,
      rating: 4.6,
      isPremium: true,
      icon: FileText,
      tags: ["Narrativa", "Canvas"],
      type: "Plantilla Narrativa"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('thinkup.title')} - Marcos de Pensamiento
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {t('thinkup.description')}
          </p>
          <div className="mt-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700">
              <Lock className="h-4 w-4 inline mr-1" />
              <strong>Acceso Premium:</strong> Estas herramientas requieren membresía para descarga completa
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar marcos de pensamiento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${tool.isPremium ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-blue-100'}`}>
                    <tool.icon className={`h-6 w-6 ${tool.isPremium ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {tool.isPremium && (
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <Crown className="h-3 w-3" />
                        <span>Premium</span>
                      </div>
                    )}
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {getCategoryName(tool.category)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium mb-2">{tool.type}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{tool.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{tool.downloads.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  tool.isPremium 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {tool.isPremium ? <Lock className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                  <span>{tool.isPremium ? 'Requiere Membresía' : 'Descargar Gratis'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron herramientas</h3>
            <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías</p>
          </div>
        )}

        {/* Premium CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <Crown className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">¿Quieres acceso a todos los marcos de pensamiento?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Obtén acceso ilimitado a más de 50 herramientas premium, plantillas personalizables en Excel y PDF, 
            guías de uso detalladas y actualizaciones constantes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Ver Planes de Membresía
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Probar Gratis 14 Días
            </button>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Categorías de Herramientas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category, index) => (
              <div key={category.id} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                   onClick={() => setSelectedCategory(category.id)}>
                <div className="text-2xl font-bold text-blue-600 mb-2">{category.count}</div>
                <div className="font-medium text-gray-900">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;