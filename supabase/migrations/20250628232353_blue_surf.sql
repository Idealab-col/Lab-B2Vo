/*
  # Esquema inicial de BrainLab

  1. Nuevas Tablas
    - `profiles` - Perfiles de usuario extendidos
      - `id` (uuid, referencia a auth.users)
      - `full_name` (text)
      - `company` (text, opcional)
      - `membership_type` (enum)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tools` - Herramientas ThinkUp
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `type` (text)
      - `downloads` (integer)
      - `rating` (numeric)
      - `is_premium` (boolean)
      - `file_url` (text, opcional)
      - `tags` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `courses` - Cursos y workshops
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `duration` (text)
      - `lessons` (integer)
      - `students` (integer)
      - `rating` (numeric)
      - `is_premium` (boolean)
      - `instructor` (text)
      - `price` (text)
      - `image_url` (text, opcional)
      - `features` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_downloads` - Registro de descargas
      - `id` (uuid, primary key)
      - `user_id` (uuid, referencia a profiles)
      - `tool_id` (uuid, referencia a tools)
      - `downloaded_at` (timestamp)

  2. Seguridad
    - Enable RLS en todas las tablas
    - Políticas para usuarios autenticados
    - Políticas específicas para administradores
    - Políticas de acceso según membresía

  3. Funciones
    - Trigger para crear perfil automáticamente
    - Función para verificar membresía
    - Función para incrementar contador de descargas
*/

-- Crear enum para tipos de membresía
CREATE TYPE membership_type AS ENUM ('free', 'entrepreneur', 'fullstack');

-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  company text,
  membership_type membership_type DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de herramientas
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  type text,
  downloads integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  is_premium boolean DEFAULT false,
  file_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  duration text,
  lessons integer DEFAULT 0,
  students integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  is_premium boolean DEFAULT false,
  instructor text,
  price text,
  image_url text,
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de descargas de usuarios
CREATE TABLE IF NOT EXISTS user_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  downloaded_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tool_id)
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_downloads ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Políticas para tools (todos pueden leer, solo admins pueden modificar)
CREATE POLICY "Anyone can read tools"
  ON tools
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert tools"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' IN ('admin@brainlab.com.co')
    )
  );

CREATE POLICY "Only admins can update tools"
  ON tools
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' IN ('admin@brainlab.com.co')
    )
  );

CREATE POLICY "Only admins can delete tools"
  ON tools
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' IN ('admin@brainlab.com.co')
    )
  );

-- Políticas para courses (similar a tools)
CREATE POLICY "Anyone can read courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' IN ('admin@brainlab.com.co')
    )
  );

-- Políticas para user_downloads
CREATE POLICY "Users can read own downloads"
  ON user_downloads
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own downloads"
  ON user_downloads
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Función para verificar acceso premium
CREATE OR REPLACE FUNCTION has_premium_access(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id 
    AND membership_type IN ('entrepreneur', 'fullstack')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para incrementar descargas
CREATE OR REPLACE FUNCTION increment_tool_downloads(tool_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE tools 
  SET downloads = downloads + 1 
  WHERE id = tool_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insertar datos de ejemplo para herramientas
INSERT INTO tools (name, description, category, type, downloads, rating, is_premium, tags) VALUES
('Matriz de Eisenhower', 'Prioriza tareas según urgencia e importancia para una gestión eficaz del tiempo', 'decision', 'Urgente/Importante', 2150, 4.9, true, ARRAY['Excel', 'PDF', 'Plantilla']),
('Análisis Costo-Beneficio', 'Evalúa decisiones éticas y comerciales con análisis cuantitativo adaptable', 'decision', 'Decisiones Éticas', 1890, 4.8, true, ARRAY['Excel', 'Automatizada']),
('Matriz de Decisión', 'Sistema de pesos personalizables para decisiones complejas multicriterio', 'decision', 'Multicriterio', 1650, 4.7, true, ARRAY['Excel', 'Pesos Personalizables']),
('5 Whys (5 Porqués)', 'Encuentra la causa raíz de problemas mediante análisis iterativo profundo', 'problem', 'Causa Raíz', 2890, 4.9, true, ARRAY['PDF', 'Worksheet']),
('Análisis SWOT/FODA', 'Evalúa fortalezas, debilidades, oportunidades y amenazas de tu organización', 'strategy', 'Análisis Estratégico', 3420, 4.9, false, ARRAY['Excel', 'Estrategia']),
('SCAMPER', 'Genera alternativas creativas a productos existentes con 7 técnicas probadas', 'creativity', 'Alternativas', 1890, 4.8, true, ARRAY['Creatividad', 'Innovación']),
('Pyramid Principle', 'Estructura ideas de forma piramidal para comunicación clara y persuasiva', 'communication', 'Estructura Piramidal', 1650, 4.7, true, ARRAY['Comunicación', 'Estructura']);

-- Insertar datos de ejemplo para cursos
INSERT INTO courses (title, description, category, duration, lessons, students, rating, is_premium, instructor, price, features) VALUES
('Fundamentos de Transformación Digital', 'Aprende los conceptos básicos para digitalizar tu negocio desde cero', 'digital', '4 semanas', 16, 1250, 4.8, false, 'Carlos Mendoza', 'Gratis', ARRAY['Videos HD', 'Certificado', 'Soporte']),
('Marketing Digital para MiPymes', 'Estrategias efectivas de marketing digital adaptadas a pequeñas empresas', 'marketing', '6 semanas', 24, 890, 4.9, true, 'Ana García', '$99', ARRAY['Videos HD', 'Certificado', 'Mentorías', 'Recursos Extra']),
('Automatización de Procesos Empresariales', 'Optimiza tu negocio con herramientas de automatización y flujos de trabajo', 'tools', '5 semanas', 20, 650, 4.7, true, 'Roberto Silva', '$149', ARRAY['Videos HD', 'Certificado', 'Proyectos Prácticos', 'Soporte 1:1']);