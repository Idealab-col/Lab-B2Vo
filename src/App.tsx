import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BypassLeadCapture from './components/BypassLeadCapture';
import AdminLayout from './components/admin/AdminLayout';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import CoursesPage from './pages/CoursesPage';
import MembersPage from './pages/MembersPage';
import WebDevPage from './pages/WebDevPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTools from './pages/admin/AdminTools';
import AdminCourses from './pages/admin/AdminCourses';
import AdminUsers from './pages/admin/AdminUsers';

// Páginas placeholder para las nuevas secciones
const ComingSoonPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">Próximamente disponible</p>
      <div className="animate-pulse bg-gradient-to-r from-blue-600 to-purple-600 h-2 w-64 mx-auto rounded-full"></div>
    </div>
  </div>
);

// Componente para proteger rutas de admin
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Layout público con sistema de captura de leads optimizado
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleBypassCapture = (leadData: any) => {
    // Aquí enviarías los datos a tu sistema de leads
    console.log('Bypass lead captured:', leadData);
    
    // Integrar con Brevo, Supabase, etc.
    // sendToBrevo(leadData);
    // saveToSupabase(leadData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Sistema de captura de bypass - no invasivo */}
      <BypassLeadCapture onCapture={handleBypassCapture} />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              } />
              
              {/* Nueva estructura de rutas */}
              <Route path="/thinkup" element={
                <PublicLayout>
                  <ToolsPage />
                </PublicLayout>
              } />
              <Route path="/webdev" element={
                <PublicLayout>
                  <WebDevPage />
                </PublicLayout>
              } />
              <Route path="/ruta-digital" element={
                <PublicLayout>
                  <ComingSoonPage title="Ruta Digital" />
                </PublicLayout>
              } />
              <Route path="/growmkt" element={
                <PublicLayout>
                  <ComingSoonPage title="GrowMKT" />
                </PublicLayout>
              } />
              <Route path="/showroom" element={
                <PublicLayout>
                  <ComingSoonPage title="Showroom" />
                </PublicLayout>
              } />
              <Route path="/toolbox" element={
                <PublicLayout>
                  <ComingSoonPage title="Toolbox" />
                </PublicLayout>
              } />
              <Route path="/agentes-ia" element={
                <PublicLayout>
                  <ComingSoonPage title="Agentes IA" />
                </PublicLayout>
              } />
              <Route path="/workshops" element={
                <PublicLayout>
                  <CoursesPage />
                </PublicLayout>
              } />
              <Route path="/academia" element={
                <PublicLayout>
                  <CoursesPage />
                </PublicLayout>
              } />
              
              {/* Blog Routes */}
              <Route path="/blog" element={
                <PublicLayout>
                  <BlogPage />
                </PublicLayout>
              } />
              <Route path="/blog/:id" element={
                <PublicLayout>
                  <BlogPostPage />
                </PublicLayout>
              } />
              
              {/* Rutas legacy (redirecciones) */}
              <Route path="/herramientas" element={<Navigate to="/thinkup" replace />} />
              <Route path="/cursos" element={<Navigate to="/workshops" replace />} />
              
              <Route path="/miembros" element={
                <PublicLayout>
                  <MembersPage />
                </PublicLayout>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />

              {/* Rutas de administración */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="tools" element={<AdminTools />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="analytics" element={<div className="p-8">Analytics - Próximamente</div>} />
                <Route path="settings" element={<div className="p-8">Configuración - Próximamente</div>} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;