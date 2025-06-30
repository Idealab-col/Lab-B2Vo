import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Users, 
  Crown,
  Mail,
  Calendar,
  Building,
  MoreVertical,
  UserCheck,
  UserX,
  Download,
  Eye
} from 'lucide-react'
import { supabase, Profile } from '../../lib/supabase'
import toast from 'react-hot-toast'

const AdminUsers = () => {
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMembership, setSelectedMembership] = useState('all')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)

  const membershipTypes = [
    { id: 'all', name: 'Todas las membresías' },
    { id: 'free', name: 'Básico/Starter' },
    { id: 'entrepreneur', name: 'Emprendedor' },
    { id: 'fullstack', name: 'FullStack' }
  ]

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error loading users:', error)
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMembership = selectedMembership === 'all' || user.membership_type === selectedMembership
    return matchesSearch && matchesMembership
  })

  const updateUserMembership = async (userId: string, newMembership: 'free' | 'entrepreneur' | 'fullstack') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          membership_type: newMembership,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
      
      if (error) throw error
      
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, membership_type: newMembership }
          : user
      ))
      
      toast.success('Membresía actualizada exitosamente')
    } catch (error) {
      console.error('Error updating membership:', error)
      toast.error('Error al actualizar membresía')
    }
  }

  const deleteUser = async (userId: string, userName: string) => {
    if (confirm(`¿Estás seguro de eliminar al usuario "${userName}"?`)) {
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', userId)
        
        if (error) throw error
        
        setUsers(users.filter(user => user.id !== userId))
        toast.success('Usuario eliminado exitosamente')
      } catch (error) {
        console.error('Error deleting user:', error)
        toast.error('Error al eliminar usuario')
      }
    }
  }

  const getMembershipColor = (membership: string) => {
    switch (membership) {
      case 'free': return 'bg-gray-100 text-gray-800'
      case 'entrepreneur': return 'bg-blue-100 text-blue-800'
      case 'fullstack': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMembershipName = (membership: string) => {
    const type = membershipTypes.find(t => t.id === membership)
    return type ? type.name : membership
  }

  const exportUsers = () => {
    const csvContent = [
      ['Nombre', 'Email', 'Empresa', 'Membresía', 'Fecha de Registro'].join(','),
      ...filteredUsers.map(user => [
        user.full_name || '',
        '', // Email no está disponible en profiles
        user.company || '',
        getMembershipName(user.membership_type),
        new Date(user.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'usuarios-brainlab.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios y sus membresías</p>
        </div>
        <button
          onClick={exportUsers}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <Download className="h-5 w-5" />
          <span>Exportar CSV</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Usuarios Free</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.membership_type === 'free').length}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <UserCheck className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Emprendedores</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.membership_type === 'entrepreneur').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Crown className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">FullStack</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.membership_type === 'fullstack').length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Crown className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar usuarios por nombre o empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              value={selectedMembership}
              onChange={(e) => setSelectedMembership(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
            >
              {membershipTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membresía
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-medium">
                          {user.full_name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name || 'Sin nombre'}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {user.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.company ? (
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{user.company}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Sin empresa</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMembershipColor(user.membership_type)}`}>
                        {getMembershipName(user.membership_type)}
                      </span>
                      {user.membership_type !== 'free' && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <div className="relative group">
                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => updateUserMembership(user.id, 'free')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Cambiar a Free
                            </button>
                            <button
                              onClick={() => updateUserMembership(user.id, 'entrepreneur')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Cambiar a Emprendedor
                            </button>
                            <button
                              onClick={() => updateUserMembership(user.id, 'fullstack')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Cambiar a FullStack
                            </button>
                            <hr className="my-1" />
                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setShowUserModal(true)
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Ver detalles
                            </button>
                            <button
                              onClick={() => deleteUser(user.id, user.full_name || 'Usuario')}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Eliminar usuario
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Detalles del Usuario</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-medium">
                      {selectedUser.full_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {selectedUser.full_name || 'Sin nombre'}
                  </h4>
                  <p className="text-sm text-gray-500">ID: {selectedUser.id}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Empresa</label>
                    <p className="text-gray-900">{selectedUser.company || 'No especificada'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Membresía</label>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMembershipColor(selectedUser.membership_type)}`}>
                        {getMembershipName(selectedUser.membership_type)}
                      </span>
                      {selectedUser.membership_type !== 'free' && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fecha de Registro</label>
                    <p className="text-gray-900">{new Date(selectedUser.created_at).toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Última Actualización</label>
                    <p className="text-gray-900">{new Date(selectedUser.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers