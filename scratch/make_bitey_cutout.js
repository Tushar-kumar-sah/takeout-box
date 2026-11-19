const sharp = require('sharp');
const path = require('path');

const input = 'C:/Users/kondr/.gemini/antigravity-ide/brain/8d7b1ada-d83a-4847-9c46-338eb7f18106/.user_uploaded/media_1791012564087.jpg';

async function makeBiteyCutout() {
  const width = 460;
  const height = 695;

  const crop = await sharp(input)
    .extract({ left: 230, top: 15, width: width, height: height })
    .toBuffer();

  // Smooth SVG path hugging Bitey's silhouette:
  const maskSvg = Buffer.from(
    `<svg width="${width}" height="${height}">
      <path d="
        M 210,5 
        C 280,5 340,65 345,140
        C 370,165 390,260 390,345
        C 390,410 380,450 375,470
        C 410,470 445,475 445,485
        L 445,555
        C 430,570 380,575 355,575
        C 350,595 340,640 330,660
        L 75,660
        C 70,620 75,570 80,550
        C 65,530 45,515 42,490
        C 35,465 38,440 45,425
        C 55,420 70,440 85,455
        C 75,410 70,370 70,350
        C 10,340 10,270 20,250
        C 30,230 65,220 75,220
        C 75,170 120,70 210,5
        Z
      " fill="#fff" />
    </svg>`
  );

  const masked = await sharp(crop)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Fit full body cleanly inside a 512x512 transparent canvas with 10px margin
  await sharp(masked)
    .resize(490, 490, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .extend({
      top: 11,
      bottom: 11,
      left: 11,
      right: 11,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(path.join(__dirname, '../public/images/bitey-avatar.png'));

  console.log('Saved refined transparent full-body bitey-avatar.png!');
}

makeBiteyCutout().catch(console.error);
