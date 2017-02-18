import {AppStore} from "./app/store/app-store";
import {Game} from "./app/store/game";

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