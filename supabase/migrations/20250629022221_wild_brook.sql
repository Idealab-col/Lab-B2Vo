/*
  # Sistema de Bypass y Referidos

  1. Nuevas Tablas
    - `bypass_codes` - Códigos de bypass generados
    - `bypass_usage` - Tracking de uso de bypass
    - `referrals` - Sistema de referidos
    - `email_campaigns` - Campañas de email automatizadas

  2. Funciones
    - Generar códigos de bypass únicos
    - Validar y activar bypass
    - Sistema de referidos
    - Tracking de expiración

  3. Triggers
    - Auto-expiración de bypass
    - Notificaciones de expiración
    - Recompensas por referidos
*/

-- Tabla de códigos de bypass
CREATE TABLE IF NOT EXISTS bypass_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  email text NOT NULL,
  name text NOT NULL,
  whatsapp text,
  interest text NOT NULL,
  
  -- Configuración del bypass
  hours_granted integer DEFAULT 100,
  hours_used integer DEFAULT 0,
  hours_remaining integer DEFAULT 100,
  
  -- Estado
  status text DEFAULT 'active', -- active, expired, used, suspended
  activated_at timestamptz,
  expires_at timestamptz,
  
  -- Origen
  source text DEFAULT 'bypass_popup', -- bypass_popup, referral, admin
  referrer_id uuid REFERENCES bypass_codes(id),
  
  -- Tracking
  ip_address text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_activity_at timestamptz DEFAULT now()
);

-- Tabla de uso de bypass (sesiones)
CREATE TABLE IF NOT EXISTS bypass_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bypass_code_id uuid REFERENCES bypass_codes(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  
  -- Datos de la sesión
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration_minutes integer DEFAULT 0,
  
  -- Actividad durante la sesión
  pages_visited text[] DEFAULT '{}',
  tools_accessed text[] DEFAULT '{}',
  courses_accessed text[] DEFAULT '{}',
  downloads_count integer DEFAULT 0,
  
  -- Datos técnicos
  ip_address text,
  user_agent text,
  
  created_at timestamptz DEFAULT now()
);

-- Tabla de referidos
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_bypass_id uuid REFERENCES bypass_codes(id) ON DELETE CASCADE,
  referred_email text NOT NULL,
  referred_name text,
  referred_phone text,
  
  -- Estado del referido
  status text DEFAULT 'pending', -- pending, sent, activated, expired
  bypass_code_generated text,
  
  -- Recompensas
  bonus_hours_granted integer DEFAULT 50,
  bonus_applied boolean DEFAULT false,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  activated_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Tabla de campañas de email
CREATE TABLE IF NOT EXISTS email_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bypass_code_id uuid REFERENCES bypass_codes(id) ON DELETE CASCADE,
  
  -- Tipo de campaña
  campaign_type text NOT NULL, -- welcome, expiration_warning, expired, referral_invite
  
  -- Estado
  status text DEFAULT 'pending', -- pending, sent, failed
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  
  -- Contenido
  subject text,
  template_used text,
  variables jsonb,
  
  -- Proveedor de email
  provider text DEFAULT 'brevo',
  external_id text,
  
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE bypass_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bypass_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;

-- Políticas para bypass_codes
CREATE POLICY "Anyone can read active bypass codes"
  ON bypass_codes
  FOR SELECT
  USING (status = 'active' AND expires_at > now());

CREATE POLICY "Admins can manage all bypass codes"
  ON bypass_codes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' = 'admin@brainlab.com.co'
    )
  );

