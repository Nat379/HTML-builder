const fs = require('fs').promises;
const path = require('path');
const stylesFolderPath = '05-merge-styles/styles';
const outputFilePath = '05-merge-styles/project-dist/bundle.css';
function isCssFile(file) {
  return path.extname(file) === '.css';
}
function compileStyles() {
  // read files
  return fs
    .readdir(stylesFolderPath)
    .then((files) => {
      // filter files scc
      const cssFilesPromises = files
        .filter(isCssFile)
        .map((file) => fs.readFile(path.join(stylesFolderPath, file), 'utf-8'));
      return Promise.all(cssFilesPromises);
    })
    .then((cssFiles) => {
      // write files into bundle.css
      return fs.writeFile(outputFilePath, cssFiles.join('\n'));
    })
    .then(() => {
      console.log('bundle.css is created in project-dist');
    })
    .catch((error) => {
      console.error(`error: ${error.message}`);
    });
}

compileStyles();
