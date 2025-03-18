import express from 'express';

const app = express();
const port = 4000;

app.get('/api/*', async (req, res) => {
  try {
    const willysUrl = `https://www.willys.se${req.url.slice(4)}`;
    console.log(`Fetching: ${willysUrl}`);

    const response = await fetch(willysUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.willys.se/',
      }
    });

    const contentType = response.headers.get('content-type') || '';
    console.log(`Content-Type: ${contentType}`);

    const text = await response.text();
    console.log(`Response from Willys (first 500 chars):\n${text.substring(0, 500)}`);

    if (!contentType.includes('application/json')) {
      console.error("Received non-JSON response. Likely blocked.");
      return res.status(500).json({ error: "Willys API returned non-JSON data", response: text.substring(0, 500) });
    }

    const data = JSON.parse(text);
    res.json(data);

  } catch (error) {
    console.error("Error fetching from Willys:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Backend listening on port ${port}`));
