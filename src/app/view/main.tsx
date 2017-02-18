import * as React from "react";
import {GameView} from "./game-view";
import {observer, inject} from "mobx-react";
import {Stores, appStore} from "../../stores";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {APP_TITLE} from "../constants/app-constants";

export interface MainProps extends Stores {

}

export interface MainState {

}

@inject(appStore)
@observer
export class Main extends Component<MainProps, MainState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.appStore.setTitle(APP_TITLE);
  }

  public render() {
    return <GameView/>;
  }
}