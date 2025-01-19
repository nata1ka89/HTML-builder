const fs = require('fs').promises;
const path = require('path');

async function replacesTags() {
  try {
    let textTemplate = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );

    const folderComponentsPath = path.join(__dirname, 'components');
    const filesComponents = await fs.readdir(folderComponentsPath);

    for (const file of filesComponents) {
      const filePath = path.join(folderComponentsPath, file);
      const stats = await fs.stat(filePath);
      const extension = path.extname(file);
      const name = path.basename(file, extension);
      const textComponents = await fs.readFile(filePath, 'utf-8');

      if (stats.isFile() && extension === '.html') {
        textTemplate = textTemplate.replace(`{{${name}}}`, textComponents);
      }
    }

    await fs.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      textTemplate,
    );
  } catch {
    console.error('Error');
  }
}

let resourceFolder = 'assets';
async function copyDir(resourceFolder) {
  try {
    const newFolder = path.join(__dirname, 'project-dist', resourceFolder); //новая папка
    await fs.mkdir(newFolder, {
      recursive: true,
    });
    const filesPath = path.join(__dirname, resourceFolder); //путь папки откуда прочитать
    const files = await fs.readdir(filesPath);

    for (const file of files) {
      const filePath = path.join(filesPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await fs.mkdir(path.join(newFolder, file), {
          recursive: true,
        });
        copyDir(resourceFolder + '/' + file);
      } else {
        await fs.copyFile(
          path.join(filesPath, file),
          path.join(newFolder, file),
        );
      }
    }

    /*const filesCopy = await fs.readdir(path.join(newFolder, 'assets'));

    for (const fileCopy of filesCopy) {
      if (!files.includes(fileCopy)) {
        await fs.unlink(path.join(newFolder, 'assets', fileCopy));
      }
    }*/
  } catch {
    console.error('Error');
  }
}

copyDir(resourceFolder);

async function readStyles() {
  try {
    const folderPath = path.join(__dirname, 'styles');
    const filesStyles = await fs.readdir(folderPath);
    await fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '');

    for (const file of filesStyles) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);
      const extension = path.extname(file);
      const text = await fs.readFile(filePath, 'utf-8');
      if (stats.isFile() && extension === '.css') {
        await fs.appendFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          text,
        );
      }
    }
  } catch {
    console.error('Error');
  }
}

readStyles();

replacesTags();
