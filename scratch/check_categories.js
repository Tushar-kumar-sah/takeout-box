const compiledData = require('../scratch/compile_products.js');
const { CATEGORIES, PRODUCTS } = compiledData;

const categoryIds = new Set(CATEGORIES.map(c => c.slug));
console.log(`Categories count: ${CATEGORIES.length}`);
console.log('Category Slugs:', Array.from(categoryIds));

const missingCategories = new Set();
for (const p of PRODUCTS) {
  if (!categoryIds.has(p.category)) {
    missingCategories.add(p.category);
  }
}

if (missingCategories.size > 0) {
  console.log('WARNING! Products reference missing categories:', Array.from(missingCategories));
} else {
  console.log('✔ All 321 products reference valid categories!');
}

