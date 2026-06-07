require('dotenv').config();
const { Pool } = require('pg');

// Connection string ko .env file se uthana
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Supabase cloud k liye ye zaroori hai
  }
});

// Connection check karne ke liye test function
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Database se connect nahi ho paye:', err.stack);
  }
  console.log('✅ Supabase Cloud Database successfully connect ho gaya hai!');
  release();
});

module.exports = pool;