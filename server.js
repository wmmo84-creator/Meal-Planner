/**
 * Meal Planner – Express backend
 *
 * Serves the built React app + REST API for plan storage.
 * Auth: single shared password (set APP_PASSWORD env var or change the default below).
 *
 * Deploy to Railway / Render / Fly.io — set APP_PASSWORD as an env var.
 * Run locally:  node server.js
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;
const APP_PASSWORD = process.env.APP_PASSWORD || 'family2024'; // ← Change this!
const DATA_DIR = path.join(__dirname, 'data');
const TOKENS_FILE = path.join(DATA_DIR, '_tokens.json');

// ─── Ensure data directory ──────────────────────────────────────────────────
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ─── Token store (persist across restarts) ─────────────────────────────────
function loadTokens() {
  try { return new Set(JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'))); }
  catch { return new Set(); }
}
function saveTokens(tokens) {
  fs.writeFileSync(TOKENS_FILE, JSON.stringify([...tokens]));
}

const validTokens = loadTokens();

function issueToken() {
  const token = crypto.randomUUID();
  validTokens.add(token);
  saveTokens(validTokens);
  return token;
}

// ─── Middleware ─────────────────────────────────────────────────────────────
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

const app = express();
app.use(express.json());

// Serve built React app
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// ─── Auth ───────────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body || {};
  if (!password || password !== APP_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  return res.json({ token: issueToken() });
});

app.post('/api/auth/logout', auth, (req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  validTokens.delete(token);
  saveTokens(validTokens);
  res.json({ ok: true });
});

// ─── Plans ──────────────────────────────────────────────────────────────────
// GET /api/plans  → all saved plans as { weekId: planObject }
app.get('/api/plans', auth, (req, res) => {
  const plans = {};
  try {
    const files = fs.readdirSync(DATA_DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f));
    for (const file of files) {
      const weekId = file.replace('.json', '');
      try {
        plans[weekId] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
      } catch { /* skip corrupt files */ }
    }
  } catch { /* DATA_DIR not readable */ }
  res.json(plans);
});

// GET /api/plans/:weekId  → single plan
app.get('/api/plans/:weekId', auth, (req, res) => {
  const { weekId } = req.params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(weekId)) return res.status(400).json({ error: 'Invalid weekId' });
  const file = path.join(DATA_DIR, `${weekId}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Not found' });
  res.json(JSON.parse(fs.readFileSync(file, 'utf8')));
});

// POST /api/plans/:weekId  → save / update plan
app.post('/api/plans/:weekId', auth, (req, res) => {
  const { weekId } = req.params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(weekId)) return res.status(400).json({ error: 'Invalid weekId' });
  const file = path.join(DATA_DIR, `${weekId}.json`);
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

// ─── SPA fallback ───────────────────────────────────────────────────────────
if (fs.existsSync(distPath)) {
  app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Meal Planner server running on http://localhost:${PORT}`);
  console.log(`Password: ${APP_PASSWORD}`);
});
