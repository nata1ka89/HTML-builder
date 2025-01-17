const fs = require('fs').promises;
const path = require('path');

async function readStyles() {
  try {
    const folderPath = path.join(__dirname, 'styles');
    const filesStyles = await fs.readdir(folderPath);
    await fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '');

    for (const file of filesStyles) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);
      const extension = path.extname(file);
      const text = await fs.readFile(filePath, 'utf-8');
      if (stats.isFile() && extension === '.css') {
        await fs.appendFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          text,
        );
      }
    }
  } catch {
    console.error('Error');
  }
}

readStyles();
