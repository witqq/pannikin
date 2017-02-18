import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer, inject} from "mobx-react";
import {Player} from "../store/player";
import {Stores, gameStore, appStore} from "../../stores";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {autorun, observable} from "mobx";
import {createViewModel, IViewModel} from "mobx-utils";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import FormEvent = React.FormEvent;
import {appHistory} from "../app-history";

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

  private player: Player& IViewModel<Player>;

  @observable
  isNew = false;

  constructor(props) {
    super(props);
    this.state = {};
    const id = this.props.params.id;
    const players = this.props.gameStore.players;
    let player: Player;
    if (id) {
      player = players.get(id);
      this.isNew = false;
    }
    else {
      player = new Player(`Игрок ${players.keys().length + 1}`);
      this.isNew = true;
    }

    if (player) {
      this.player = createViewModel(player);
    }
  }

  componentWillMount() {
    autorun(() => this.player && this.props.appStore.setTitle(this.player.name));
  }

  private onNameChange = (ev: FormEvent<HTMLInputElement>) => {
    this.player.name = ev.currentTarget.value;
  };

  private onAdd = () => {
    const player = this.player;
    player.submit();
    if (this.isNew) {
      this.props.gameStore.setPlayer(this.player.model);
    }
    appHistory.replace("/");
  };

  public render() {
    if (!this.player) {
      return <div>Игрок не найден</div>
    }
    const submitLabel = this.isNew && "Добавить игрока" || "Сохранить";
    return (
        <div>
          <TextField hintText="Твое Имя"
                     floatingLabelText="Твое Имя"
                     value={this.player.name}
                     onChange={this.onNameChange}
                     ref={ref => ref && ref.focus()}/>
          <RaisedButton label={submitLabel}
                        primary={true}
                        fullWidth={true}
                        onClick={this.onAdd}
                        disabled={!this.player.name}/>
        </div>);
  }
}