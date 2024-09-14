const importLines = `import { Provider } from "react-redux";
import store from "./stores/store.ts";
`;

const wrapperLines = `<Provider store={store}>`;
const closingWrapperLine = `</Provider>`;
const importInsertionPoint = 'import "./styles/index.css";'; // Point d'insertion pour les imports
const wrapperTarget = "<App />"; // Point d'insertion pour le wrapper

module.exports = {
  importLines,
  wrapperLines,
  closingWrapperLine,
  importInsertionPoint,
  wrapperTarget,
};
