const fs = require("fs");
const path = require("path");

/**
 * Met à jour le fichier main.tsx pour ajouter Redux Provider si nécessaire.
 * @param {string} projectPath - Chemin du projet
 */
function updateMainTsx(projectPath) {
  const mainTsxPath = path.join(projectPath, "src", "main.tsx");

  if (!fs.existsSync(mainTsxPath)) {
    console.error("Le fichier main.tsx n'existe pas.");
    return;
  }

  // Lire le contenu actuel du fichier main.tsx
  let content = fs.readFileSync(mainTsxPath, "utf8");

  // Vérifier si le fichier contient déjà les lignes nécessaires pour Redux
  if (content.includes("Provider") && content.includes("store")) {
    console.log("Le fichier main.tsx est déjà configuré pour Redux.");
    return;
  }

  // Définir les lignes à ajouter
  const importLines = `import { Provider } from "react-redux";
import store from "./stores/store.ts";\n`;
  const providerWrapper = `<Provider store={store}>`;

  // Ajouter les lignes d'importation après les importations existantes
  const importInsertionPoint = content.indexOf('import "./styles/index.css";');
  if (importInsertionPoint === -1) {
    console.error("Impossible de trouver l'endroit pour insérer les imports.");
    return;
  }

  content =
    content.slice(0, importInsertionPoint) +
    importLines +
    content.slice(importInsertionPoint);

  // Ajouter le Provider autour de <App /> dans la méthode render
  const renderInsertionPoint = content.indexOf("<App />");
  if (renderInsertionPoint === -1) {
    console.error("Impossible de trouver l'endroit pour ajouter le Provider.");
    return;
  }

  content =
    content.slice(0, renderInsertionPoint) +
    providerWrapper +
    "\n      " +
    content.slice(renderInsertionPoint);

  // Ajouter la balise de fermeture pour le Provider
  content = content.replace("</StrictMode>", "  </Provider>\n</StrictMode>");

  // Écrire les modifications dans le fichier
  fs.writeFileSync(mainTsxPath, content, "utf8");
  console.log("Le fichier main.tsx a été mis à jour avec Redux.");
}

module.exports = { updateMainTsx };
