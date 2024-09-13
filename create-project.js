const { askProjectName } = require("./features/askProjectName");
const { createFolder } = require("./features/createFolder");
const { updatePackageJson } = require("./features/updatePackageJSON");

async function createProject() {
  const { projectName, projectPath } = await askProjectName();

  // Créer le dossier avec le template
  createFolder(projectPath);
  // Remplacer le nom du projet dans package.json
  updatePackageJson(projectPath, projectName);

  // Ajout de dépendances

  // Afficher un message de succès
  console.log(`🚀 Le projet '${projectPath}' a été créé avec succès !`);
  // console.log(`🚀 Le projet '${projectName}' a été créé avec succès !`);
}

createProject();
