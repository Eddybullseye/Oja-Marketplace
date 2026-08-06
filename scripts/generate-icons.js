const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default;

const PUBLIC_DIR = path.join(__dirname, '../public');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');

if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

const masterSvg = `
<svg width="1024" height="1024" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="1000" rx="220" fill="#0B3D3E" />
  <path d="M 500 200 A 325 325 0 0 1 500 800 A 325 325 0 0 1 500 200 Z" fill="#F9A826" />
</svg>`;

const masterNoRadiusSvg = `
<svg width="1024" height="1024" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="1000" fill="#0B3D3E" />
  <path d="M 500 200 A 325 325 0 0 1 500 800 A 325 325 0 0 1 500 200 Z" fill="#F9A826" />
</svg>`;

const lightSvg = `
<svg width="1024" height="1024" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="1000" rx="220" fill="#F6F3EC" />
  <path d="M 500 200 A 325 325 0 0 1 500 800 A 325 325 0 0 1 500 200 Z" fill="#0B3D3E" />
</svg>`;

const lightNoRadiusSvg = `
<svg width="1024" height="1024" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="1000" fill="#F6F3EC" />
  <path d="M 500 200 A 325 325 0 0 1 500 800 A 325 325 0 0 1 500 200 Z" fill="#0B3D3E" />
</svg>`;

const androidForegroundSvg = `
<svg width="1024" height="1024" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <path d="M 500 200 A 325 325 0 0 1 500 800 A 325 325 0 0 1 500 200 Z" fill="#F9A826" />
</svg>`;

const androidBackgroundSvg = `
<svg width="1024" height="1024" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="1000" fill="#0B3D3E" />
</svg>`;

// Maskable icon typically needs more padding. Current lens takes 60% of height (200 to 800).
// Safe zone for maskable is central 80%. Our lens fits well inside the 80% (which would be 100 to 900).
const maskableSvg = masterNoRadiusSvg;

async function generate() {
  // Save SVG masters
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-master.svg'), masterSvg.trim());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-light-master.svg'), lightSvg.trim());

  console.log('Saved SVG masters.');

  const generatePng = async (svgString, filename, size) => {
    await sharp(Buffer.from(svgString.trim()))
      .resize(size, size)
      .png()
      .toFile(path.join(ICONS_DIR, filename));
    console.log(`Generated ${filename}`);
  };

  // iOS sizes (Apple devices round the corners, so we provide no-radius square images)
  const iosSizes = [1024, 180, 167, 152, 120, 76, 58, 40];
  for (const size of iosSizes) {
    await generatePng(masterNoRadiusSvg, `apple-touch-icon-${size}x${size}.png`, size);
  }
  // Standard apple-touch-icon
  await generatePng(masterNoRadiusSvg, `apple-touch-icon.png`, 180);

  // Android adaptive icons & PWA Manifest
  const pwaSizes = [192, 512];
  for (const size of pwaSizes) {
    await generatePng(masterSvg, `android-chrome-${size}x${size}.png`, size);
    await generatePng(maskableSvg, `android-chrome-maskable-${size}x${size}.png`, size);
  }

  // Android adaptive icon components
  await generatePng(androidForegroundSvg, 'android-foreground.png', 512);
  await generatePng(androidBackgroundSvg, 'android-background.png', 512);

  // Favicons
  // For favicon.ico we use the light no-radius svg so it pops on dark tabs too, 
  // or we can just use the lightSvg with transparent background.
  // Wait, the prompt says "light-mode or favicon use".
  const faviconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <path d="M 500 200 A 325 325 0 0 1 500 800 A 325 325 0 0 1 500 200 Z" fill="#0B3D3E" />
</svg>`;
  
  await generatePng(faviconSvg, 'favicon-16x16.png', 16);
  await generatePng(faviconSvg, 'favicon-32x32.png', 32);
  await generatePng(faviconSvg, 'favicon-48x48.png', 48);

  // Generate favicon.ico using png-to-ico
  try {
    const buf = await pngToIco([
      path.join(ICONS_DIR, 'favicon-16x16.png'),
      path.join(ICONS_DIR, 'favicon-32x32.png'),
      path.join(ICONS_DIR, 'favicon-48x48.png')
    ]);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), buf);
    console.log('Generated favicon.ico');
  } catch (err) {
    console.error('Error generating favicon.ico:', err);
  }
}

generate().catch(console.error);
