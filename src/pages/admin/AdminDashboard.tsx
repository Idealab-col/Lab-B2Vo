import React, { useState, useEffect } from 'react'
import { 
  Users, 
  FileText, 
  BookOpen, 
  Download, 
  TrendingUp, 
  DollarSign,
  Eye,
  Plus
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTools: 0,
    totalCourses: 0,
    totalDownloads: 0,
    monthlyRevenue: 0,
    activeUsers: 0
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'user', message: 'Nuevo usuario registrado: maria@email.com', time: '2 min ago' },
    { id: 2, type: 'download', message: 'Plan de Negocio Canvas descargado', time: '5 min ago' },
    { id: 3, type: 'course', message: 'Usuario completó: Marketing Digital', time: '10 min ago' },
  ])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    // Aquí cargarías datos reales de Supabase
    // Por ahora usamos datos de ejemplo
    setStats({
      totalUsers: 1247,
      totalTools: 47,
      totalCourses: 23,
      totalDownloads: 8934,
      monthlyRevenue: 12450,
      activeUsers: 89
    })
  }

  const statCards = [
    {
      title: 'Usuarios Totales',
      value: stats.totalUsers.toLocaleString(),
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Herramientas',
      value: stats.totalTools,
      change: '+3',
      changeType: 'positive',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Cursos',
      value: stats.totalCourses,
      change: '+2',
      changeType: 'positive',
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Descargas',
      value: stats.totalDownloads.toLocaleString(),
      change: '+23%',
      changeType: 'positive',
      icon: Download,
      color: 'orange'
    },
    {
      title: 'Ingresos Mensuales',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: '+18%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Usuarios Activos',
      value: stats.activeUsers,
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'red'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50',
      emerald: 'bg-emerald-500 text-emerald-600 bg-emerald-50',
      red: 'bg-red-500 text-red-600 bg-red-50'
    }
    return colors[color as keyof typeof colors].split(' ')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen general de tu plataforma BrainLab</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const [bgColor, textColor, bgLight] = getColorClasses(stat.color)
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${bgLight}`}>
                  <stat.icon className={`h-6 w-6 ${textColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Agregar Herramienta</p>
                <p className="text-sm text-gray-500">Subir nueva herramienta o template</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div className="bg-green-100 p-2 rounded-lg">
                <Plus className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Crear Curso</p>
                <p className="text-sm text-gray-500">Agregar nuevo curso o tutorial</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Eye className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Ver Sitio</p>
                <p className="text-sm text-gray-500">Ir al sitio público</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Crecimiento</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Gráficos de analytics próximamente</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard