import * as React from "react";
import {Provider} from "mobx-react";
import {Stores, gameStore} from "./stores";
import {AppStore} from "./app/stores/app-store";
import {Game} from "./app/stores/game";
import {AppRouter} from "./app/app-router";
import "normalize.css/normalize.css";
import {create} from "mobx-persist/lib";
import {AppSnackBar} from "./app/views/snack-bar/snack-bar-store";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import injectTapEventPlugin = require("react-tap-event-plugin");
import DevTools from "mobx-react-devtools";

injectTapEventPlugin();

const persistStore = create();

const stores: Stores = {
  // appStore: persistStore(appStore, new AppStore()),
  appStore: new AppStore(),
  gameStore: persistStore(gameStore, new Game()),
  snackBarStore: AppSnackBar
};

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