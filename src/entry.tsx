import * as React from "react";
import {Provider} from "mobx-react";
import {Stores, gameStore} from "./stores";
import {AppStore} from "./app/stores/app-store";
import {Game} from "./app/stores/game";
import {AppRouter} from "./app/app-router";
import "normalize.css/normalize.css";
import {AppSnackBar} from "./app/views/snack-bar/snack-bar-store";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import injectTapEventPlugin = require("react-tap-event-plugin");
import {createPromise} from "./app/utils/create-promise-persist-store";

injectTapEventPlugin();

const persistStorePromise = createPromise();

const promiseGameStore = persistStorePromise(gameStore, new Game());

const stores: Stores = {
  appStore: new AppStore(),
  gameStore: promiseGameStore.store,
  snackBarStore: AppSnackBar
};

promiseGameStore.promise.then(() => {
  stores.appStore.loading = false;
});

window.stores = stores;

export class Entry extends Component<{}, {}> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
        <Provider {...stores}>
          <AppRouter/>
        </Provider>);
  }
}