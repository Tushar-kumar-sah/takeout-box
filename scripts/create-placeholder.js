const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createPlaceholder() {
  const width = 600;
  const height = 600;
  
  // Clean, elegant, light-colored background with subtle border
  const svgBg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fdfdfd" />
          <stop offset="100%" stop-color="#f1f5f9" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#cardGrad)" />
      <rect x="16" y="16" width="${width - 32}" height="${height - 32}" rx="20" fill="none" stroke="#e2e8f0" stroke-width="1.5" />
      <text x="${width / 2}" y="${height - 40}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" letter-spacing="2" fill="#94a3b8" text-anchor="middle">THE TAKEOUT BOX • RESTAURANT SUPPLY</text>
    </svg>
  `);
  
  // Resize logo nicely with clean transparency
  const resizedLogo = await sharp(path.join(__dirname, '../public/images/takeout-logo.png'))
    .resize({ width: 340, height: 260, fit: 'inside' })
    .toBuffer();

  const logoMetadata = await sharp(resizedLogo).metadata();
  const left = Math.round((width - (logoMetadata.width || 340)) / 2);
  const top = Math.round((height - (logoMetadata.height || 260)) / 2 - 20);

  const outPath = path.join(__dirname, '../public/images/product-placeholder.png');
  await sharp(svgBg)
    .composite([
      {
        input: resizedLogo,
        top: top,
        left: left,
      }
    ])
    .png()
    .toFile(outPath);

  console.log('Created product-placeholder.png successfully at:', outPath);
}

createPlaceholder().catch(console.error);
