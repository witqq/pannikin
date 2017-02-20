import * as React from "react";
import {inject, observer} from "mobx-react";
import {gameStore, Stores} from "../../../stores";
import {RaisedButton} from "material-ui";
import {If} from "../../utils/if-component";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface RoundStatsViewProps extends ClassAttributes<RoundStatsView>, Stores {

}

export interface RoundStatsViewState {

}

@inject(gameStore)
@observer
export class RoundStatsView extends Component<RoundStatsViewProps, RoundStatsViewState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  private onNextRound = () => {
    this.props.gameStore.startNextRound();
  };

  private onFinishGame = () => {
    this.props.gameStore.finishGame();
  };

  public render() {
    const gameStore = this.props.gameStore;
    return (
        <div>
          <h1>Команда1</h1>
          <h3> отгадано <span>{gameStore.team1PlayersCurrRoundResults}</span></h3>
          <h1>Команда2</h1>
          <h3> отгадано <span>{gameStore.team2PlayersCurrRoundResults}</span></h3>
          <If cond={!gameStore.isGameEnd}>
            <RaisedButton label="Следующий раунд"
                          primary={true}
                          onClick={this.onNextRound}/>
          </If>
          <If cond={gameStore.isGameEnd}>
            <div><h2>Игра окончена</h2>
              <RaisedButton label="Результаты"
                            primary={true}
                            onClick={this.onFinishGame}/>
            </div>
          </If>
        </div>
    );
  }
}