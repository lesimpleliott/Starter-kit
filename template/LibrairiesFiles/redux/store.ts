// @ts-nocheck - Ligne à supprimer lors de l'utilisation du fichier
/**
# EXEMPLE DE STORE REDUX
Ce fichier a été généré automatiquement par le Starter Kit eLeGarage.
Il contient un exemple de store Redux pour gérer l'état de l'application.
Ce store est configuré avec Redux Toolkit.

## Description
Ce store fournit un état `app` pour gérer les informations de l'application.
Il expose également des actions pour mettre à jour cet état.

## Instructions d'Utilisation
Pour utiliser ce store dans un composant React : voir le Slice correspondant.
**/

import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app.slice";

const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
