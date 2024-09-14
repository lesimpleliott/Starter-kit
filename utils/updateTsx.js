const fs = require("fs");
const path = require("path");

/**
 * Met à jour un fichier .tsx en fonction des modifications spécifiées pour une bibliothèque.
 * @param {string} projectPath - Chemin du projet
 * @param {string} fileTsx - Nom du fichier .tsx à mettre à jour (ex: "main.tsx")
 * @param {string} lib - Nom de la bibliothèque (ex: "i18Next", "redux")
 */
function updateTsx(projectPath, fileTsx, lib) {
  const filePath = path.join(projectPath, "src", fileTsx);
  const baseTemplatePath = path.join(__dirname, "../template/LibrairiesFiles");
  const templatePath = path.join(
    baseTemplatePath,
    lib,
    `${fileTsx.replace(".tsx", ".js")}`
  );

  if (!fs.existsSync(filePath)) {
    console.error(`Le fichier ${fileTsx} n'existe pas.`);
    return;
  }

  if (!fs.existsSync(templatePath)) {
    console.error(
      `Le fichier template pour ${lib} et ${fileTsx} n'existe pas.`
    );
    return;
  }

  // Lire le contenu actuel du fichier .tsx
  let content = fs.readFileSync(filePath, "utf8");

  // Lire le contenu du fichier de template
  const {
    importLines,
    wrapperLines,
    closingWrapperLine,
    importInsertionPoint,
    wrapperTarget,
  } = require(templatePath);

  // Ajouter les lignes d'importation après les importations existantes
  if (importLines.trim()) {
    const importInsertPointIndex = content.indexOf(importInsertionPoint);
    if (importInsertPointIndex === -1) {
      console.error(
        "Impossible de trouver l'endroit pour insérer les imports."
      );
      return;
    }
    content =
      content.slice(0, importInsertPointIndex) +
      importLines +
      content.slice(importInsertPointIndex);
  }

  // Ajouter le wrapper autour de la cible spécifiée (par exemple <App />)
  if (wrapperLines.trim()) {
    const wrapperInsertPointIndex = content.indexOf(wrapperTarget);
    if (wrapperInsertPointIndex === -1) {
      console.error("Impossible de trouver l'endroit pour ajouter le wrapper.");
      return;
    }
    content =
      content.slice(0, wrapperInsertPointIndex) +
      wrapperLines +
      "\n      " +
      content.slice(wrapperInsertPointIndex);
    // Ajouter la balise de fermeture pour le wrapper
    content = content.replace(
      "</StrictMode>",
      `  ${closingWrapperLine}\n</StrictMode>`
    );
  }

  // Écrire les modifications dans le fichier
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Le fichier ${fileTsx} a été mis à jour avec ${lib}.`);
}

module.exports = { updateTsx };
