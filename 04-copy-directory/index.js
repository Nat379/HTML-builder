const fs = require('fs').promises;
const path = require('path');

function displayFolderContents(folderPath) {
  return fs
    .readdir(folderPath)
    .then((files) => {
      console.log(`${folderPath}:`);
      files.forEach((file) => console.log(`  - ${file}`));
      console.log();
    })
    .catch((error) => console.error(`Error ${folderPath}: ${error.message}`));
}

function copyDir(src, dest) {
  fs.mkdir(dest, { recursive: true })
    .then(() =>
      Promise.all([
        fs.readdir(src, { withFileTypes: true }),
        fs.readdir(dest, { withFileTypes: true }),
      ]),
    )
    .then(([srcFiles, destFiles]) => {
      const srcFileNames = srcFiles.map((file) => file.name);
      const destFileNames = destFiles.map((file) => file.name);

      // delete files from dest
      const deletePromises = destFileNames
        .filter((fileName) => !srcFileNames.includes(fileName))
        .map((fileName) => fs.unlink(path.join(dest, fileName)));

      // Upgrade dest
      const copyPromises = srcFiles.map((file) => {
        const srcPath = path.join(src, file.name);
        const destPath = path.join(dest, file.name);

        if (file.isDirectory()) {
          return copyDir(srcPath, destPath);
        } else {
          return fs.copyFile(srcPath, destPath);
        }
      });

      return Promise.all([...deletePromises, ...copyPromises]);
    })
    .then(() =>
      Promise.all([displayFolderContents(src), displayFolderContents(dest)]),
    )
    .catch((error) => console.error(`Error: ${error.message}`));
}

const srcDir = '04-copy-directory/files';
const destDir = '04-copy-directory/files-copy';

copyDir(srcDir, destDir);
