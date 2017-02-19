import * as React from "react";
import {observer, inject} from "mobx-react";
import {gameStore, Stores} from "../../../stores";
import RaisedButton from "material-ui/RaisedButton";
import {GameState} from "../../stores/game-states";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface CommandsViewProps extends ClassAttributes<CommandsView>, Stores {

}

export interface CommandsViewState {

}

@inject(gameStore)
@observer
export class CommandsView extends Component<CommandsViewProps, CommandsViewState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  private onGoSettings = () => {
    this.props.gameStore.state = GameState.Settings;
  };

  public render() {
    return (
        <div>
          <h1>Комманда1</h1>
          {this.props.gameStore.team1.map(({name, id}) => (
              <div key={id}>{name}</div>
          ))}
          <h1>Комманда2</h1>
          {this.props.gameStore.team2.map(({name, id}) => (
              <div key={id}>{name}</div>
          ))}
          <RaisedButton label="Вернутся в настройки игры"
                        primary={true}
                        onClick={this.onGoSettings}/>
        </div>);
  }
}