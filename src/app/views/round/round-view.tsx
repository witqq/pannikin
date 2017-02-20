import * as React from "react";
import {Stores, gameStore, appStore} from "../../../stores";
import {inject, observer} from "mobx-react";
import {TimeLeftView} from "./time-left-view";
import {WordsLeftView} from "./words-left-view";
import {RoundContentView} from "./round-content-view";
import {autorun} from "mobx";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
export interface RoundViewProps extends ClassAttributes<RoundView>,Stores {

}

export interface RoundViewState {

}

@inject(gameStore, appStore)
@observer
export class RoundView extends Component<RoundViewProps, RoundViewState> {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    autorun(() => {
      const roundName = this.props.gameStore.currentRoundName;
      roundName && this.props.appStore.setTitle(roundName);
    });
  }

  public render() {
    try {
      const gameStore = this.props.gameStore;
      const {currentPlayer, currentRound} = gameStore;
      if (!currentPlayer || !currentRound) {
        return <div>Раунд не найден</div>
      }
      return (
          <div>
            <h2>{currentPlayer.name}</h2>
            <h3>{`Команда ${currentPlayer.teamName}`}</h3>
            <TimeLeftView/>
            <WordsLeftView/>
            <RoundContentView/>
          </div>
      );
    }
    catch (e) {
      debugger;
      console.error(e);
      return <div>e</div>
    }
  }
}

