const fs = require('fs');
const content = fs.readFileSync('server/src/database/seed.ts', 'utf8');
const idx = content.indexOf('"BGHW61"');
console.log('BGHW61 chunk:');
console.log(content.slice(idx, idx + 800));
