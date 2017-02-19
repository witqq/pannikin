import * as React from "react";
import {GameSettingsView} from "../game-settings/game-settings-view";
import {observer, inject} from "mobx-react";
import {Stores, appStore, gameStore} from "../../../stores";
import {APP_TITLE} from "../../constants/app-constants";
import {GameState} from "../../stores/game-states";
import {CommandsView} from "../commands/commands-view";
import {RoundView} from "../round/round-view";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface MainViewProps extends Stores {

}

export interface MainViewState {

}

@inject(appStore, gameStore)
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
    switch (this.props.gameStore.state) {
      case GameState.Settings:
        return  <GameSettingsView/>;
      case GameState.Commands:
        return <CommandsView/>;
      case GameState.Play:
        // return <div>asdasd</div>;
        return <RoundView/>;
      default:
        return <div>Что-то пошло не так</div>;
    }
  }
}