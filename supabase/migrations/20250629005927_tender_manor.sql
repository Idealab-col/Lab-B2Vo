/*
  # Sistema de Captura de Leads

  1. Nuevas Tablas
    - `leads` - Captura de leads y visitantes
    - `user_behavior` - Tracking de comportamiento de usuarios
    - `lead_sources` - Fuentes de leads para análisis

  2. Campos adicionales en profiles
    - Información completa de contacto y profesional
    - Datos demográficos y de interés

  3. Seguridad
    - RLS habilitado en todas las tablas
    - Políticas para admins y usuarios autenticados
*/

-- Extender tabla profiles con información completa
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS whatsapp text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS position text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country text DEFAULT 'Colombia';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS interests text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS how_did_you_hear text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS newsletter boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS whatsapp_updates boolean DEFAULT false;

-- Tabla de leads (visitantes no registrados)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  first_name text,
  phone text,
  company text,
  interest text,
  source text NOT NULL,
  
  -- Datos de comportamiento
  time_on_site integer DEFAULT 0,
  pages_visited text[] DEFAULT '{}',
  scroll_depth integer DEFAULT 0,
  clicks_count integer DEFAULT 0,
  tools_viewed text[] DEFAULT '{}',
  courses_viewed text[] DEFAULT '{}',
  download_attempts integer DEFAULT 0,
  search_queries text[] DEFAULT '{}',
  
  -- Datos de sesión
  session_id text,
  user_agent text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_address text,
  
  -- Puntuación de lead
  lead_score integer DEFAULT 0,
  status text DEFAULT 'new', -- new, contacted, qualified, converted, lost
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_activity_at timestamptz DEFAULT now()
);

-- Tabla de comportamiento de usuarios (para usuarios registrados)
CREATE TABLE IF NOT EXISTS user_behavior (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  
  -- Métricas de comportamiento
  time_on_site integer DEFAULT 0,
  pages_visited text[] DEFAULT '{}',
  scroll_depth integer DEFAULT 0,
  clicks_count integer DEFAULT 0,
  tools_viewed text[] DEFAULT '{}',
  courses_viewed text[] DEFAULT '{}',
  download_attempts integer DEFAULT 0,
  search_queries text[] DEFAULT '{}',
  
  -- Datos técnicos
  user_agent text,
  screen_resolution text,
  language text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de fuentes de leads para análisis
CREATE TABLE IF NOT EXISTS lead_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name text NOT NULL UNIQUE,
  source_type text NOT NULL, -- popup, form, social, referral, etc.
  description text,
  conversion_rate numeric(5,2) DEFAULT 0,
  total_leads integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_behavior ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;

-- Políticas para leads (solo admins pueden ver todos)
CREATE POLICY "Admins can manage all leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' = 'admin@brainlab.com.co'
    )
  );

-- Políticas para user_behavior
CREATE POLICY "Users can read own behavior"
  ON user_behavior
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own behavior"
  ON user_behavior
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all behavior"
  ON user_behavior
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' = 'admin@brainlab.com.co'
    )
  );

-- Políticas para lead_sources
CREATE POLICY "Anyone can read lead sources"
  ON lead_sources
  FOR SELECT
  TO authenticated
  USING (active = true);

CREATE POLICY "Admins can manage lead sources"
  ON lead_sources
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' = 'admin@brainlab.com.co'
    )
  );

-- Función para calcular lead score
CREATE OR REPLACE FUNCTION calculate_lead_score(
  p_time_on_site integer,
  p_pages_visited integer,
  p_tools_viewed integer,
  p_courses_viewed integer,
  p_download_attempts integer,
  p_scroll_depth integer
)
RETURNS integer AS $$
BEGIN
  RETURN (
    LEAST(p_time_on_site / 60, 10) + -- Max 10 puntos por tiempo
    p_pages_visited * 2 + -- 2 puntos por página
    p_tools_viewed * 3 + -- 3 puntos por herramienta
    p_courses_viewed * 3 + -- 3 puntos por curso
    p_download_attempts * 5 + -- 5 puntos por descarga
    LEAST(p_scroll_depth / 10, 5) -- Max 5 puntos por scroll
  )::integer;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar lead score automáticamente
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS trigger AS $$
BEGIN
  NEW.lead_score = calculate_lead_score(
    NEW.time_on_site,
    array_length(NEW.pages_visited, 1),
    array_length(NEW.tools_viewed, 1),
    array_length(NEW.courses_viewed, 1),
    NEW.download_attempts,
    NEW.scroll_depth
  );
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar lead score
CREATE TRIGGER update_lead_score_trigger
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_lead_score();

-- Insertar fuentes de leads predefinidas
INSERT INTO lead_sources (source_name, source_type, description) VALUES
('exit_intent', 'popup', 'Popup de intención de salida'),
('time_based', 'popup', 'Popup basado en tiempo en sitio'),
('scroll_based', 'popup', 'Popup basado en porcentaje de scroll'),
('inactivity', 'popup', 'Popup por inactividad del usuario'),
('download_lead_magnet', 'form', 'Formulario de descarga de lead magnet'),
('free_consultation', 'form', 'Formulario de consulta gratuita'),
('newsletter_signup', 'form', 'Suscripción a newsletter'),
('contact_form', 'form', 'Formulario de contacto'),
('whatsapp_contact', 'social', 'Contacto por WhatsApp'),
('social_media', 'social', 'Redes sociales'),
('google_ads', 'paid', 'Google Ads'),
('facebook_ads', 'paid', 'Facebook Ads'),
('referral', 'organic', 'Referencia de otro usuario'),
('organic_search', 'organic', 'Búsqueda orgánica');

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score);
CREATE INDEX IF NOT EXISTS idx_user_behavior_user_id ON user_behavior(user_id);
CREATE INDEX IF NOT EXISTS idx_user_behavior_session_id ON user_behavior(session_id);