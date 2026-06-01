const fs = require('fs');
const files = [
  'src/app/home/components/CaseStudies.tsx',
  'src/app/home/components/HeroPhotoWall.tsx',
  'src/app/home/components/ProcessSection.tsx'
];

const images = [
  'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1562243061-204550def341?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1612450410714-3d9203a95b36?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&q=80&w=800'
];

let imgIndex = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/https:\/\/img\.rocket\.new\/generatedImages\/[^'"]+/g, () => {
    const url = images[imgIndex % images.length];
    imgIndex++;
    return url;
  });
  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed', file);
}