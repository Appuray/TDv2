const fs = require('fs');
const path = require('path');

const files = [
  'src/components/sections/HeroPhotoWall.tsx',
  'src/components/sections/CaseStudies.tsx',
  'src/components/sections/ProcessSection.tsx'
];

const newImages = [
  '/images/tattoo_design.png',
  '/images/tattoo_making.png'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let imgIndex = 0;
    
    // Replace all picsum.photos URLs
    content = content.replace(/https:\/\/picsum\.photos\/seed\/[^/]+\/\d+\/\d+/g, () => {
      const url = newImages[imgIndex % newImages.length];
      imgIndex++;
      return url;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', file);
  }
});
