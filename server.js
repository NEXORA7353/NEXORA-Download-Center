const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_DIR = path.join(__dirname, 'src');

// Mount routes for both standalone root and /download-center prefix
app.use('/download-center/src', express.static(SRC_DIR));
app.use('/download-center', express.static(PUBLIC_DIR));
app.use('/src', express.static(SRC_DIR));
app.use(express.static(PUBLIC_DIR));

// Proxy or direct API route for standalone mode
app.get('/api/downloads/config', async (req, res) => {
  try {
    const parentApiUrl = process.env.PARENT_API_URL || 'http://localhost:3000/api/downloads/config';
    const response = await fetch(parentApiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not connect to parent NEXORA API: ' + err.message });
  }
});

app.get('/download-center/*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`NEXORA Download Center running independently on port ${PORT}`);
  });
}

module.exports = app;
