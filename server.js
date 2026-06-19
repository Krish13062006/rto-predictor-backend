app.post('/api/evaluate-risk', async (req, res) => {
    try {
        const { order_id, merchant_id, customer_name, phone_number } = req.body;
        
        // Database INSERT query
        const query = `INSERT INTO orders (order_id, merchant_id, phone_number, status) VALUES ($1, $2, $3, $4)`;
        await pool.query(query, [order_id, merchant_id, phone_number, 'PENDING']);
        
        res.status(200).json({ message: "Data received and saved successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error", details: err.message });
    }
});