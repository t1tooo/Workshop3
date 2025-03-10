import express from 'express';

const app = express();
const port = 4000;

app.get('/api/*', async (req, res) => {
  try {
    const willysUrl = `https://www.willys.se${req.url.slice(4)}`;
    console.log(`Fetching: ${willysUrl}`);

    const response = await fetch(willysUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' } // Mimic a real browser
    });

    const text = await response.text(); // Read response as text
    console.log(`Response received: ${text.substring(0, 500)}`); // Log first 500 chars

    // Try parsing JSON
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (jsonError) {
      console.error("Error parsing JSON. Received:", text.substring(0, 500));
      res.status(500).json({ error: "Invalid JSON response from Willys" });
    }

  } catch (error) {
    console.error("Error fetching from Willys:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Backend listening on port ${port}`));
