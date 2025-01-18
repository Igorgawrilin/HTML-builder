const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileStats = fs.statSync(filePath);
      const fileSize = fileStats.size;
      const fileName = path.parse(file.name).name;
      const fileExtension = path.extname(file.name).slice(1);
      console.log(`${fileName} - ${fileExtension} - ${fileSize} B`);
    }
  });
});
