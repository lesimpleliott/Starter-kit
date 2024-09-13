/**
 * @param {string} projectPath - Chemin du projet
 */

const prompts = require("prompts");
const fs = require("fs");
const path = require("path");
const { updatePackageJson } = require("../utils/updatePackageJSON");
const { copyTemplateFile } = require("../utils/copyTemplateFile");

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
      // Copier le template zustand
      copyTemplateFile(
        "zustand/menu.store.ts", // Chemin relatif à partir du chemin de base, inclut le nom du fichier
        path.join(projectPath, "src", "stores") // Dossier de destination sans préciser le nom du fichier
      );

      console.log(`✅ ${response.store} est ajouté au projet.`);
    }

    // INSTALLATION DE REDUX
    if (response.store === "redux") {
      // Ajouter les dépendances pour Redux
      updatePackageJson(projectPath, {
        dependencies: { "react-redux": "^9.1.2", "@reduxjs/toolkit": "^2.2.7" },
      });
      // Copier le Template redux provider
      copyTemplateFile(
        "redux/store.ts",
        path.join(projectPath, "src", "stores")
      );
      // Copier le Template redux Slice
      copyTemplateFile(
        "redux/app.slice.ts",
        path.join(projectPath, "src", "stores")
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
