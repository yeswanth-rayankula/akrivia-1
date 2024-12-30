require('dotenv').config(); 
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection acquired!');
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

module.exports = { db, pool };
