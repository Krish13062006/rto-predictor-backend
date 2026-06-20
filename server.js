require('dotenv').config();
const express = require('express');
const pool = require('./db'); 

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Server is live and running!');
});

// RTO Risk Evaluation API
app.post('/api/evaluate-risk', async (req, res) => {
    try {
        const { order_id, merchant_id, customer_name, phone_number } = req.body;
        
        console.log("Received Data:", { order_id, merchant_id, customer_name, phone_number });

        // Database Insertion
        const query = `
            INSERT INTO orders (order_id, merchant_id, phone_number, status) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        const values = [order_id, merchant_id, phone_number, 'PENDING'];
        
        const result = await pool.query(query, values);

        res.status(200).json({ 
            message: "Data received and saved successfully",
            data: result.rows[0] 
        });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

const PORT = process.env.PORT || 10000; // Render usually uses 10000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});