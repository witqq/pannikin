import * as React from "react";
import {Provider} from "mobx-react";
import {Stores} from "./stores";
import {AppStore} from "./app/store/app-store";
import {Game} from "./app/store/game";
import {AppRouter} from "./app/app-router";
import "normalize.css/normalize.css";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

const stores: Stores = {
  appStore: new AppStore(),
  gameStore: new Game()
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