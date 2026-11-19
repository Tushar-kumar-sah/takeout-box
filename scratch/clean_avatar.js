const sharp = require('sharp');
const path = require('path');

async function cleanAvatar() {
  const input = path.join(__dirname, '../public/images/bitey-avatar.png');
  const size = 592;
  const cx = 296;
  const cy = 296;
  const r = 205; // Cuts right inside before the left logo and right phone edge

  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" />
    </svg>`
  );

  // Mask out the outer corners and edges
  const maskedHead = await sharp(input)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Now place it over a pure white circular badge with crisp finish
  const whiteBg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${cx}" cy="${cy}" r="${r + 2}" fill="#ffffff" />
    </svg>`
  );

  await sharp(whiteBg)
    .composite([{ input: maskedHead, blend: 'over' }])
    .png()
    .toFile(path.join(__dirname, '../public/images/bitey-avatar.png'));

  console.log('Clean circular Bitey avatar generated!');
}

cleanAvatar().catch(console.error);
