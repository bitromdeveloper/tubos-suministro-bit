-- =====================================================
-- CONTROL DE TUBOS - BENITO ROGGIO AMBIENTAL
-- Ejecutar en Supabase > SQL Editor en este orden
-- =====================================================

-- 1. USUARIOS DEL SISTEMA
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  sector TEXT NOT NULL CHECK (sector IN ('admin', 'almacen', 'compras', 'mantenimiento', 'infraestructura')),
  email1 TEXT,
  email2 TEXT,
  email3 TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TUBOS (inventario físico)
CREATE TABLE IF NOT EXISTS tubos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT UNIQUE NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('O2', 'Butano', 'N2', 'Atal')),
  capacidad NUMERIC NOT NULL,
  unidad TEXT NOT NULL CHECK (unidad IN ('kg', 'm3')),
  estado TEXT NOT NULL DEFAULT 'Lleno' CHECK (estado IN ('Lleno', 'Vacío', 'En Reparación', 'Retirado')),
  ubicacion TEXT NOT NULL CHECK (ubicacion IN ('Almacén', 'Mantenimiento', 'Infraestructura', 'Proveedor')),
  fecha_entrada DATE NOT NULL DEFAULT CURRENT_DATE,
  precio_unitario NUMERIC DEFAULT 0,
  alquiler_mensual NUMERIC DEFAULT 0,
  precio_transporte NUMERIC DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. MOVIMIENTOS (log de auditoría)
CREATE TABLE IF NOT EXISTS movimientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  tipo_operacion TEXT NOT NULL CHECK (tipo_operacion IN ('Entrega', 'Cambio', 'Retorno', 'Devolución')),
  tubo_id UUID REFERENCES tubos(id),
  tubo_codigo TEXT NOT NULL,
  estado_anterior TEXT,
  estado_nuevo TEXT,
  sector_origen TEXT,
  sector_destino TEXT,
  usuario_registra TEXT NOT NULL,
  observaciones TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CICLOS MENSUALES
CREATE TABLE IF NOT EXISTS ciclos_mensuales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mes TEXT NOT NULL,
  tipo_tubo TEXT NOT NULL,
  cantidad_stock INT NOT NULL DEFAULT 0,
  precio_alquiler_mensual NUMERIC DEFAULT 0,
  precio_transporte_tubo NUMERIC DEFAULT 0,
  cambios_realizados INT DEFAULT 0,
  costo_total NUMERIC GENERATED ALWAYS AS 
    ((precio_alquiler_mensual * cantidad_stock) + (cambios_realizados * precio_transporte_tubo)) STORED,
  observaciones TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(mes, tipo_tubo)
);

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Usuarios (contraseñas en texto plano - la app las compara directamente)
-- En producción real usarías bcrypt, pero para uso interno esto es suficiente
INSERT INTO usuarios (username, password_hash, sector) VALUES
  ('admin.bra', 'tubos.admin', 'admin'),
  ('almacen.bra', 'tubos.almacen', 'almacen'),
  ('compras.bra', 'tubos.compras', 'compras'),
  ('mantenimiento.bra', 'gases.mantenimiento', 'mantenimiento')
ON CONFLICT (username) DO NOTHING;

-- Tubos de ejemplo (podés modificar o borrar)
INSERT INTO tubos (codigo, tipo, capacidad, unidad, estado, ubicacion, precio_unitario, alquiler_mensual, precio_transporte) VALUES
  ('T001', 'O2', 50, 'kg', 'Lleno', 'Almacén', 25.50, 15.00, 8.00),
  ('T002', 'O2', 50, 'kg', 'Lleno', 'Mantenimiento', 25.50, 15.00, 8.00),
  ('T003', 'O2', 50, 'kg', 'Vacío', 'Almacén', 25.50, 15.00, 8.00),
  ('T004', 'Butano', 25, 'kg', 'Lleno', 'Infraestructura', 18.00, 12.00, 6.00),
  ('T005', 'Butano', 25, 'kg', 'Lleno', 'Almacén', 18.00, 12.00, 6.00),
  ('T006', 'N2', 100, 'm3', 'Lleno', 'Almacén', 30.00, 18.00, 10.00),
  ('T007', 'N2', 100, 'm3', 'Vacío', 'Mantenimiento', 30.00, 18.00, 10.00),
  ('T008', 'Atal', 40, 'kg', 'Lleno', 'Almacén', 22.00, 14.00, 7.00)
ON CONFLICT (codigo) DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - deshabilitar para uso interno simple
-- =====================================================
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE tubos DISABLE ROW LEVEL SECURITY;
ALTER TABLE movimientos DISABLE ROW LEVEL SECURITY;
ALTER TABLE ciclos_mensuales DISABLE ROW LEVEL SECURITY;

-- Dar acceso público (la auth la maneja la app, no Supabase Auth)
GRANT ALL ON usuarios TO anon, authenticated;
GRANT ALL ON tubos TO anon, authenticated;
GRANT ALL ON movimientos TO anon, authenticated;
GRANT ALL ON ciclos_mensuales TO anon, authenticated;
