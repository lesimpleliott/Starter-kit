// @ts-nocheck - Ligne à supprimer lors de l'utilisation du fichier
/**
# EXEMPLE DE STORE ZUSTAND
Ce fichier a été généré automatiquement par le Starter Kit eLeGarage.
Il contient un exemple de store Zustand pour gérer l'état du menu.

## Description
Ce store fournit un état booléen `menuIsOpen` pour indiquer si le menu est ouvert ou fermé.
Il expose également une méthode `setMenuIsOpen` pour mettre à jour cet état.

## Instructions d'Utilisation
Pour utiliser ce store dans un composant React :

```typescript
import useStoreMenu from 'src/stores/menu.store';
const { menuIsOpen, setMenuIsOpen } = useStoreMenu();
```
*/
import { create } from "zustand";

type menuStoreType = {
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: boolean) => void;
};

const useStoreMenu = create<menuStoreType>((set) => ({
  menuIsOpen: false,
  setMenuIsOpen: (menuIsOpen: boolean) => set({ menuIsOpen }),
}));

export default useStoreMenu;
