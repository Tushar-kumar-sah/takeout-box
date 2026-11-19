const path = require('path');
const mysql = require(path.resolve(__dirname, '../server/node_modules/mysql2/promise'));
const dotenv = require(path.resolve(__dirname, '../server/node_modules/dotenv'));

dotenv.config({ path: path.resolve(__dirname, '../server/.env') });

async function verify() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'takeout_box_db'
  });

  console.log('--- Sample Categories & Images in Database ---');
  const [cats] = await conn.query('SELECT slug, name, image_url FROM categories ORDER BY display_order LIMIT 10');
  console.table(cats);

  console.log('--- Checking Recent Updated Products in Database ---');
  const [prods] = await conn.query(`
    SELECT sku, name, category_id, image_url, price 
    FROM products 
    WHERE sku IN ('PTW08', 'BP01K', 'BGRPW7', 'BGBW12', 'STRAWB1', 'TC61', 'V61C', 'PSHCL61', 'PC075', 'PC075100L', 'T RAY 100', 'PLATE6', 'BGHW61')
  `);
  console.table(prods);

  const [countRes] = await conn.query('SELECT COUNT(*) as totalProducts FROM products WHERE image_url NOT LIKE "%placeholder%"');
  console.log(`Products with authentic image URLs: ${countRes[0].totalProducts} / 321`);

  const [catCountRes] = await conn.query('SELECT COUNT(*) as totalCats FROM categories WHERE image_url NOT LIKE "%placeholder%"');
  console.log(`Categories with authentic image URLs: ${catCountRes[0].totalCats} / 29`);

  await conn.end();
}

verify().catch(console.error);

