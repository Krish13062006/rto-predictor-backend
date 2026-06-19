require('dotenv').config();
const express = require('express');
const pool = require('./db');
const app = express(); // <--- Ye line hona zaroori hai
app.use(express.json());

// --- Yahan aapka post request wala code aayega ---
app.post('/api/evaluate-risk', async (req, res) => {
    try {
        const { order_id, merchant_id, customer_name, phone_number } = req.body;
        console.log("Received Data:", req.body);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});