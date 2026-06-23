import { createClient } from '@supabase/supabase-js';

// Reemplazá estos valores con los de tu proyecto Supabase
// Los encontrás en: Settings > API
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://TU_PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'TU_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Permisos por rol
export const PERMISOS = {
  admin: {
    verTubos: true,
    verMovimientos: true,
    verCostos: true,
    registrarMovimientos: true,
    gestionarTubos: true,
    gestionarUsuarios: true,
    verReportes: true,
  },
  almacen: {
    verTubos: true,
    verMovimientos: true,
    verCostos: false,
    registrarMovimientos: true,
    gestionarTubos: true,
    gestionarUsuarios: false,
    verReportes: false,
  },
  compras: {
    verTubos: true,
    verMovimientos: true,
    verCostos: true,
    registrarMovimientos: false,
    gestionarTubos: false,
    gestionarUsuarios: false,
    verReportes: true,
  },
  mantenimiento: {
    verTubos: true,
    verMovimientos: false,
    verCostos: false,
    registrarMovimientos: false,
    gestionarTubos: false,
    gestionarUsuarios: false,
    verReportes: false,
  },
  infraestructura: {
    verTubos: true,
    verMovimientos: false,
    verCostos: false,
    registrarMovimientos: false,
    gestionarTubos: false,
    gestionarUsuarios: false,
    verReportes: false,
  },
};

export const TIPOS_TUBO = ['O2', 'Butano', 'N2', 'Atal'];
export const ESTADOS_TUBO = ['Lleno', 'Vacío', 'En Reparación', 'Retirado'];
export const UBICACIONES = ['Almacén', 'Mantenimiento', 'Infraestructura', 'Proveedor'];
export const TIPOS_OPERACION = ['Entrega', 'Cambio', 'Retorno', 'Devolución'];
export const SECTORES = ['Almacén', 'Mantenimiento', 'Infraestructura', 'Proveedor', 'Compras'];
