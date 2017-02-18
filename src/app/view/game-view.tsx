import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {AppHistory} from "../app-router";
import {observer, inject} from "mobx-react";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import {Stores, gameStore} from "../../stores";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface GameViewProps extends Stores {

}

export interface GameViewState {

}

@inject(gameStore)
@observer
export class GameView extends Component<GameViewProps, GameViewState> {

  private onAddPlayer = () => {
    AppHistory.push("/player");
  };

  private selectPlayer = (id: string) => {
    AppHistory.push(`/player/${id}`);
  };

  public render() {
    const {gameStore} = this.props;
    return (
        <div>
          <List>
            {(
                gameStore.players.values().map(({name, id}) =>
                    <ListItem key={id}
                              primaryText={name}
                              onClick={() => this.selectPlayer(id)}/>
                )
            )}
          </List>
          < RaisedButton label="Добавить игрока"
                         primary={true}
                         onClick={this.onAddPlayer}/>
        </div>);
  }
}