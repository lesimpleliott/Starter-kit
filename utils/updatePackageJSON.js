// Fonction pour ajouter des dépendances au package.json

/**
* @param {string} projectPath - Chemin du projet
* @param {Object} dependencies - Dépendances à ajouter
*/

const fs = require("fs");
const path = require("path");

function updatePackageJson(projectPath, dependencies) {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.dependencies = packageJson.dependencies || {};

  // Ajouter ou mettre à jour les dépendances
  Object.keys(dependencies).forEach((dep) => {
    packageJson.dependencies[dep] = dependencies[dep];
  });

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8"
  );
}

module.exports = { updatePackageJson };
