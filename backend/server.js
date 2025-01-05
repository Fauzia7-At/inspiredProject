const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch products
app.get('/api/products', (req, res) => {
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading products file:', err);
            res.status(500).json({ error: 'Failed to load products' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
