import { useState, useEffect } from 'react'
import { Course, dbUtils } from '../lib/supabase'

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await dbUtils.getCourses()
      setCourses(data)
    } catch (err) {
      setError('Error al cargar cursos')
      console.error('Error loading courses:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    refetch: loadCourses
  }
}