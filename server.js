const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const PARENT_API = process.env.PARENT_API_URL || 'http://localhost:3000';

app.use(cors());
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_DIR = path.join(__dirname, 'src');

// Mount routes for both standalone root and /download-center prefix
app.use('/download-center/src', express.static(SRC_DIR));
app.use('/download-center', express.static(PUBLIC_DIR));
app.use('/src', express.static(SRC_DIR));
app.use(express.static(PUBLIC_DIR));

// ─── API Proxy to Parent NEXORA Server ────────────────────────────
// All /api/downloads/* requests get proxied to the parent NEXORA backend

async function proxyGet(endpoint, req, res) {
  try {
    const url = `${PARENT_API}${endpoint}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not connect to NEXORA API: ' + err.message });
  }
}

async function proxyPost(endpoint, req, res) {
  try {
    const url = `${PARENT_API}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not connect to NEXORA API: ' + err.message });
  }
}

// GET endpoints
app.get('/api/downloads/config', (req, res) => proxyGet('/api/downloads/config', req, res));
app.get('/api/downloads/analytics', (req, res) => proxyGet('/api/downloads/analytics', req, res));
app.get('/api/downloads/students', (req, res) => proxyGet('/api/downloads/students', req, res));

// POST endpoints
app.post('/api/downloads/config', (req, res) => proxyPost('/api/downloads/config', req, res));
app.post('/api/downloads/register-student', (req, res) => proxyPost('/api/downloads/register-student', req, res));
app.post('/api/downloads/track', (req, res) => proxyPost('/api/downloads/track', req, res));
app.post('/api/downloads/verify-token', (req, res) => proxyPost('/api/downloads/verify-token', req, res));

// ─── SPA Fallback ─────────────────────────────────────────────────
app.get('/download-center/*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`NEXORA Download Center running independently on port ${PORT}`);
    console.log(`Proxying API requests to: ${PARENT_API}`);
  });
}

module.exports = app;
