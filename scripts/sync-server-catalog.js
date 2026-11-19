const fs = require('fs');
const path = require('path');
const { CATEGORIES, PRODUCTS } = require('./build-products-data.js');

console.log(`Loaded ${CATEGORIES.length} categories and ${PRODUCTS.length} products.`);

// 1. UPDATE server/src/database/seed.ts
const seedCategories = CATEGORIES.filter(c => c.slug !== 'all').map((c, idx) => ({
  id: c.slug,
  slug: c.slug,
  name: c.name,
  description: c.description,
  image_url: c.image || "/images/product-placeholder.png",
  display_order: idx + 1
}));

const seedProducts = PRODUCTS.map((p) => ({
  id: p.id,
  sku: p.sku,
  categoryId: p.category,
  subcategory: p.material,
  name: p.name,
  slug: p.id,
  description: p.description,
  palletTiHi: p.palletTiHi,
  price: p.price,
  specialPrice: p.specialPrice || null,
  mrpPrice: p.mrpPrice,
  bestSeller: p.bestSeller,
  imageUrl: p.image || "/images/product-placeholder.png",
  material: p.material,
  color: "Standard",
  bpiCertified: p.category === "bagasse-plates-and-bowls" || p.category === "bagasse-hinged-containers",
  fdaApproved: true,
  microwaveSafe: p.tags.includes("Microwave Safe"),
  ratingAvg: p.rating,
  reviewCount: p.reviewsCount,
  sizes: p.sizes.map((s) => ({
    name: s.name,
    sku: s.sku,
    caseCount: s.caseCount,
    price: s.price,
    dimensions: s.palletTiHi
  }))
}));

const seedTsContent = `import { pool } from "../config/db.js";

const CATEGORIES = ${JSON.stringify(seedCategories, null, 2)};

const PRODUCTS: any[] = ${JSON.stringify(seedProducts, null, 2)};

export async function seedDatabase() {
  try {
    console.log("[Seed] Starting database seed for The Takeout Box catalog...");

    // 1. Seed Categories
    for (const cat of CATEGORIES) {
      await pool.execute(
        \`INSERT INTO categories (id, slug, name, description, image_url, display_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, TRUE)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           description = VALUES(description),
           image_url = VALUES(image_url),
           display_order = VALUES(display_order)\`,
        [cat.id, cat.slug, cat.name, cat.description, cat.image_url, cat.display_order]
      );
    }

    // 2. Seed Products & Sizes
    for (const prod of PRODUCTS) {
      await pool.execute(
        \`INSERT INTO products (
          id, category_id, sku, name, slug, description, pallet_ti_hi, price, mrp_price, image_url, material, color,
          bpi_certified, fda_approved, microwave_safe, rating_avg, review_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          sku = VALUES(sku),
          name = VALUES(name),
          description = VALUES(description),
          pallet_ti_hi = VALUES(pallet_ti_hi),
          price = VALUES(price),
          mrp_price = VALUES(mrp_price),
          image_url = VALUES(image_url),
          material = VALUES(material),
          rating_avg = VALUES(rating_avg),
          review_count = VALUES(review_count)\`,
        [
          prod.id,
          prod.categoryId,
          prod.sku || null,
          prod.name,
          prod.slug,
          prod.description,
          prod.palletTiHi || null,
          prod.price || 0,
          prod.mrpPrice || null,
          prod.imageUrl,
          prod.material,
          prod.color,
          prod.bpiCertified ? 1 : 0,
          prod.fdaApproved ? 1 : 0,
          prod.microwaveSafe ? 1 : 0,
          prod.ratingAvg,
          prod.reviewCount,
        ]
      );

      // Delete existing sizes and re-insert
      await pool.execute("DELETE FROM product_sizes WHERE product_id = ?", [prod.id]);
      for (const sz of prod.sizes) {
        await pool.execute(
          \`INSERT INTO product_sizes (product_id, name, sku, case_count, price, stock_status)
           VALUES (?, ?, ?, ?, ?, 'in_stock')\`,
          [prod.id, sz.name, sz.sku, sz.caseCount, sz.price]
        );
      }
    }

    console.log("[Seed] Database seed completed successfully.");
  } catch (error: any) {
    console.warn(\`[Seed Warning] Could not complete seed: \${error.message}\`);
  }
}

if (process.argv[1]?.includes("seed")) {
  seedDatabase().then(() => process.exit(0));
}
`;

fs.writeFileSync(path.join(__dirname, '../server/src/database/seed.ts'), seedTsContent, 'utf8');
console.log('Successfully updated server/src/database/seed.ts!');

// 2. UPDATE server/src/repositories/adminRepository.ts if exists
const adminRepoPath = path.join(__dirname, '../server/src/repositories/adminRepository.ts');
if (fs.existsSync(adminRepoPath)) {
  let adminRepoContent = fs.readFileSync(adminRepoPath, 'utf8');

// Build Mock Products & Mock Categories for adminRepository
const mockProducts = seedProducts.map((p, idx) => ({
  id: 'prod-' + p.id,
  sku: p.sku,
  categoryId: p.categoryId,
  categoryName: CATEGORIES.find(c => c.slug === p.categoryId)?.name || p.categoryId,
  subcategory: p.subcategory,
  name: p.name,
  slug: p.slug,
  description: p.description,
  palletTiHi: p.palletTiHi,
  price: p.price,
  specialPrice: p.specialPrice,
  mrpPrice: p.mrpPrice,
  imageUrl: p.imageUrl,
  material: p.material,
  color: p.color,
  bestSeller: p.bestSeller,
  eco: p.bpiCertified,
  bpiCertified: p.bpiCertified,
  fdaApproved: true,
  microwaveSafe: p.microwaveSafe,
  ratingAvg: p.ratingAvg,
  reviewCount: p.reviewCount,
  isActive: true,
  stockStatus: "in_stock",
  sizes: p.sizes.map((sz, sIdx) => ({
    id: 1000 + idx * 10 + sIdx,
    name: sz.name,
    sku: sz.sku,
    caseCount: sz.caseCount,
    price: sz.price,
    dimensions: sz.dimensions,
    stockStatus: "in_stock"
  }))
}));

const mockCategories = seedCategories.map(c => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  description: c.description,
  imageUrl: c.image_url,
  displayOrder: c.display_order,
  isActive: true
}));

const mockDbReplacement = `// In-Memory Dev Fallback Store (Ensures 100% smooth UI preview even before local MySQL is connected)
const mockDb: MockDbState = {
  products: ${JSON.stringify(mockProducts, null, 4)},
  categories: ${JSON.stringify(mockCategories, null, 4)},
  orders: [`;

// Find where mockDb starts and orders starts
const mockDbStart = adminRepoContent.indexOf('// In-Memory Dev Fallback Store');
const ordersStart = adminRepoContent.indexOf('  orders: [', mockDbStart);

if (mockDbStart !== -1 && ordersStart !== -1) {
  adminRepoContent = adminRepoContent.substring(0, mockDbStart) + mockDbReplacement + adminRepoContent.substring(ordersStart + '  orders: ['.length);
  fs.writeFileSync(adminRepoPath, adminRepoContent, 'utf8');
  console.log('Successfully updated server/src/repositories/adminRepository.ts!');
} else {
  console.error('Could not locate mockDb in adminRepository.ts!');
}
}
