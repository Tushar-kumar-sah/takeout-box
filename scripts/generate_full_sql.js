const fs = require('fs');
const path = require('path');
const compiledData = require('../scratch/compile_products.js');
const { CATEGORIES, PRODUCTS } = compiledData;

// Read the DDL prefix from current init_database.sql (up to DATA INSERTION)
const currentSql = fs.readFileSync(path.join(__dirname, '../server/src/database/init_database.sql'), 'utf8');
const ddlEndMarker = '-- ===============================================================\n-- DATA INSERTION: COMPLETE STOREFRONT CATALOG & ACCOUNTS\n-- ===============================================================';
const ddlIdx = currentSql.indexOf(ddlEndMarker);

if (ddlIdx === -1) {
  throw new Error('Could not find DDL end marker in init_database.sql');
}

const ddlPrefix = currentSql.slice(0, ddlIdx + ddlEndMarker.length);

// Extract suffix starting from users insertion (Table 4 / Step 4)
const usersMarker = '-- 4. Insert Commercial Users & Admin Accounts';
const usersIdx = currentSql.indexOf(usersMarker);
if (usersIdx === -1) {
  throw new Error('Could not find usersMarker in init_database.sql');
}
const accountsSuffix = currentSql.slice(usersIdx);

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  const str = String(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  });
  return `'${str}'`;
}

// 1. Categories
const catRows = CATEGORIES.filter(c => c.slug !== 'all').map((c, idx) => {
  return `(${esc(c.slug)}, ${esc(c.slug)}, ${esc(c.name)}, ${esc(c.description)}, ${esc(c.image || '/images/product-placeholder.png')}, ${idx + 1}, TRUE)`;
});

const categoriesSql = `

-- 1. Insert Packaging Categories (${catRows.length} categories)
INSERT INTO \`categories\` (\`id\`, \`slug\`, \`name\`, \`description\`, \`image_url\`, \`display_order\`, \`is_active\`)
VALUES
${catRows.join(',\n')}
ON DUPLICATE KEY UPDATE
  \`name\` = VALUES(\`name\`),
  \`description\` = VALUES(\`description\`),
  \`image_url\` = VALUES(\`image_url\`),
  \`display_order\` = VALUES(\`display_order\`);
`;

// 2. Products
const prodRows = PRODUCTS.map((p) => {
  const isBpi = p.category === 'bagasse-plates-and-bowls' || p.category === 'bagasse-hinged-containers';
  const isMicro = p.tags && p.tags.includes('Microwave Safe');
  return `(${esc(p.id)}, ${esc(p.category)}, ${esc(p.sku || null)}, ${esc(p.name)}, ${esc(p.id)}, ${esc(p.description)}, ${esc(p.palletTiHi || null)}, ${p.price || 0}, ${p.specialPrice || 'NULL'}, ${p.mrpPrice || 'NULL'}, ${esc(p.material)}, ${p.bestSeller ? 'TRUE' : 'FALSE'}, ${esc(p.image || '/images/product-placeholder.png')}, ${esc(p.material)}, ${esc(p.color || 'Standard')}, ${isBpi ? 'TRUE' : 'FALSE'}, TRUE, ${isMicro ? 'TRUE' : 'FALSE'}, ${p.rating || 5.0}, ${p.reviewsCount || 0}, TRUE)`;
});

const productsSql = `
-- 2. Insert Commercial Products (${prodRows.length} products from Takeout Box Catalogs)
INSERT INTO \`products\` (\`id\`, \`category_id\`, \`sku\`, \`name\`, \`slug\`, \`description\`, \`pallet_ti_hi\`, \`price\`, \`special_price\`, \`mrp_price\`, \`subcategory\`, \`best_seller\`, \`image_url\`, \`material\`, \`color\`, \`bpi_certified\`, \`fda_approved\`, \`microwave_safe\`, \`rating_avg\`, \`review_count\`, \`is_active\`)
VALUES
${prodRows.join(',\n')}
ON DUPLICATE KEY UPDATE
  \`sku\` = VALUES(\`sku\`),
  \`name\` = VALUES(\`name\`),
  \`description\` = VALUES(\`description\`),
  \`pallet_ti_hi\` = VALUES(\`pallet_ti_hi\`),
  \`price\` = VALUES(\`price\`),
  \`special_price\` = VALUES(\`special_price\`),
  \`mrp_price\` = VALUES(\`mrp_price\`),
  \`subcategory\` = VALUES(\`subcategory\`),
  \`best_seller\` = VALUES(\`best_seller\`),
  \`image_url\` = VALUES(\`image_url\`),
  \`material\` = VALUES(\`material\`),
  \`color\` = VALUES(\`color\`),
  \`bpi_certified\` = VALUES(\`bpi_certified\`),
  \`fda_approved\` = VALUES(\`fda_approved\`),
  \`microwave_safe\` = VALUES(\`microwave_safe\`),
  \`rating_avg\` = VALUES(\`rating_avg\`),
  \`review_count\` = VALUES(\`review_count\`);
`;

// 3. Product Sizes
const sizeRows = [];
for (const p of PRODUCTS) {
  for (const s of p.sizes) {
    sizeRows.push(`(${esc(p.id)}, ${esc(s.name)}, ${esc(s.sku)}, ${s.caseCount || 1}, ${s.price || 0}, ${esc(s.palletTiHi || s.name)}, 'in_stock')`);
  }
}

const sizesSql = `
-- 3. Insert Product Sizes & Wholesale Tier Units (${sizeRows.length} sizes)
INSERT INTO \`product_sizes\` (\`product_id\`, \`name\`, \`sku\`, \`case_count\`, \`price\`, \`dimensions\`, \`stock_status\`)
VALUES
${sizeRows.join(',\n')}
ON DUPLICATE KEY UPDATE
  \`name\` = VALUES(\`name\`),
  \`sku\` = VALUES(\`sku\`),
  \`case_count\` = VALUES(\`case_count\`),
  \`price\` = VALUES(\`price\`),
  \`dimensions\` = VALUES(\`dimensions\`),
  \`stock_status\` = VALUES(\`stock_status\`);
`;

const fullSql = `${ddlPrefix}\n${categoriesSql}\n${productsSql}\n${sizesSql}\n\n-- ${accountsSuffix}`;

fs.writeFileSync(path.join(__dirname, '../server/src/database/init_database.sql'), fullSql, 'utf8');
console.log(`Generated complete init_database.sql with ${catRows.length} categories, ${prodRows.length} products, and ${sizeRows.length} product sizes!`);

