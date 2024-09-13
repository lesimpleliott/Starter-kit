/**
 * @params {string} projectPath - Chemin du projet
 */

const fs = require("fs");
const { copyTemplate } = require("../utils/copyTemplate");

// Fonction pour créer le dossier et copier le template
function createFolder(projectPath) {
  fs.mkdirSync(projectPath, { recursive: true });
  copyTemplate(projectPath);
  // console.log(`📂 Le dossier '${projectPath}' a été créé.`);
}

module.exports = { createFolder };
