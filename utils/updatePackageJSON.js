/**
* Met à jour le package.json

* @param {string} projectPath - Chemin du projet
* @param {object} options - Options
* @param {string} options.projectName - Nom du projet
* @param {object} options.dependencies - Dépendances

* @example projectName
updatePackageJson("path/to/project", { projectName: "mon-projet" });

* @example dependencies
updatePackageJson("path/to/project", { dependencies: { librairies: "^1.0.1" } });

* @example projectName et dependencies
updatePackageJson("path/to/project", { 
projectName: "mon-projet",
dependencies: { librairies: "^1.0.1" } 
});
**/

const fs = require("fs");
const path = require("path");

function updatePackageJson(projectPath, options = {}) {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Mettre à jour le nom du projet si fourni
  if (options.projectName) {
    packageJson.name = options.projectName;
    console.log(`✅ Le nom du projet a été mis à jour.`);
  }

  // Ajouter ou mettre à jour les dépendances si fournies
  if (options.dependencies) {
    packageJson.dependencies = packageJson.dependencies || {};
    Object.keys(options.dependencies).forEach((dep) => {
      packageJson.dependencies[dep] = options.dependencies[dep];
    });
    console.log(`✅ Les dépendances ont été mises à jour.`);
  }

  // Écrire les modifications dans package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8"
  );
}

module.exports = { updatePackageJson };
