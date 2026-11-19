const compiledData = require('../scratch/compile_products.js');
const { PRODUCTS } = compiledData;
const petLids = PRODUCTS.filter(p => p.category === 'pet-cup-lids');
console.log('Count:', petLids.length);
console.log(petLids.map(p => ({ sku: p.sku, name: p.name, category: p.category, familyCategory: p.familyCategory })));

