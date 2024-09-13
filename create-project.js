const { askProjectName } = require("./features/askProjectName");
const { createFolder } = require("./features/createFolder");
const { updatePackageJson } = require("./features/updatePackageJson");
const { addStore } = require("./features/addStore");

async function createProject() {
  try {
    // Création du projet
    const { projectName, projectPath } = await askProjectName(); // nom du projet et chemin
    createFolder(projectPath); // Créer le dossier du projet
    updatePackageJson(projectPath, projectName); // Mettre à jour le package.json

    // FEATURES
    // Ajout d'un store
    await addStore(projectPath);

    // Afficher un message de succès
    console.log("");
    console.log(`🚀 Le projet '${projectPath}' a été créé avec succès !`);
  } catch (error) {
    console.error(
      "❌ Une erreur s'est produite lors de la création du projet:",
      error
    );
  }
}

createProject();
