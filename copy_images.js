const fs = require('fs');
const path = require('path');

const filesToCopy = [
  {
    src: 'C:\\Users\\aman7\\.gemini\\antigravity-ide\\brain\\b1bdca2d-e8f5-49af-8ddc-1be6cf89f3af\\digital_sketch_1779357573648.png',
    dest: path.join(__dirname, 'public', 'images', 'digital_sketch.png')
  },
  {
    src: 'C:\\Users\\aman7\\.gemini\\antigravity-ide\\brain\\b1bdca2d-e8f5-49af-8ddc-1be6cf89f3af\\stencil_mapping_1779357594602.png',
    dest: path.join(__dirname, 'public', 'images', 'stencil_mapping.png')
  },
  {
    src: 'C:\\Users\\aman7\\.gemini\\antigravity-ide\\brain\\b1bdca2d-e8f5-49af-8ddc-1be6cf89f3af\\healed_result_1779357612064.png',
    dest: path.join(__dirname, 'public', 'images', 'healed_result.png')
  }
];

filesToCopy.forEach(item => {
  try {
    if (fs.existsSync(item.src)) {
      fs.copyFileSync(item.src, item.dest);
      console.log(`Copied: ${path.basename(item.src)} -> ${path.basename(item.dest)}`);
    } else {
      console.error(`Source does not exist: ${item.src}`);
    }
  } catch (err) {
    console.error(`Error copying ${path.basename(item.src)}:`, err.message);
  }
});
