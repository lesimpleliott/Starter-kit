// Fonction pour copier et renommer des fichiers

/**
* @param {string} src - Chemin du fichier source
* @param {string} dest - Chemin de destination
* @param {string} newFileName - Nouveau nom du fichier
*/

const fs = require("fs");
const path = require("path");

function copyAndRenameFile(src, dest, newFileName) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);

  const finalPath = path.join(path.dirname(dest), newFileName);
  fs.renameSync(dest, finalPath);
}

module.exports = { copyAndRenameFile };
