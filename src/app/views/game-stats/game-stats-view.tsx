import * as React from "react";
import {Stores, gameStore, appStore} from "../../../stores";
import {inject, observer} from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface GameStatsViewProps extends ClassAttributes<GameStatsView>, Stores {

}

export interface GameStatsViewState {

}

@inject(gameStore, appStore)
@observer
export class GameStatsView extends Component<GameStatsViewProps, GameStatsViewState> {

  componentWillMount() {
    this.props.appStore.setTitle("Игра окончена");
  }

  private onStartNewGame = () => {
    this.props.gameStore.reset();
  };

  public render() {
    const gameStore = this.props.gameStore;
    return (
      <Card style={{padding: 14, margin: 14}}>
        <h1>Команда1</h1>
        <h3> отгадано <span>{gameStore.team1GameResults}</span></h3>
        <h1>Команда2</h1>
        <h3> отгадано <span>{gameStore.team2GameResults}</span></h3>
        <h2>Игра окончена</h2>
        <RaisedButton label="Новая игра"
                      primary={true}
                      onClick={this.onStartNewGame}/>
      </Card>
    );
  }
}