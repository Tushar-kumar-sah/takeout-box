const sharp = require('sharp');
const path = require('path');

const input = 'C:/Users/kondr/.gemini/antigravity-ide/brain/8d7b1ada-d83a-4847-9c46-338eb7f18106/.user_uploaded/media_1791012564087.jpg';

async function makeOptimizedFloatingIcon() {
  await sharp(input)
    .extract({ left: 265, top: 18, width: 410, height: 630 })
    .extend({
      top: 10,
      bottom: 10,
      left: 110,
      right: 110,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .resize(512, 512, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile(path.join(__dirname, '../public/images/bitey-floating.png'));

  console.log('Optimized bitey-floating.png created successfully!');
}

makeOptimizedFloatingIcon().catch(console.error);
