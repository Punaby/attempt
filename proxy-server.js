const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('URL required');
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Proxy Browser Example)',
      }
    });
    const contentType = response.headers.get('content-type');
    res.set('content-type', contentType || 'text/html');
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send('Error fetching: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