-- Políticas para bypass_usage
CREATE POLICY "Users can read own bypass usage"
  ON bypass_usage
  FOR SELECT
  USING (
    bypass_code_id IN (
      SELECT id FROM bypass_codes 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Users can insert own bypass usage"
  ON bypass_usage
  FOR INSERT
  WITH CHECK (
    bypass_code_id IN (
      SELECT id FROM bypass_codes 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Políticas para referrals
CREATE POLICY "Users can manage own referrals"
  ON referrals
  FOR ALL
  USING (
    referrer_bypass_id IN (
      SELECT id FROM bypass_codes 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Políticas para email_campaigns (solo admins)
CREATE POLICY "Admins can manage email campaigns"
  ON email_campaigns
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND auth.jwt() ->> 'email' = 'admin@brainlab.com.co'
    )
  );

-- Función para generar código de bypass único
CREATE OR REPLACE FUNCTION generate_bypass_code()
RETURNS text AS $$
DECLARE
  new_code text;
  code_exists boolean;
BEGIN
  LOOP
    -- Generar código de 6 caracteres alfanuméricos
    new_code := 'BP' || upper(substring(md5(random()::text) from 1 for 6));
    
    -- Verificar si ya existe
    SELECT EXISTS(SELECT 1 FROM bypass_codes WHERE code = new_code) INTO code_exists;
    
    -- Si no existe, salir del loop
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Función para crear bypass
CREATE OR REPLACE FUNCTION create_bypass(
  p_email text,
  p_name text,
  p_whatsapp text,
  p_interest text,
  p_source text DEFAULT 'bypass_popup',
  p_referrer_id uuid DEFAULT NULL
)
RETURNS text AS $$
DECLARE
  new_code text;
  bypass_id uuid;
BEGIN
  -- Generar código único
  new_code := generate_bypass_code();
  
  -- Crear bypass
  INSERT INTO bypass_codes (
    code, email, name, whatsapp, interest, source, referrer_id,
    activated_at, expires_at
  ) VALUES (
    new_code, p_email, p_name, p_whatsapp, p_interest, p_source, p_referrer_id,
    now(), now() + interval '100 hours'
  ) RETURNING id INTO bypass_id;
  
  -- Programar email de bienvenida
  INSERT INTO email_campaigns (
    bypass_code_id, campaign_type, subject, template_used,
    variables
  ) VALUES (
    bypass_id, 'welcome', 
    '🎉 ¡Felicidades! Tu Bypass de 100 horas está listo',
    'bypass_welcome',
    jsonb_build_object(
      'name', p_name,
      'bypassCode', new_code,
      'interest', p_interest
    )
  );
  
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Función para validar bypass
CREATE OR REPLACE FUNCTION validate_bypass(p_code text)
RETURNS jsonb AS $$
DECLARE
  bypass_record record;
  result jsonb;
BEGIN
  -- Buscar bypass
  SELECT * INTO bypass_record
  FROM bypass_codes 
  WHERE code = p_code;
  
  -- Si no existe
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Código no encontrado'
    );
  END IF;
  
  -- Si está expirado
  IF bypass_record.expires_at < now() THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Código expirado',
      'expired_at', bypass_record.expires_at
    );
  END IF;
  
  -- Si no está activo
  IF bypass_record.status != 'active' THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Código no activo',
      'status', bypass_record.status
    );
  END IF;
  
  -- Actualizar última actividad
  UPDATE bypass_codes 
  SET last_activity_at = now()
  WHERE id = bypass_record.id;
  
  -- Retornar datos válidos
  RETURN jsonb_build_object(
    'valid', true,
    'bypass_id', bypass_record.id,
    'email', bypass_record.email,
    'name', bypass_record.name,
    'hours_remaining', bypass_record.hours_remaining,
    'expires_at', bypass_record.expires_at,
    'interest', bypass_record.interest
  );
END;
$$ LANGUAGE plpgsql;

-- Función para crear referido
CREATE OR REPLACE FUNCTION create_referral(
  p_referrer_code text,
  p_referred_email text,
  p_referred_name text,
  p_referred_phone text DEFAULT NULL
)
RETURNS jsonb AS $$
DECLARE
  referrer_bypass_id uuid;
  new_bypass_code text;
  referral_id uuid;
BEGIN
  -- Buscar bypass del referidor
  SELECT id INTO referrer_bypass_id
  FROM bypass_codes 
  WHERE code = p_referrer_code AND status = 'active';
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Código de referidor no válido'
    );
  END IF;
  
  -- Crear bypass para el referido
  new_bypass_code := create_bypass(
    p_referred_email, p_referred_name, p_referred_phone, 
    'referral', 'referral', referrer_bypass_id
  );
  
  -- Crear registro de referido
  INSERT INTO referrals (
    referrer_bypass_id, referred_email, referred_name, referred_phone,
    bypass_code_generated, status
  ) VALUES (
    referrer_bypass_id, p_referred_email, p_referred_name, p_referred_phone,
    new_bypass_code, 'sent'
  ) RETURNING id INTO referral_id;
  
  -- Otorgar horas bonus al referidor
  UPDATE bypass_codes 
  SET 
    hours_granted = hours_granted + 50,
    hours_remaining = hours_remaining + 50,
    updated_at = now()
  WHERE id = referrer_bypass_id;
  
  -- Marcar bonus como aplicado
  UPDATE referrals 
  SET bonus_applied = true, updated_at = now()
  WHERE id = referral_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'new_bypass_code', new_bypass_code,
    'bonus_hours_granted', 50
  );
END;
$$ LANGUAGE plpgsql;

-- Función para procesar expiración de bypass
CREATE OR REPLACE FUNCTION process_bypass_expiration()
RETURNS void AS $$
BEGIN
  -- Marcar como expirados los bypass que ya vencieron
  UPDATE bypass_codes 
  SET status = 'expired', updated_at = now()
  WHERE status = 'active' AND expires_at < now();
  
  -- Programar emails de advertencia (24 horas antes)
  INSERT INTO email_campaigns (
    bypass_code_id, campaign_type, subject, template_used,
    variables
  )
  SELECT 
    id, 'expiration_warning',
    '⏰ Tu Bypass expira pronto - Reclama tu descuento del 50%',
    'bypass_expiration',
    jsonb_build_object(
      'name', name,
      'hours_remaining', hours_remaining,
      'expires_at', expires_at
    )
  FROM bypass_codes 
  WHERE status = 'active' 
    AND expires_at BETWEEN now() AND now() + interval '24 hours'
    AND id NOT IN (
      SELECT bypass_code_id 
      FROM email_campaigns 
      WHERE campaign_type = 'expiration_warning'
    );
END;
$$ LANGUAGE plpgsql;

-- Crear índices para performance
CREATE INDEX IF NOT EXISTS idx_bypass_codes_code ON bypass_codes(code);
CREATE INDEX IF NOT EXISTS idx_bypass_codes_email ON bypass_codes(email);
CREATE INDEX IF NOT EXISTS idx_bypass_codes_status ON bypass_codes(status);
CREATE INDEX IF NOT EXISTS idx_bypass_codes_expires_at ON bypass_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_bypass_usage_bypass_code_id ON bypass_usage(bypass_code_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_bypass_id ON referrals(referrer_bypass_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_bypass_code_id ON email_campaigns(bypass_code_id);

-- Programar tarea para procesar expiraciones (esto se ejecutaría con un cron job)
-- SELECT cron.schedule('process-bypass-expiration', '0 */6 * * *', 'SELECT process_bypass_expiration();');