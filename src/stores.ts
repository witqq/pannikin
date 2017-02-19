import {AppStore} from "./app/stores/app-store";
import {Game} from "./app/stores/game";
import {SnackBarStore} from "./app/views/snack-bar/snack-bar-store";

export const appStore = "appStore";

export const gameStore = "gameStore";

export const snackBarStore = "snackBarStore";

export interface Stores {
  appStore?: AppStore;
  gameStore?: Game;
  snackBarStore?: SnackBarStore;
}

declare global {
  interface Window {
    stores: Stores;
  }
}