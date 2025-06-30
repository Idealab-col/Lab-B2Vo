import { useState, useEffect } from 'react'
import { Tool, dbUtils } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export const useTools = (category?: string) => {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, hasPremiumAccess } = useAuth()

  const loadTools = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = category 
        ? await dbUtils.getToolsByCategory(category)
        : await dbUtils.getTools()
      
      setTools(data)
    } catch (err) {
      setError('Error al cargar herramientas')
      console.error('Error loading tools:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadTool = async (tool: Tool): Promise<boolean> => {
    if (!user) {
      toast.error('Debes iniciar sesión para descargar herramientas')
      return false
    }

    // Verificar acceso premium si la herramienta lo requiere
    if (tool.is_premium && !hasPremiumAccess) {
      toast.error('Esta herramienta requiere membresía premium')
      return false
    }

    try {
      const success = await dbUtils.recordDownload(user.id, tool.id)
      if (success) {
        toast.success(`${tool.name} descargada exitosamente`)
        // Actualizar el contador local
        setTools(prevTools => 
          prevTools.map(t => 
            t.id === tool.id 
              ? { ...t, downloads: t.downloads + 1 }
              : t
          )
        )
        return true
      } else {
        toast.error('Error al registrar descarga')
        return false
      }
    } catch (error) {
      toast.error('Error al descargar herramienta')
      return false
    }
  }

  const createTool = async (toolData: Omit<Tool, 'id' | 'created_at' | 'updated_at' | 'downloads'>): Promise<boolean> => {
    try {
      const newTool = await dbUtils.createTool(toolData)
      if (newTool) {
        setTools(prevTools => [newTool, ...prevTools])
        toast.success('Herramienta creada exitosamente')
        return true
      } else {
        toast.error('Error al crear herramienta')
        return false
      }
    } catch (error) {
      toast.error('Error al crear herramienta')
      return false
    }
  }

  const updateTool = async (id: string, updates: Partial<Tool>): Promise<boolean> => {
    try {
      const success = await dbUtils.updateTool(id, updates)
      if (success) {
        setTools(prevTools => 
          prevTools.map(tool => 
            tool.id === id 
              ? { ...tool, ...updates, updated_at: new Date().toISOString() }
              : tool
          )
        )
        toast.success('Herramienta actualizada exitosamente')
        return true
      } else {
        toast.error('Error al actualizar herramienta')
        return false
      }
    } catch (error) {
      toast.error('Error al actualizar herramienta')
      return false
    }
  }

  const deleteTool = async (id: string): Promise<boolean> => {
    try {
      const success = await dbUtils.deleteTool(id)
      if (success) {
        setTools(prevTools => prevTools.filter(tool => tool.id !== id))
        toast.success('Herramienta eliminada exitosamente')
        return true
      } else {
        toast.error('Error al eliminar herramienta')
        return false
      }
    } catch (error) {
      toast.error('Error al eliminar herramienta')
      return false
    }
  }

  useEffect(() => {
    loadTools()
  }, [category])

  return {
    tools,
    loading,
    error,
    downloadTool,
    createTool,
    updateTool,
    deleteTool,
    refetch: loadTools
  }
}