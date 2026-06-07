require('dotenv').config();
const { Pool } = require('pg');

// Connection string ko .env file se uthana
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in .env');
  process.exit(1);
}

const poolConfig = {
  connectionString: process.env.DATABASE_URL
};

if (process.env.DATABASE_URL.startsWith('postgres://') || process.env.DATABASE_URL.startsWith('postgresql://')) {
  poolConfig.ssl = {
    rejectUnauthorized: false // Supabase cloud k liye ye zaroori hai
  };
}

const pool = new Pool(poolConfig);

// Connection check karne ke liye test function
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Database se connect nahi ho paye:', err.stack);
  }
  console.log('✅ Supabase Cloud Database successfully connect ho gaya hai!');
  release();
});

module.exports = pool;