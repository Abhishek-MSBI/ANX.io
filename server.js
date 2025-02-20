// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/apiKey', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
