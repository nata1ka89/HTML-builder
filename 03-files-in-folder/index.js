const fs = require('fs');
const path = require('path');
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          const filePath = path.join(__dirname, 'secret-folder', file.name);
          fs.stat(filePath, (err, stats) => {
            if (err) throw err;
            const size = stats.size;
            const name = path.basename(file.name, path.extname(file.name));
            const extension = path.extname(file.name).slice(1);

            console.log(name, '-', extension, '-', size);
          });
        }
      });
    }
  },
);
