const fs = require('fs');
const path = require('path');
const firstDir = path.join(__dirname, 'files');
const secondDir = path.join(__dirname, 'files-copy');
function copyDir(first, second) {
  fs.readdir(first, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error('error:', err);
      return;
    }
    if (!fs.existsSync(second)) {
      fs.mkdirSync(second, { recursive: true });
    }
    let totalEntries = entries.length;
    let processedEntries = 0;
    entries.forEach((entry) => {
      const firPath = path.join(first, entry.name);
      const secPath = path.join(second, entry.name);
      if (entry.isDirectory()) {
        copyDir(firPath, secPath);
      } else {
        fs.copyFile(firPath, secPath, (err) => {
          if (err) {
            console.error('error while copying ${entry.name}:', err);
          } else {
            console.log('file ${entry.name} was copied');
          }
        });
      }
      processedEntries++;
      if (processedEntries === totalEntries) {
        console.log('copying was completed');
      }
    });
  });
}
copyDir(firstDir, secondDir);
