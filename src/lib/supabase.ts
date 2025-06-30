import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de datos actualizados
export interface Profile {
  id: string
  full_name: string | null
  company: string | null
  membership_type: 'free' | 'entrepreneur' | 'fullstack'
  created_at: string
  updated_at: string
}

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  type: string | null
  downloads: number
  rating: number
  is_premium: boolean
  file_url: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  duration: string | null
  lessons: number
  students: number
  rating: number
  is_premium: boolean
  instructor: string | null
  price: string | null
  image_url: string | null
  features: string[]
  created_at: string
  updated_at: string
}

interface UserDownload {
  id: string
  user_id: string
  tool_id: string
  downloaded_at: string
}

// Funciones de utilidad para la base de datos
export const dbUtils = {
  // Obtener perfil del usuario
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data
  },

  // Actualizar perfil del usuario
  async updateProfile(userId: string, updates: Partial<Profile>): Promise<boolean> {
    const { error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
    
    if (error) {
      console.error('Error updating profile:', error)
      return false
    }
    return true
  },

  // Obtener todas las herramientas
  async getTools(): Promise<Tool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('downloads', { ascending: false })
    
    if (error) {
      console.error('Error fetching tools:', error)
      return []
    }
    return data || []
  },

  // Obtener herramientas por categoría
  async getToolsByCategory(category: string): Promise<Tool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category', category)
      .order('downloads', { ascending: false })
    
    if (error) {
      console.error('Error fetching tools by category:', error)
      return []
    }
    return data || []
  },

  // Registrar descarga de herramienta
  async recordDownload(userId: string, toolId: string): Promise<boolean> {
    // Primero verificar si ya fue descargada
    const { data: existing } = await supabase
      .from('user_downloads')
      .select('id')
      .eq('user_id', userId)
      .eq('tool_id', toolId)
      .single()
    
    if (existing) {
      return true // Ya fue descargada
    }

    // Registrar nueva descarga
    const { error: downloadError } = await supabase
      .from('user_downloads')
      .insert({ user_id: userId, tool_id: toolId })
    
    if (downloadError) {
      console.error('Error recording download:', downloadError)
      return false
    }

    // Incrementar contador de descargas
    const { error: incrementError } = await supabase
      .rpc('increment_tool_downloads', { tool_id: toolId })
    
    if (incrementError) {
      console.error('Error incrementing downloads:', incrementError)
    }

    return true
  },

  // Verificar si el usuario tiene acceso premium
  async hasPremiumAccess(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('has_premium_access', { user_id: userId })
    
    if (error) {
      console.error('Error checking premium access:', error)
      return false
    }
    return data || false
  },

  // Obtener descargas del usuario
  async getUserDownloads(userId: string): Promise<UserDownload[]> {
    const { data, error } = await supabase
      .from('user_downloads')
      .select('*')
      .eq('user_id', userId)
      .order('downloaded_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching user downloads:', error)
      return []
    }
    return data || []
  },

  // Obtener todos los cursos
  async getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('students', { ascending: false })
    
    if (error) {
      console.error('Error fetching courses:', error)
      return []
    }
    return data || []
  },

  // Crear nueva herramienta (solo admins)
  async createTool(tool: Omit<Tool, 'id' | 'created_at' | 'updated_at' | 'downloads'>): Promise<Tool | null> {
    const { data, error } = await supabase
      .from('tools')
      .insert(tool)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating tool:', error)
      return null
    }
    return data
  },

  // Actualizar herramienta (solo admins)
  async updateTool(id: string, updates: Partial<Tool>): Promise<boolean> {
    const { error } = await supabase
      .from('tools')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) {
      console.error('Error updating tool:', error)
      return false
    }
    return true
  },

  // Eliminar herramienta (solo admins)
  async deleteTool(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting tool:', error)
      return false
    }
    return true
  }
}