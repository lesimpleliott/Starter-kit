/**
 * @params {string} projectName - Nom du projet
 * @params {string} projectPath - Chemin du projet
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const desktopPath = path.join(require("os").homedir(), "Desktop");

// Fonction pour demander le nom du projet et vérifier s'il existe
function askProjectName() {
  return new Promise((resolve) => {
    rl.question("📦 Quel est le nom du nouveau projet ? ", (name) => {
      let projectName = name.trim().replace(/\s+/g, "-");

      if (!projectName) {
        console.log(
          "❌ Le nom du projet ne peut pas être vide. Veuillez réessayer."
        );
        return resolve(askProjectName());
      }

      const projectPath = path.join(desktopPath, projectName);

      if (fs.existsSync(projectPath)) {
        console.log(
          `❌ Le dossier '${projectName}' existe déjà. Veuillez réessayer.`
        );
        return resolve(askProjectName());
      }

      // Fermeture de readline une fois la saisie terminée
      rl.close();
      resolve({ projectName, projectPath });
    });
  });
}

module.exports = { askProjectName };
