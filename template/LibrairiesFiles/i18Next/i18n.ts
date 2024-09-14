// @ts-nocheck - Ligne à supprimer lors de l'utilisation du fichier
/**
Fichier de configuration de la librairie i18next
@see {@link https://react.i18next.com/ | Site de i18next}
Voir les fichiers de traduction dans le dossier locales à la racine du dossier
locales/fr/translation.json et locales/en/translation.json

Utilisation:
import { useTranslation } from "react-i18next";
const { t } = useTranslation();
<h1>{t("welcomeMessage")}</h1>

Utilisation avec paramètres (compteur):
<p>{t("description", {count: 1})}</p>
<p>{t("description", {count: 2})}</p>
*/

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../locales/en/translation.json";
import fr from "../../locales/fr/translation.json";

const resources = {
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  debug: false, // true: active le mode debug
  lng: "fr", // langue par défaut
  fallbackLng: "fr", // langue par défaut si la langue actuelle n'est pas disponible
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
