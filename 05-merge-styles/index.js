const fs = require('fs');
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'bundle.css');
async function mergeStyles() {
  try {
    if (!fs.existsSync(outputDir)) {
      await fs.promises.mkdir(outputDir, { recursive: true });
    }
    const files = await fs.promises.readdir(stylesDir, { withFileTypes: true });
    const cssFiles = [];

    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        cssFiles.push(file.name);
      }
    }
    await fs.promises.writeFile(outputFile, '');
    for (const cssFile of cssFiles) {
      const filePath = path.join(stylesDir, cssFile);
      const data = await fs.promises.readFile(filePath, 'utf-8');
      await fs.promises.appendFile(outputFile, data + '\n');
    }
    console.log('Styles successfully merged into bundle.css');
  } catch (err) {
    console.error('Error merging styles:', err);
  }
}
mergeStyles();
