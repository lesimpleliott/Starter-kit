// Fonction pour copier des fichiers depuis le réperoire template/LibrairiesFiles
/**
 * Fonction pour copier un fichier d'un répertoire de base sans répéter le chemin de base
 * @param {string} src - Chemin du fichier source à partir du chemin de base (inclut le nom du fichier)
 * @param {string} destDir - Dossier de destination où le fichier sera copié
 * @param {string} baseDir - (optionnel) Chemin de base pour le répertoire source
 */

const fs = require("fs");
const path = require("path");

function copyTemplateFile(
  src,
  destDir,
  baseDir = path.join(__dirname, "../template/LibrairiesFiles")
) {
  const fullSrcPath = path.join(baseDir, src); // Combiner le chemin de base et le chemin source
  const fileName = path.basename(src); // Extraire le nom du fichier depuis le chemin source
  const fullDestPath = path.join(destDir, fileName); // Construire le chemin de destination avec le nom du fichier

  fs.mkdirSync(path.dirname(fullDestPath), { recursive: true }); // Créer les dossiers si nécessaire
  fs.copyFileSync(fullSrcPath, fullDestPath); // Copier le fichier
}

module.exports = { copyTemplateFile };
