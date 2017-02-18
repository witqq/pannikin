import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {observer, inject} from "mobx-react";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import {Stores, gameStore} from "../../stores";
import {appHistory} from "../app-history";
import TextField from "material-ui/TextField";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import FormEvent = React.FormEvent;

export interface GameViewProps extends Stores {

}

export interface GameViewState {

}

@inject(gameStore)
@observer
export class GameView extends Component<GameViewProps, GameViewState> {

  private onAddPlayer = () => {
    appHistory.push("/player");
  };

  private selectPlayer = (id: string) => {
    appHistory.push(`/player/${id}`);
  };

  private onWordsCntChange = (ev: FormEvent<HTMLInputElement>) => {
    const {gameStore} = this.props;
    const wordsCnt = parseInt(ev.currentTarget.value);
    gameStore.setWordCnt(wordsCnt);
  }

  public render() {
    const {gameStore} = this.props;
    return (
        <div>
          <TextField hintText="Количесвто слов"
                     floatingLabelText="Количесвто слов"
                     type="number"
                     value={gameStore.wordsCnt}
                     onChange={this.onWordsCntChange}/>
          <List>
            {(
                gameStore.players.values().map(({name, id}) =>
                    <ListItem key={id}
                              primaryText={name}
                              onClick={() => this.selectPlayer(id)}/>
                )
            )}
          </List>
          <RaisedButton label="Добавить игрока"
                        primary={true}
                        onClick={this.onAddPlayer}/>
        </div>);
  }
}