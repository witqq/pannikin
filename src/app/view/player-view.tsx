import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer, inject} from "mobx-react";
import {Player} from "../store/player";
import {Stores, gameStore, appStore} from "../../stores";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {AppHistory} from "../app-router";
import {autorun} from "mobx";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import FormEvent = React.FormEvent;

export interface PlayerViewParams {
  id?: string;
}

export interface PlayerViewProps extends RouteComponentProps<PlayerViewParams, any>, Stores {

}

export interface PlayerViewState {

}

@inject(gameStore, appStore)
@observer
export class PlayerView extends Component<PlayerViewProps, PlayerViewState> {

  private player: Player;

  constructor(props) {
    super(props);
    this.state = {};
    const id = this.props.params.id;
    const players = this.props.gameStore.players;
    if (id) {
      this.player = players.get(id)
    }
    else {
      this.player = new Player(`Игрок ${players.keys().length + 1}`);
    }

  }

  componentWillMount() {
    autorun(() => this.props.appStore.setTitle(this.player.name));
  }

  private onNameChange = (ev: FormEvent<HTMLInputElement>) => {
    this.player.name = ev.currentTarget.value;
  };

  private onAdd = () => {
    this.props.gameStore.setPlayer(this.player);
    AppHistory.replace("/");
  };

  public render() {
    return (
        <div>
          <TextField hintText="Твое Имя"
                     floatingLabelText="Твое Имя"
                     value={this.player.name}
                     onChange={this.onNameChange}
                     ref={ref => ref && ref.focus()}/>
          <RaisedButton label="Добавить игрока"
                        primary={true}
                        fullWidth={true}
                        onClick={this.onAdd}
                        disabled={!this.player.name}/>
        </div>);
  }
}