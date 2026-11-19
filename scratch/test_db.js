const path = require('path');
const mysql = require(path.resolve(__dirname, '../server/node_modules/mysql2/promise'));
const dotenv = require(path.resolve(__dirname, '../server/node_modules/dotenv'));

dotenv.config({ path: path.resolve(__dirname, '../server/.env') });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'takeout_box_db';

console.log(`Connecting to MySQL: ${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

async function test() {
  try {
    const conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });
    console.log('✔ Connected to MySQL successfully!');
    const [dbs] = await conn.query('SHOW DATABASES;');
    console.log('Databases:', dbs.map(d => Object.values(d)[0]));
    await conn.end();
  } catch (err) {
    console.error('❌ MySQL Connection Failed:', err.code, err.message, err);
  }
}

test();
