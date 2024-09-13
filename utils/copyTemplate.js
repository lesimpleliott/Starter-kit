const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "..", "template/ReactApp");

// Fonction utilitaire pour copier les fichiers du template
function copyTemplate(destination) {
  function copyDir(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    entries.forEach((entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  copyDir(templatePath, destination);
}

module.exports = { copyTemplate };
