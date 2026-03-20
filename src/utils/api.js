// API helpers — communicates with the Express backend
// Falls back gracefully if the server is unreachable (uses localStorage)

const BASE = '/api';

function getToken() {
  return localStorage.getItem('mp_token');
}

function headers() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

async function request(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) throw new Error('UNAUTHORIZED');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function login(password) {
  const res = await fetch(BASE + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('WRONG_PASSWORD');
  const data = await res.json();
  localStorage.setItem('mp_token', data.token);
  return data.token;
}

export function logout() {
  localStorage.removeItem('mp_token');
}

export async function getAllPlans() {
  return request('GET', '/plans');
}

export async function getPlan(weekId) {
  return request('GET', `/plans/${weekId}`);
}

export async function savePlan(weekId, plan) {
  return request('POST', `/plans/${weekId}`, plan);
}
