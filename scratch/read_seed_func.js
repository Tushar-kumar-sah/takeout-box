const fs = require('fs');
const content = fs.readFileSync('server/src/database/seed.ts', 'utf8');
const idx = content.indexOf('export async function seedDatabase');
console.log(content.slice(idx));

