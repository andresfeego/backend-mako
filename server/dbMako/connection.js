const mysql = require('mysql2');

// Connection pool for MAKO.
// NOTE: Keep env var names explicit to avoid collisions with other backends.
const pool = mysql.createPool({
  host: process.env.MAKO_DB_HOST,
  port: process.env.MAKO_DB_PORT,
  user: process.env.MAKO_DB_USER,
  password: process.env.MAKO_DB_PASS,
  database: process.env.MAKO_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

pool.on('connection', (conn) => {
  // Keep session collation aligned with DB/table collation to avoid ER_CANT_AGGREGATE_2COLLATIONS.
  conn.query("SET NAMES utf8mb4 COLLATE utf8mb4_uca1400_ai_ci");
});

module.exports = pool;
