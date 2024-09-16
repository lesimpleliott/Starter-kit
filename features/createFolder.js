/**
 * Crée un dossier pour le projet
 * @params {string} projectPath - Chemin du projet
 */

const fs = require("fs");
const { copyTemplateReactApp } = require("../utils/copyTemplateReactApp");

// Fonction pour créer le dossier et copier le template
function createFolder(projectPath) {
  fs.mkdirSync(projectPath, { recursive: true });
  copyTemplateReactApp(projectPath);
  // console.log(`📂 Le dossier '${projectPath}' a été créé.`);
}

module.exports = { createFolder };
