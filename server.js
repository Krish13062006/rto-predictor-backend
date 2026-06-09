require('dotenv').config();
const express = require('express');
const pool = require('./db'); // db.js se database connection laane ke liye
const app = express();

app.use(express.json()); // JSON data ko handle karne ke liye

// Test route
app.get('/', (req, res) => {
    res.send('Server is live and running!');
});

// RTO Risk Evaluation API
app.post('/api/evaluate-risk', async (req, res) => {
    try {
        const { order_id, merchant_id, customer_name, phone_number } = req.body;
        
        // Log data to check if it's arriving
        console.log("Received Data:", req.body);

        // Database logic yahan aayega (pool.query)
        // Example: const result = await pool.query('INSERT INTO ...');

        res.status(200).json({ message: "Data received successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});