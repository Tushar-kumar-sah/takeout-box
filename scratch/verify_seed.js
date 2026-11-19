const fs = require('fs');
const content = fs.readFileSync('server/src/database/seed.ts', 'utf8');
const skus = ['PTW08', 'BP01K', 'PC075', 'BGRPW7', 'BGBW12', 'STRAWB1'];
for (const sku of skus) {
  const idx = content.indexOf(`"sku": "${sku}"`);
  if (idx !== -1) {
    const chunk = content.slice(idx, idx + 400);
    const mImg = chunk.match(/"imageUrl":\s*"([^"]+)"/);
    console.log(`${sku} -> img: ${mImg ? mImg[1] : 'NONE'}`);
  } else {
    console.log(`${sku} -> NOT FOUND`);
  }
}

