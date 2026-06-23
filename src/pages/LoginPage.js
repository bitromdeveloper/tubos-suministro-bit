import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(username.trim(), password);
    if (result.error) setError(result.error);
    setLoading(false);
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        {/* Logo / Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="13" y="2" width="10" height="4" rx="2" fill="#60a5fa"/>
              <rect x="11" y="6" width="14" height="22" rx="3" fill="#2563eb"/>
              <rect x="13" y="28" width="10" height="4" rx="2" fill="#60a5fa"/>
              <rect x="15" y="10" width="6" height="2" rx="1" fill="#93c5fd"/>
              <rect x="15" y="14" width="6" height="2" rx="1" fill="#93c5fd"/>
            </svg>
          </div>
          <h1 style={styles.title}>Control de Gases</h1>
          <p style={styles.subtitle}>Benito Roggio Ambiental</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Usuario</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="usuario.bra"
              autoComplete="username"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button style={{...styles.btn, opacity: loading ? 0.7 : 1}} type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p style={styles.hint}>
          Comunicate con Compras para recuperar tu acceso
        </p>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '40px 36px 28px',
    width: '100%',
    maxWidth: 380,
    boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  iconWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eff6ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    margin: '0 0 4px',
    fontSize: 22,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: 0,
    fontSize: 13,
    color: '#64748b',
    fontWeight: 500,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: {
    padding: '10px 14px',
    border: '1.5px solid #e2e8f0',
    borderRadius: 8,
    fontSize: 14,
    color: '#0f172a',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 13,
    color: '#dc2626',
  },
  btn: {
    padding: '12px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 4,
    transition: 'background 0.2s',
  },
  hint: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#94a3b8',
  },
};
