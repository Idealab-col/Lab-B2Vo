import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Users, 
  Award, 
  Star, 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle,
  Lock,
  Crown
} from 'lucide-react';

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos los Cursos' },
    { id: 'digital', name: 'Transformación Digital' },
    { id: 'marketing', name: 'Marketing Digital' },
    { id: 'business', name: 'Gestión Empresarial' },
    { id: 'tools', name: 'Herramientas Digitales' }
  ];

  const courses = [
    {
      id: 1,
      title: "Fundamentos de Transformación Digital",
      description: "Aprende los conceptos básicos para digitalizar tu negocio desde cero",
      category: "digital",
      duration: "4 semanas",
      lessons: 16,
      students: 1250,
      rating: 4.8,
      level: "Principiante",
      isPremium: false,
      instructor: "Carlos Mendoza",
      price: "Gratis",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Videos HD", "Certificado", "Soporte"]
    },
    {
      id: 2,
      title: "Marketing Digital para MiPymes",
      description: "Estrategias efectivas de marketing digital adaptadas a pequeñas empresas",
      category: "marketing",
      duration: "6 semanas",
      lessons: 24,
      students: 890,
      rating: 4.9,
      level: "Intermedio",
      isPremium: true,
      instructor: "Ana García",
      price: "$99",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Videos HD", "Certificado", "Mentorías", "Recursos Extra"]
    },
    {
      id: 3,
      title: "Automatización de Procesos Empresariales",
      description: "Optimiza tu negocio con herramientas de automatización y flujos de trabajo",
      category: "tools",
      duration: "5 semanas",
      lessons: 20,
      students: 650,
      rating: 4.7,
      level: "Avanzado",
      isPremium: true,
      instructor: "Roberto Silva",
      price: "$149",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Videos HD", "Certificado", "Proyectos Prácticos", "Soporte 1:1"]
    },
    {
      id: 4,
      title: "Gestión Financiera Digital",
      description: "Controla las finanzas de tu empresa con herramientas digitales modernas",
      category: "business",
      duration: "3 semanas",
      lessons: 12,
      students: 420,
      rating: 4.6,
      level: "Intermedio",
      isPremium: false,
      instructor: "María López",
      price: "Gratis",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Videos HD", "Certificado", "Templates"]
    },
    {
      id: 5,
      title: "E-commerce desde Cero",
      description: "Crea y gestiona tu tienda online con las mejores prácticas del mercado",
      category: "digital",
      duration: "8 semanas",
      lessons: 32,
      students: 1100,
      rating: 4.8,
      level: "Principiante",
      isPremium: true,
      instructor: "Diego Ramírez",
      price: "$199",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Videos HD", "Certificado", "Proyecto Final", "Mentorías Grupales"]
    },
    {
      id: 6,
      title: "Análisis de Datos para Negocios",
      description: "Toma decisiones basadas en datos con herramientas de análisis empresarial",
      category: "tools",
      duration: "4 semanas",
      lessons: 18,
      students: 380,
      rating: 4.5,
      level: "Intermedio",
      isPremium: true,
      instructor: "Laura Fernández",
      price: "$129",
      image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Videos HD", "Certificado", "Datasets", "Herramientas"]
    }
  ];

  const filteredCourses = courses.filter(course => 
    selectedCategory === 'all' || course.category === selectedCategory
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Academia BrainLab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cursos especializados en transformación digital, marketing y gestión empresarial con certificación oficial
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Cursos</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">5000+</div>
            <div className="text-gray-600">Estudiantes</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfacción</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Soporte</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                {course.isPremium && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <Crown className="h-3 w-3" />
                      <span>Premium</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Instructor */}
                <p className="text-sm text-gray-500 mb-4">
                  Por <span className="font-medium">{course.instructor}</span>
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lecciones</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-gray-500">({course.students})</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {course.price}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.features.map((feature, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  course.isPremium 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}>
                  {course.isPremium ? <Lock className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{course.isPremium ? 'Acceder con Membresía' : 'Comenzar Gratis'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <Award className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ruta de Aprendizaje Personalizada</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Obtén un plan de estudios personalizado basado en tus objetivos y nivel actual. 
            Incluye certificaciones oficiales reconocidas en la industria.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Crear Mi Ruta de Aprendizaje
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;