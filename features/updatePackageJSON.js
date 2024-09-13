const fs = require("fs");
const path = require("path");

// Fonction pour mettre à jour le package.json
function updatePackageJson(projectPath, projectName) {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.name = projectName;

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8"
  );
  console.log(`✅ Le nom du projet a été mis à jour dans package.json.`);
}

module.exports = { updatePackageJson };
