import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer, inject} from "mobx-react";
import {Stores, gameStore, appStore} from "../../../stores";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {autorun, computed} from "mobx";
import {appHistory} from "../../app-history";
import Card from "material-ui/Card/Card";
import CardActions from "material-ui/Card/CardActions";
import CardText from "material-ui/Card/CardText";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Snackbar from "material-ui/Snackbar";
import {PlayerViewStore} from "./player-view-store";
import {If} from "../../utils/if-component";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;
import FormEvent = React.FormEvent;
import KeyboardEvent = React.KeyboardEvent;

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

  private store: PlayerViewStore;

  private wordInput: TextField;
  private nameInput: TextField;

  @computed
  private get player() {
    return this.store && this.store.player;
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.store = new PlayerViewStore(props);
  }

  componentWillMount() {
    autorun(() => {
      const player = this.player;
      player && this.props.appStore.setTitle(player.name);
    });
  }

  private onNameChange = (ev: FormEvent<HTMLInputElement>) => {
    this.player.name = ev.currentTarget.value;
  };

  private onAdd = () => {
    this.store.addPlayer();
    appHistory.replace("/");
  };

  private onWordChange = (ev: FormEvent<HTMLInputElement>) => {
    const word = ev.currentTarget.value;
    this.store.setWord(word);
  };

  private onWordEnter = (ev: KeyboardEvent<{}>) => {
    if (ev.which !== 13) {
      return;
    }
    this.store.addWord();
  };

  private onNameRef = (ref: TextField) => {
    if (!ref) {
      return
    }
    if (!this.nameInput) {
      ref.focus();
    }
    this.nameInput = ref;
  }

  public render() {
    if (!this.player) {
      return <div>Игрок не найден</div>
    }
    const submitLabel = this.store.isNew && "Добавить игрока" || "Сохранить";
    const message = this.store.message;
    const wordsRemaining = this.store.wordsRemaining;
    return (
        <div>
          <Card expandable={false}
                expanded={true}>
            <CardText expandable={true}>
              <TextField hintText="Твое Имя"
                         floatingLabelText="Твое Имя"
                         value={this.player.name}
                         onChange={this.onNameChange}
                         ref={this.onNameRef}/>
              <br/>
              <If cond={wordsRemaining > 0}>
                <TextField ref={ref => this.wordInput = ref}
                           hintText={`Еще ${wordsRemaining} слов(а)`}
                           floatingLabelText={`Еще ${wordsRemaining} слов(а)`}
                           value={this.store.word}
                           onChange={this.onWordChange}
                           onKeyDown={this.onWordEnter}/>
              </If>
              <If cond={wordsRemaining < 0}>
                <span>Убери {-1 * wordsRemaining} лишних слова</span>
              </If>
              <List>
                {(
                    this.player.words.reverse().map(({id, name}) =>
                        <ListItem key={id}
                                  primaryText={name}/>
                    )
                )}
              </List>
            </CardText>
            <CardActions>
              <RaisedButton label={submitLabel}
                            primary={true}
                            fullWidth={true}
                            onClick={this.onAdd}
                            disabled={!this.store.isValid}/>
            </CardActions>
            <Snackbar open={!!message}
                      message={message}
                      autoHideDuration={4000}
                      onRequestClose={() => this.store.clearMessage()}/>
          </Card>
        </div>);
  }
}