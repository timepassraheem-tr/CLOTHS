import * as THREE from 'three';

// Create luxury procedural marble / polished flooring texture
export function createMarbleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base luxury dark polished stone/parquet
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#151518');
  grad.addColorStop(0.5, '#19191d');
  grad.addColorStop(1, '#111114');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Marble veins with golden & smoke accents
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    let x = Math.random() * 1024;
    let y = Math.random() * 1024;
    ctx.moveTo(x, y);
    ctx.strokeStyle = i % 3 === 0 ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.05)';
    for (let j = 0; j < 8; j++) {
      x += (Math.random() - 0.45) * 160;
      y += (Math.random() - 0.45) * 160;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Herringbone / tile divider lines
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = 2;
  const tileSize = 128;
  for (let x = 0; x < 1024; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y < 1024; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 12);
  return texture;
}

// Create luxury walnut wood texture for the Almira wardrobe
export function createWalnutTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep rich walnut base
  ctx.fillStyle = '#22150f';
  ctx.fillRect(0, 0, 512, 512);

  // Grain lines
  for (let y = 0; y < 512; y += 2) {
    const alpha = 0.04 + Math.sin(y * 0.1) * 0.03 + Math.random() * 0.03;
    ctx.fillStyle = `rgba(10, 6, 4, ${alpha})`;
    ctx.fillRect(0, y, 512, 2);
  }

  // Golden shimmer highlights in grain
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    const startY = Math.random() * 512;
    ctx.moveTo(0, startY);
    ctx.bezierCurveTo(170, startY + (Math.random() - 0.5) * 30, 340, startY + (Math.random() - 0.5) * 30, 512, startY);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Create fabric bump & pattern textures
