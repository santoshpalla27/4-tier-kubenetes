const mysql = require('mysql2/promise');

let pool;

const connect = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER || 'appuser',
      password: process.env.DB_PASSWORD || 'apppassword',
      database: process.env.DB_NAME || 'appdb',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    // Test the connection
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
    return pool;
  } catch (error) {
    console.error('Database connection error:', error);
    // Retry connection after delay
    console.log('Retrying database connection in 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connect();
  }
};

const disconnect = async () => {
  if (pool) {
    await pool.end();
    console.log('Pool connections terminated');
  }
};

const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

module.exports = {
  connect,
  disconnect,
  query
};