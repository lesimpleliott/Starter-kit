const prompts = require("prompts");
const path = require("path");
const { updatePackageJson } = require("../utils/updatePackageJSON");
const {
  copyTemplateDirectory,
  copyTemplateFile,
} = require("../utils/copyTemplateFile");

async function addStyle(projectPath) {
  try {
    // Demander à l'utilisateur s'il souhaite ajouter un style
    const response = await prompts({
      type: "select",
      name: "style",
      message: "Souhaitez-vous ajouter un style ?",
      initial: 1, // Position de l'option par défaut dans la liste
      choices: [
        { title: "Styled Components", value: "styledComponents" },
        { title: "Tailwind", value: "tailwind" },
      ],
    });

    // INSTALLATION DE TAILWIND
    if (response.style === "tailwind") {
      // Ajouter les devDependencies pour Tailwind
      updatePackageJson(projectPath, {
        devDependencies: {
          tailwindcss: "^3.4.10",
          autoprefixer: "^10.4.20",
          postcss: "^8.4.45",
        },
      });
      // Copier le fichier tailwind.config.js à la racine du projet
      copyTemplateFile("tailwind/tailwind.config.js", path.join(projectPath));
      // Copier le fichier postcss.config.js à la racine du projet
      copyTemplateFile("tailwind/postcss.config.js", path.join(projectPath));
      // Copier le fichier index.css dans le dossier src/styles
      copyTemplateFile(
        "tailwind/index.css",
        path.join(projectPath, "src", "styles")
      );

      // Ajouter les devDependencies pour Prettier
      updatePackageJson(projectPath, {
        devDependencies: {
          prettier: "^3.3.3",
          "prettier-plugin-tailwindcss": "^0.6.6",
        },
      });
      // Copier le fichier .prettierrc.json à la racine du projet
      copyTemplateFile("tailwind/.prettierrc.json", path.join(projectPath));

      console.log(`✅ ${response.style} est ajouté au projet.`);
    }

    // INSTALLATION DE STYLED COMPONENTS
    if (response.style === "styledComponents") {
      // Ajouter les devDependencies au package.json
      updatePackageJson(projectPath, {
        devDependencies: {
          "styled-components": "^6.1.13",
          sass: "^1.78.0",
        },
      });

      // Copier le fichier index.css dans le dossier src/styles
      copyTemplateFile(
        "styledComponents/index.css",
        path.join(projectPath, "src", "styles")
      );

      // Copier le dossier 'base' et son contenu dans le répertoire de destination
      copyTemplateDirectory(
        "styledComponents/base/",
        path.join(projectPath, "src", "styles", "base")
      );

      // Copier le dossier 'theme' et son contenu dans le répertoire de destination
      copyTemplateDirectory(
        "styledComponents/theme/",
        path.join(projectPath, "src", "styles", "theme")
      );

      console.log(`✅ ${response.style} est ajouté au projet.`);
    }
  } catch (error) {
    console.error(
      "❌ Une erreur s'est produite lors de l'ajout du style:",
      error
    );
  }
}

module.exports = { addStyle };
