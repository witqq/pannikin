import {AppStore} from "./app/stores/app-store";
import {Game} from "./app/stores/game";

export const appStore = "appStore";

export const gameStore = "gameStore";

export interface Stores {
  appStore?: AppStore;
  gameStore?: Game;
}

declare global {
  interface Window {
    stores: Stores;
  }
}