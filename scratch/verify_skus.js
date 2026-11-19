const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');
const idx = content.indexOf('"id": "paper-take-out-boxes"');
if (idx !== -1) {
  console.log(content.slice(idx, idx + 250));
}