export function createFabricTexture(type = 'linen', baseHex = 0xded4c2) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const r = (baseHex >> 16) & 255;
  const g = (baseHex >> 8) & 255;
  const b = baseHex & 255;

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, 256, 256);

  if (type === 'linen') {
    // Linen slub pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    for (let x = 0; x < 256; x += 3) {
      ctx.fillRect(x, 0, 1, 256);
    }
    for (let y = 0; y < 256; y += 4) {
      ctx.fillRect(0, y, 256, 1);
    }
    // Occasional thicker slubs
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 20 + 5, 2);
    }
  } else if (type === 'velvet') {
    // Velvet soft radial nap
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  } else if (type === 'raw_silk') {
    // Silk horizontal sheen lines
    for (let y = 0; y < 256; y += 2) {
      ctx.fillStyle = (y % 4 === 0) ? 'rgba(255, 215, 0, 0.07)' : 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, y, 256, 1);
    }
  } else if (type === 'wool') {
    // Diagonal twill
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.lineWidth = 1;
    for (let i = -256; i < 512; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 256, 256);
      ctx.stroke();
    }
  } else {
    // Cotton grid
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    for (let x = 0; x < 256; x += 2) ctx.fillRect(x, 0, 1, 256);
    for (let y = 0; y < 256; y += 2) ctx.fillRect(0, y, 256, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// Generate luxury garment illustrations for UI cards & modal previews
export function generateGarmentImage(garmentType, colorHex, accentColor = '#d4af37') {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 750;
  const ctx = canvas.getContext('2d');

  // Luxury studio background
  const bgGrad = ctx.createRadialGradient(300, 350, 40, 300, 375, 450);
  bgGrad.addColorStop(0, '#1c1c22');
  bgGrad.addColorStop(0.7, '#111114');
  bgGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 600, 750);

  // Soft studio backlight oval
  const glowGrad = ctx.createRadialGradient(300, 320, 10, 300, 320, 200);
  glowGrad.addColorStop(0, 'rgba(212, 175, 55, 0.14)');
  glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, 600, 750);

  // Hanger hook in gold
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(300, 120, 24, Math.PI, 2.2 * Math.PI);
  ctx.stroke();

  // Hanger shoulders
  ctx.beginPath();
  ctx.moveTo(300, 144);
  ctx.lineTo(190, 195);
  ctx.moveTo(300, 144);
  ctx.lineTo(410, 195);
  ctx.stroke();

  // Garment Body
  ctx.fillStyle = colorHex;
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 16;

  ctx.beginPath();
  if (garmentType === 'sherwani' || garmentType === 'kurta') {
    // Long elegant silhouette
    ctx.moveTo(250, 180);
    ctx.lineTo(180, 215); // Left shoulder
    ctx.lineTo(145, 380); // Left sleeve end
    ctx.lineTo(195, 380); // Left sleeve inner
    ctx.lineTo(210, 310); // Armpit
    ctx.lineTo(190, 620); // Bottom left hem
    ctx.bezierCurveTo(240, 635, 360, 635, 410, 620); // Bottom hem curve
    ctx.lineTo(390, 310); // Right armpit
    ctx.lineTo(405, 380); // Right sleeve inner
    ctx.lineTo(455, 380); // Right sleeve end
    ctx.lineTo(420, 215); // Right shoulder
    ctx.lineTo(350, 180); // Neck right
    ctx.closePath();
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Collar
    ctx.fillStyle = colorHex;
    ctx.fillRect(265, 155, 70, 30);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(265, 155, 70, 30);

    // Center placket line
    ctx.beginPath();
    ctx.moveTo(300, 185);
    ctx.lineTo(300, 520);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Buttons
    for (let y = 205; y <= 480; y += 38) {
      ctx.beginPath();
      ctx.arc(300, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.fill();
    }
  } else if (garmentType === 'tuxedo' || garmentType === 'bandhgala') {
    // Tailored jacket
    ctx.moveTo(260, 180);
    ctx.lineTo(170, 210); // Left shoulder
    ctx.lineTo(135, 430); // Left sleeve end
    ctx.lineTo(185, 430); // Left sleeve inner
    ctx.lineTo(215, 320); // Armpit
    ctx.lineTo(210, 530); // Bottom left
    ctx.lineTo(390, 530); // Bottom right
    ctx.lineTo(385, 320); // Armpit
    ctx.lineTo(415, 430); // Right sleeve inner
    ctx.lineTo(465, 430); // Right sleeve end
    ctx.lineTo(430, 210); // Right shoulder
    ctx.lineTo(340, 180); // Neck right
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    // Lapels
    ctx.fillStyle = '#0f0f13';
    ctx.beginPath();
    ctx.moveTo(270, 180);
    ctx.lineTo(300, 340);
    ctx.lineTo(240, 260);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(330, 180);
    ctx.lineTo(300, 340);
    ctx.lineTo(360, 260);
    ctx.closePath();
    ctx.fill();

    // Pocket square in gold
    ctx.fillStyle = accentColor;
    ctx.fillRect(235, 275, 24, 4);

    // Front button
    ctx.beginPath();
    ctx.arc(300, 375, 5, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.fill();
  } else if (garmentType === 'nehru_vest') {
    // Sleeveless vest
    ctx.moveTo(265, 175);
    ctx.lineTo(205, 195);
    ctx.bezierCurveTo(230, 260, 230, 290, 220, 310);
    ctx.lineTo(210, 520);
    ctx.lineTo(390, 520);
    ctx.lineTo(380, 310);
    ctx.bezierCurveTo(370, 290, 370, 260, 395, 195);
    ctx.lineTo(335, 175);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    // Mandarin collar
    ctx.fillRect(265, 155, 70, 22);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(265, 155, 70, 22);

    // Welt pockets
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.strokeRect(235, 380, 36, 3);
    ctx.strokeRect(330, 380, 36, 3);

    // Buttons
    for (let y = 205; y <= 460; y += 45) {
      ctx.beginPath();
      ctx.arc(300, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.fill();
    }
  } else {
    // Crisp formal shirt
    ctx.moveTo(255, 180);
    ctx.lineTo(175, 205);
    ctx.lineTo(135, 410);
    ctx.lineTo(180, 410);
    ctx.lineTo(210, 300);
    ctx.lineTo(215, 520);
    ctx.lineTo(385, 520);
    ctx.lineTo(390, 300);
    ctx.lineTo(420, 410);
    ctx.lineTo(465, 410);
    ctx.lineTo(425, 205);
    ctx.lineTo(345, 180);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    // Cutaway collar flaps
    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.moveTo(260, 180);
    ctx.lineTo(235, 225);
    ctx.lineTo(285, 215);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(340, 180);
    ctx.lineTo(365, 225);
    ctx.lineTo(315, 215);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center placket & buttons
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.strokeRect(292, 185, 16, 335);

    for (let y = 215; y <= 470; y += 42) {
      ctx.beginPath();
      ctx.arc(300, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Brand watermark at bottom
  ctx.font = '600 13px "Cinzel", serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('RAHEEM CLOTHS SHOWROOM', 300, 710);

  return canvas.toDataURL('image/png');
}
