import * as React from "react";
import {GameSettingsView} from "../game-settings/game-settings-view";
import {observer, inject} from "mobx-react";
import {Stores, appStore} from "../../../stores";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import {APP_TITLE} from "../../constants/app-constants";

export interface MainViewProps extends Stores {

}

export interface MainViewState {

}

@inject(appStore)
@observer
export class Main extends Component<MainViewProps, MainViewState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.appStore.setTitle(APP_TITLE);
  }

  public render() {
    return <GameSettingsView/>;
  }
}