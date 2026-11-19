const sharp = require('sharp');
const path = require('path');

const input = 'C:/Users/kondr/.gemini/antigravity-ide/brain/8d7b1ada-d83a-4847-9c46-338eb7f18106/.user_uploaded/media_1791012564087.jpg';

async function testFullCircle() {
  // Bitey's full body:
  // Center is roughly cx: 470, cy: 345
  // Radius: 335
  const crop = await sharp(input)
    .extract({ left: 135, top: 10, width: 670, height: 670 })
    .resize(512, 512)
    .toBuffer();

  const mask = Buffer.from(
    `<svg width="512" height="512">
      <circle cx="256" cy="256" r="252" fill="#fff" />
    </svg>`
  );

  await sharp(crop)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(path.join(__dirname, '../public/images/test-full-circle.png'));

  console.log('Created test-full-circle.png!');
}

testFullCircle().catch(console.error);
