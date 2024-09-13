const prompts = require("prompts");
const fs = require("fs");
const path = require("path");
const { updatePackageJson } = require("../utils/updatePackageJSON");
const { copyAndRenameFile } = require("../utils/copyAndRenameFile");

// Fonction principale pour ajouter un store
async function addStore(projectPath) {
  try {
    // Demander à l'utilisateur s'il souhaite ajouter un store
    const response = await prompts({
      type: "select",
      name: "store",
      message: "Souhaitez-vous ajouter un store ?",
      initial: 0, // Position de l'option par défaut dans la liste
      choices: [
        { title: "Aucun", value: "none" },
        { title: "Zustand", value: "zustand" },
        { title: "Redux", value: "redux" },
      ],
    });

    // INSTALLATION DE ZUSTAND
    if (response.store === "zustand") {
      // Ajouter les dépendances pour Zustand
      updatePackageJson(projectPath, { dependencies: { zustand: "^4.5.5" } });

      // Copier et renommer le template zustand
      copyAndRenameFile(
        path.join(__dirname, "../template/LibrairiesFiles/zustandExample.ts"),
        path.join(projectPath, "src", "stores", "zustandExample.ts"),
        "menu.store.ts"
      );

      console.log(`✅ ${response.store} est ajouté au projet.`);
    }

    // INSTALLATION DE REDUX
    if (response.store === "redux") {
      // Ajouter les dépendances pour Redux
      updatePackageJson(projectPath, {
        dependencies: { "react-redux": "^9.1.2", "@reduxjs/toolkit": "^2.2.7" },
      });

      // Copier et renommer le Template redux store
      copyAndRenameFile(
        path.join(
          __dirname,
          "../template/LibrairiesFiles/reduxStoreExample.ts"
        ),
        path.join(projectPath, "src", "stores", "reduxStoreExample.ts"),
        "store.ts"
      );

      // Copier et renommer le Template redux slice
      copyAndRenameFile(
        path.join(
          __dirname,
          "../template/LibrairiesFiles/reduxSliceExample.ts"
        ),
        path.join(projectPath, "src", "stores", "reduxSliceExample.ts"),
        "app.slice.ts"
      );

      console.log(`✅ ${response.store} est ajouté au projet.`);
    }

    if (response.store === "none") {
      console.log("🚫 Aucun store ajouté.");
    }
  } catch (error) {
    console.error("❌ Erreur lors de la sélection du store:", error);
  }
}

module.exports = { addStore };
