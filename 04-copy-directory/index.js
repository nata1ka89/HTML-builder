const fs = require('fs').promises;
const path = require('path');
async function copyDir() {
  try {
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
    const files = await fs.readdir(path.join(__dirname, 'files'));

    for (const file of files) {
      await fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
      );
    }

    const filesCopy = await fs.readdir(path.join(__dirname, 'files-copy'));

    for (const fileCopy of filesCopy) {
      if (!files.includes(fileCopy)) {
        await fs.unlink(path.join(__dirname, 'files-copy', fileCopy));
      }
    }
  } catch {
    console.error('Error');
  }
}

copyDir();
