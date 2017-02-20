import * as React from "react";
import {Stores, gameStore, appStore} from "../../../stores";
import {inject, observer} from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface GameStatsViewProps extends ClassAttributes<GameStatsView>, Stores {

}

export interface GameStatsViewState {

}

@inject(gameStore, appStore)
@observer
export class GameStatsView extends Component<GameStatsViewProps, GameStatsViewState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.appStore.setTitle("Игра окончена");
  }

  private onStartNewGame = () => {
    this.props.gameStore.reset();
  };

  public render() {
    const gameStore = this.props.gameStore;
    return (
        <div>
          <h1>Команда1</h1>
          <h3> отгадано <span>{gameStore.team1GameResults}</span></h3>
          <h1>Команда2</h1>
          <h3> отгадано <span>{gameStore.team2GameResults}</span></h3>
          <h2>Игра окончена</h2>
          <RaisedButton label="Новая игра"
                        primary={true}
                        onClick={this.onStartNewGame}/>
        </div>
    );
  }
}