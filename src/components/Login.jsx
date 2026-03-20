import { useState } from 'react';
import { login } from '../utils/api.js';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await login(password);
      onLogin(token);
    } catch {
      setError('Incorrect password. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-icon">🍽️</div>
        <h1>Meal Planner</h1>
        <p className="login-subtitle">Family Meal & Shopping Planner</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="login-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? 'Checking…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
