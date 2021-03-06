import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {observer, inject} from "mobx-react";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import {Stores, gameStore} from "../../../stores";
import TextField from "material-ui/TextField";
import Card from "material-ui/Card/Card";
import CardActions from "material-ui/Card/CardActions";
import CardText from "material-ui/Card/CardText";
import FloatingActionButton from "material-ui/FloatingActionButton";
import "./game-settings-view.less";
import AvPlayArrow from "material-ui/svg-icons/av/play-arrow";
import {withRouter, RouteComponentProps} from "react-router";
import Component = React.Component;
import FormEvent = React.FormEvent;

export interface GameSettingsViewProps extends Partial<RouteComponentProps<{}>>, Stores {
}

export interface GameSettingsViewState {

}

@inject(gameStore)
@observer
export class GameSettingsView extends Component<GameSettingsViewProps, GameSettingsViewState> {

  private onAddPlayer = () => {
    this.props.history.push("/player");
  };

  private selectPlayer = (id: string) => {
    this.props.history.push(`/player/${id}`);
  };

  private onWordsCntChange = (ev: FormEvent<HTMLInputElement>) => {
    const {gameStore} = this.props;
    const wordsCnt = parseInt(ev.currentTarget.value);
    gameStore.setWordCnt(wordsCnt);
  };

  private onStartClick = () => {
    const {gameStore} = this.props;
    gameStore.startGame();
  }

  public render() {
    const {gameStore} = this.props;
    return (
        <Card expandable={false}
              expanded={true}
              style={{padding: 14, margin: 14}}>
          <CardText expandable={true}>
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
          </CardText>
          <CardActions>
            <RaisedButton label="Добавить игрока"
                          primary={true}
                          onClick={this.onAddPlayer}/>
          </CardActions>
          <FloatingActionButton className="start-game-button"
                                disabled={!gameStore.canStart}
                                onClick={this.onStartClick}>
            <AvPlayArrow />
          </FloatingActionButton>
        </Card>);
  }
}

export const GameSettingsViewWithRouter = withRouter(GameSettingsView);