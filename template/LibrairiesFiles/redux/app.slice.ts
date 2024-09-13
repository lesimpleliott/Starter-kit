// @ts-nocheck - Ligne à supprimer lors de l'utilisation du fichier
/** 
# EXEMPLE DE SLICE REDUX
Ce fichier a été généré automatiquement par le Starter Kit eLeGarage.
Il contient un exemple de Slice Redux pour gérer l'état de l'application.
Ce Slice est configuré avec Redux Toolkit.

## Description
Ce Slice fournit un état `app` pour gérer les informations de l'application.
Il expose également des actions pour mettre à jour cet état.

## Instructions d'Utilisation
Pour utiliser menuIsOpen dans un composant React :
```typescript
import { useSelector } from "react-redux";
const menuIsOpen = useSelector((state: RootState) => state.app.menuIsOpen);
````
Pour mettre à jour menuIsOpen dans un composant React :
```typescript
import { useDispatch } from "react-redux";
import { setMenuIsOpen } from "src/store/app.slice";
const dispatch = useDispatch();
dispatch(setMenuIsOpen(true));
```
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppStateType = {
  menuIsOpen: boolean;
};

const initialState: AppStateType = {
  menuIsOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMenuIsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.menuIsOpen = payload;
    },
  },
});

export const { setMenuIsOpen } = appSlice.actions;
export default appSlice.reducer;
