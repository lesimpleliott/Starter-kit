/**
 * Fonction pour copier un fichier 'Template' dans un dossier de destination.
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

/**
 * Fonction pour copier un répertoire 'Template' dans un dossier de destination.
 * @param {string} src - Chemin relatif du répertoire source à partir du répertoire de base (inclut le dossier à copier)
 * @param {string} destDir - Répertoire de destination où le contenu sera copié
 * @param {string} baseDir - (optionnel) Chemin de base pour le répertoire source
 */
function copyTemplateDirectory(
  src,
  destDir,
  baseDir = path.join(__dirname, "../template/LibrairiesFiles")
) {
  const fullSrcDir = path.join(baseDir, src); // Combiner le chemin de base et le chemin source
  const entries = fs.readdirSync(fullSrcDir, { withFileTypes: true }); // Lire le contenu du répertoire source

  // Créer le répertoire de destination s'il n'existe pas
  fs.mkdirSync(destDir, { recursive: true });

  for (let entry of entries) {
    const srcPath = path.join(fullSrcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // Recursion pour les sous-dossiers
      copyTemplateDirectory(entry.name + "/", destPath, baseDir);
    } else {
      // Copier les fichiers
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

module.exports = { copyTemplateFile, copyTemplateDirectory };
