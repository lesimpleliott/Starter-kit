const prompts = require("prompts");
const path = require("path");
const { updatePackageJson } = require("../utils/updatePackageJSON");
const { copyTemplateFile } = require("../utils/copyTemplateFile");
const { updateTsx } = require("../utils/updateTsx");

async function addMultilingual(projectPath) {
  try {
    // Demander à l'utilisateur s'il souhaite ajouter la gestion du multilingue
    const response = await prompts({
      type: "toggle", // Utilisation du type toggle pour Y/N
      name: "confirm",
      message: "Souhaitez-vous ajouter la gestion du multilingue (i18Next) ?",
      initial: false, // Valeur par défaut (false pour "non")
      active: "Oui", // Texte pour la réponse positive
      inactive: "Non", // Texte pour la réponse négative
    });

    // Vérification de la réponse
    if (response.confirm) {
      // Ajouter les dépendances pour i18Next
      updatePackageJson(projectPath, {
        dependencies: {
          i18next: "^23.14.0",
          "react-i18next": "^15.0.1",
        },
      });
      // Copie le template i18n.ts dans le dossier src/utils
      copyTemplateFile(
        "i18Next/i18n.ts",
        path.join(projectPath, "src", "utils")
      );
      // Copie les template de fichiers de traduction dans le dossier locales
      const languages = ["en", "fr"];
      languages.forEach((language) => {
        copyTemplateFile(
          `i18Next/locales/${language}/translation.json`,
          path.join(projectPath, "locales", language)
        );
      });

      // Ajouter de i18Next dans le fichier main.tsx
      updateTsx(projectPath, "main.tsx", "i18Next");

      console.log(`✅ i18Next est ajouté au projet.`);
    } else {
      console.log("🚫 Pas de gestion multilingue pour ce projet.");
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'installation du multilingue:", error);
  }
}

module.exports = { addMultilingual };
