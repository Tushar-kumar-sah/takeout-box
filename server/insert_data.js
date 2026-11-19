const fs = require('fs');
const path = require('path');
const mysql = require('./node_modules/mysql2/promise');
const dotenv = require('./node_modules/dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'takeout_box_db';

async function main() {
  console.log(`=======================================================`);
  console.log(` The Takeout Box - Automated Database Seed & Migration `);
  console.log(` Connecting to MySQL: ${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
  console.log(`=======================================================`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    console.log(`✔ Connected to MySQL server successfully.`);

    // 1. Read init_database.sql
    const sqlPath = path.resolve(__dirname, 'src/database/init_database.sql');
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Cannot find SQL file at ${sqlPath}`);
    }

    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    console.log(`✔ Read init_database.sql (${Math.round(sqlContent.length / 1024)} KB). Executing schema & catalog inserts...`);

    // 2. Execute SQL
    await connection.query(sqlContent);
    console.log(`✔ SQL execution completed successfully.`);

    // 3. Verify counts in takeout_box_db
    await connection.query(`USE \`${DB_NAME}\``);
    const [tables] = await connection.query(`SHOW TABLES`);

    console.log(`\n--- Verification of Database Tables & Row Counts ---`);
    for (const t of tables) {
      const tName = Object.values(t)[0];
      const [rows] = await connection.query(`SELECT COUNT(*) as cnt FROM \`${tName}\``);
      console.log(`  ✔ ${tName.padEnd(22)} : ${rows[0].cnt} records`);
    }

    console.log(`\n🎉 All categories, products, sizes, and seed accounts are now in your Database!`);
  } catch (err) {
    console.error(`❌ Database operation failed:`, err.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();
