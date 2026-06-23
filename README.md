# 🧪 Gas Cylinder Control System — Benito Roggio Ambiental

A full-stack web application for tracking industrial gas cylinder inventory across multiple departments, built to replace manual spreadsheet-based control in a real production environment.

**Live demo:** `[your-app.vercel.app]`

---

## The Problem

The company manages ~25 industrial gas cylinders (O₂, Butane, N₂, Atal) across multiple sectors. Previously there was no formal tracking system — no audit trail of who moved what cylinder, when, or why. The supplier charges monthly rental per cylinder plus per-delivery transport fees, which were being calculated manually.

## The Solution

A role-based internal web app where:
- **Warehouse** logs every cylinder movement (delivery, swap, return)
- **Maintenance / Infrastructure** can check cylinder status and location at a glance
- **Procurement** monitors monthly costs and generates billing summaries
- **Admin** has full control over inventory and users

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL) |
| Auth | Custom JWT (jsonwebtoken) |
| Hosting | Vercel |

---

## Architecture

```
Browser (React)
    │
    │  JWT in Authorization header
    ▼
Vercel Serverless Functions  (/api/*)
    │
    │  Service role key — never reaches the browser
    ▼
Supabase PostgreSQL
```

The frontend never communicates with Supabase directly. All database access goes through serverless API routes, keeping credentials server-side only. JWTs expire after 8 hours and are verified on every request.

---

## Features

- **Role-based access control** — 4 roles with different permissions enforced both client and server side
- **Cylinder inventory** — full CRUD with status tracking (Full / Empty / In Repair / Retired)
- **Movement log** — auditable history of every cylinder operation with timestamps and the user who registered it
- **Monthly cost cycles** — auto-populated from current stock, with inline-editable fields and automatic cost calculation `(monthly rental × stock) + (swaps × transport fee)`
- **Profile management** — sector users share a login; any of them can change the password (with current password validation) and register up to 3 contact emails
- **Auto-logout** on JWT expiry

---

## Roles & Permissions

| Feature | Admin | Warehouse | Procurement | Maintenance |
|---------|:-----:|:---------:|:-----------:|:-----------:|
| View cylinder status | ✓ | ✓ | ✓ | ✓ |
| Register movements | ✓ | ✓ | — | — |
| Manage cylinders (CRUD) | ✓ | ✓ | — | — |
| View movement history | ✓ | ✓ | ✓ | — |
| View costs & monthly cycles | ✓ | — | ✓ | — |

---

## Project Structure

```
├── api/                        # Vercel Serverless Functions
│   ├── _lib.js                 # Supabase client + JWT verification
│   ├── login.js                # POST /api/login
│   ├── tubos.js                # GET / POST / PUT /api/tubos
│   ├── movimientos.js          # GET / POST /api/movimientos
│   ├── ciclos.js               # GET / POST / PUT /api/ciclos
│   └── perfil.js               # PUT /api/perfil
│
└── src/
    ├── lib/
    │   ├── api.js              # HTTP client — all calls go through /api/
    │   └── constants.js        # Roles, permissions, dropdown values
    ├── components/
    │   ├── AuthContext.js      # Auth state + JWT storage
    │   └── Layout.js           # Sidebar navigation
    └── pages/
        ├── Dashboard.js        # Cylinder status overview + filters
        ├── Movimientos.js      # Movement history with filters
        ├── RegistrarMovimiento.js
        ├── GestionTubos.js     # Cylinder CRUD
        ├── CiclosMensuales.js  # Monthly cost management
        └── Perfil.js           # Password & email settings
```

---

## Environment Variables

Configured in Vercel dashboard only — never committed to the repo.

```
SUPABASE_URL          # Supabase project URL
SUPABASE_SERVICE_KEY  # Service role key (server-side only)
JWT_SECRET            # Random 32+ char string for signing tokens
```

---

## Local Development

```bash
git clone https://github.com/tu-usuario/tubos-suministro
cd tubos-suministro
npm install

# Create a local .env file (gitignored)
echo "SUPABASE_URL=https://xxx.supabase.co" >> .env
echo "SUPABASE_SERVICE_KEY=eyJ..." >> .env
echo "JWT_SECRET=your-secret" >> .env

npm start
```

For the serverless functions locally, install the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

---

## Database Schema

```sql
usuarios         -- sector users with hashed passwords and contact emails
tubos            -- cylinder inventory (type, capacity, state, location, pricing)
movimientos      -- immutable audit log of every cylinder operation
ciclos_mensuales -- monthly cost summaries per gas type
```

---

*Built for internal use at Benito Roggio Ambiental — waste collection fleet management, Buenos Aires.*
