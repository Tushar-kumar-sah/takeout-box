const sharp = require('sharp');
const path = require('path');

const input = 'C:/Users/kondr/.gemini/antigravity-ide/brain/8d7b1ada-d83a-4847-9c46-338eb7f18106/.user_uploaded/media_1791012564087.jpg';

async function makeTransparentAvatar() {
  const crop = await sharp(input)
    .extract({ left: 228, top: 12, width: 395, height: 395 })
    .resize(400, 400)
    .toBuffer();

  const circleMask = Buffer.from(
    `<svg width="400" height="400">
      <circle cx="200" cy="200" r="192" fill="#fff" />
    </svg>`
  );

  await sharp(crop)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toFile(path.join(__dirname, '../public/images/bitey-avatar.png'));

  console.log('Saved transparent bitey-avatar.png!');
}

makeTransparentAvatar().catch(console.error);
