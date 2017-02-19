import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {inject, observer} from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import {TimeLeftView, WordsLeftView} from "./time-left-view";
import {If} from "../../utils/if-component";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface RoundViewProps extends ClassAttributes<RoundView>,Stores {

}

export interface RoundViewState {

}

@inject(gameStore)
@observer
export class RoundView extends Component<RoundViewProps, RoundViewState> {

  constructor(props) {
    super(props);
  }

  private startShowWords = () => {
    const gameStore = this.props.gameStore;
    gameStore.startShowWords();
  };

  private onWordResolve = () => {
    const gameStore = this.props.gameStore;

    gameStore.resolveCurrentWord();
  };

  private onNextPlayer = () => {
    const gameStore = this.props.gameStore;
    gameStore.nextPlayer();
  };

  private getContent() {
    const gameStore = this.props.gameStore;
    const {currentPlayerStartedTime, currentPlayerStarted, currentRound} = gameStore;
    if (!currentPlayerStartedTime && !currentPlayerStarted) {
      return <RaisedButton label="Поехали!"
                           onClick={this.startShowWords}/>
    }
    else if (currentPlayerStartedTime) {
      return (
          <div>
            <h3>Отгадано <span>{gameStore.currentPlayerWordsResolve}</span> слов(а)</h3>
            <h4>Слово:</h4>
            <h4>{gameStore.currentWord}</h4>
            <RaisedButton label="Отгадали!"
                          onClick={this.onWordResolve}/>
          </div>
      );
    }
    else {
      return (
          <div>
            <h3>Отгадано <span>{gameStore.currentPlayerWordsResolve}</span> слов(а)</h3>
            <If cond={currentRound.wordIds.length}>
              <RaisedButton label="Следующий игрок!"
                            onClick={this.onNextPlayer}/>
            </If>
            <If cond={!currentRound.wordIds.length}>
              <div> Раунд завершен</div>
            </If>
          </div>
      )
    }

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
            {this.getContent()}
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

