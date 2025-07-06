// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db', // Dockerサービス名
  database: 'app_db',
  password: 'password',
  port: 5432,
});

module.exports = pool;
