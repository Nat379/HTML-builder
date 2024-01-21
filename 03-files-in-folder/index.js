const fs = require('fs').promises;
const path = require('path');

function displayFileInformation(folderPath) {
  fs.readdir(folderPath, { withFileTypes: true })
    .then((files) => {
      files.forEach((file) => {
        if (file.isFile()) {
          const filePath = path.join(folderPath, file.name);
          fs.stat(filePath)
            .then((fileStat) => {
              const fileExtension = path.extname(file.name);
              const fileName = path.basename(file.name, fileExtension);
              const fileSize = fileStat.size;
              console.log(
                `${fileName} - ${fileExtension.substring(1)} - ${fileSize}B`,
              );
            })
            .catch((error) =>
              console.error(`Error getting file stat: ${error.message}`),
            );
        }
      });
    })
    .catch((error) => console.error(`Error reading files: ${error.message}`));
}

// Викликати функцію з вказаним шляхом до каталогу
const folderPath = '03-files-in-folder/secret-folder';
displayFileInformation(folderPath);
