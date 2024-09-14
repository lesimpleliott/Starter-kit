const { exec } = require("child_process");
const path = require("path");
const prompts = require("prompts");

async function openProject(projectPath) {
  try {
    const fullPath = path.resolve(projectPath);
    const response = await prompts({
      type: "select",
      name: "openning",
      message: "Souhaitez-vous ouvrir le projet ?",
      initial: 0, // Position de l'option par défaut dans la liste
      choices: [
        { title: "VSCode", value: "vscode" },
        { title: "Terminal", value: "terminal" },
        { title: "Nope", value: "none" },
      ],
    });

    // Ouvrir le projet dans VS Code
    if (response.openning === "vscode") {
      exec(`code ${fullPath}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error opening VS Code: ${err}`);
          return;
        }
        console.log(`✅ Projet ouvert avec succès dans VSCode !`);
      });
      return;
    }

    // Ouvrir le projet dans le terminal
    if (response.openning === "terminal") {
      exec(`open -a Terminal ${fullPath}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error opening terminal: ${err}`);
          return;
        }
        console.log(`✅ Projet ouvert avec succès dans le Terminal !`);
      });
    }

    // Aucune ouverture
    if (response.openning === "none") {
      console.log("🚫 Aucun ouverture de projet.");
      return;
    }
  } catch (error) {
    console.error(
      "❌ Une erreur s'est produite lors de l'ouverture du projet:",
      error
    );
  }
}

module.exports = { openProject };
