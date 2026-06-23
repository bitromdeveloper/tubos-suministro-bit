# Control de Gases — Benito Roggio Ambiental

## Instrucciones de setup (hacerlo UNA SOLA VEZ)

---

## PASO 1: Crear proyecto en Supabase (5 minutos)

1. Ir a https://supabase.com y crear cuenta gratuita
2. Crear nuevo proyecto:
   - Name: `tubos-bra`
   - Password: (elegí una segura, la necesitás para la BD)
   - Region: South America (São Paulo)
3. Esperar que termine de provisionar (~2 min)

---

## PASO 2: Ejecutar el SQL (2 minutos)

1. En tu proyecto Supabase, ir a: **SQL Editor** (ícono de terminal en sidebar)
2. Copiar TODO el contenido de `SUPABASE_SETUP.sql`
3. Pegarlo en el editor y hacer clic en **Run**
4. Verificar que no haya errores rojos

Esto crea:
- Tabla `tubos` (inventario)
- Tabla `movimientos` (historial)
- Tabla `ciclos_mensuales` (costos)
- Tabla `usuarios` (los 4 usuarios del sistema)

---

## PASO 3: Obtener credenciales de Supabase (1 minuto)

1. En Supabase, ir a: **Settings > API**
2. Copiar:
   - **Project URL**: `https://xxxx.supabase.co`
   - **anon public** key: `eyJxx...` (clave larga)

---

## PASO 4: Configurar las credenciales en el código

Abrir el archivo `src/lib/supabase.js` y reemplazar:

```javascript
const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co'; // ← tu URL
const SUPABASE_ANON_KEY = 'TU_ANON_KEY'; // ← tu clave anon
```

---

## PASO 5: Deployar en Vercel (5 minutos)

### Opción A: Con GitHub (recomendado)
1. Subir esta carpeta a un repositorio GitHub (puede ser privado)
2. Ir a https://vercel.com → crear cuenta gratuita
3. "New Project" → Importar el repo
4. Vercel detecta automáticamente React
5. En "Environment Variables" agregar:
   - `REACT_APP_SUPABASE_URL` = tu URL de Supabase
   - `REACT_APP_SUPABASE_ANON_KEY` = tu anon key
6. Deploy → listo

### Opción B: Con Vercel CLI (sin GitHub)
```bash
npm install -g vercel
cd tubos-app
vercel
# Seguir las instrucciones, elegir "Create new project"
```

---

## USUARIOS INICIALES

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin.bra | tubos.admin | Administrador (todo) |
| almacen.bra | tubos.almacen | Almacén (registra movimientos, gestiona tubos) |
| compras.bra | tubos.compras | Compras (ve costos, reportes, movimientos) |
| mantenimiento.bra | gases.mantenimiento | Mantenimiento (solo consulta estado) |

---

## PERMISOS POR ROL

| Función | Admin | Almacén | Compras | Mantenimiento |
|---------|-------|---------|---------|---------------|
| Ver estado de tubos | ✓ | ✓ | ✓ | ✓ |
| Registrar movimientos | ✓ | ✓ | ✗ | ✗ |
| Gestionar tubos | ✓ | ✓ | ✗ | ✗ |
| Ver historial | ✓ | ✓ | ✓ | ✗ |
| Ver costos/ciclos | ✓ | ✗ | ✓ | ✗ |

---

## SI SUPABASE SE PAUSA

1. Ir a https://supabase.com → tu proyecto
2. Clic en el botón "Restore project" o "Reactivar"
3. Esperar 5-10 minutos
4. La app vuelve a funcionar (los datos NO se pierden)

---

## DESARROLLO LOCAL (opcional)

```bash
cd tubos-app
npm install
npm start
# Abre http://localhost:3000
```

---

## ESTRUCTURA DEL PROYECTO

```
tubos-app/
├── public/
│   └── index.html
├── src/
│   ├── lib/
│   │   └── supabase.js          ← Credenciales y config
│   ├── components/
│   │   ├── AuthContext.js       ← Login/logout/auth state
│   │   └── Layout.js            ← Sidebar y navegación
│   ├── pages/
│   │   ├── LoginPage.js         ← Pantalla de login
│   │   ├── Dashboard.js         ← Estado de tubos (todos)
│   │   ├── Movimientos.js       ← Historial (Almacén + Compras)
│   │   ├── RegistrarMovimiento.js ← Registrar (Almacén)
│   │   ├── GestionTubos.js      ← ABM tubos (Almacén)
│   │   ├── CiclosMensuales.js   ← Costos (Compras)
│   │   └── Perfil.js            ← Cambio de contraseña y emails
│   ├── App.js
│   └── index.js
├── SUPABASE_SETUP.sql           ← Ejecutar en Supabase SQL Editor
└── README.md
```
