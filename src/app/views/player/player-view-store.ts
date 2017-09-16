import {playerViewModel} from "./player-view-model";
import {PlayerViewProps} from "./player-view";
import {observable, action, computed} from "mobx";
import {Player, addWord, isPlayerValid, playerWordRemaining} from "../../stores/player";
import {Game} from "../../stores/game";
import {AppSnackBar} from "../snack-bar/snack-bar-store";

export class PlayerViewStore {

  constructor(props: PlayerViewProps) {
    this.id = props.match.params.id;
    this.gameStore = props.gameStore;
    this.isNew = !this.id;
  }

  private id: string;

  @observable
  isNew = false;

  @observable
  word = "";

  @observable
  gameStore: Game;

  @computed
  get player() {
    const id = this.id;
    const players = this.gameStore.players;
    let player: Player;
    if (id) {
      player = players.get(id);
    }
    else {
      player = new Player(`Игрок ${players.keys().length + 1}`);
    }
    return playerViewModel(player);
  }

  @computed
  get isValid() {
    return isPlayerValid(this.player, this.gameStore);
  }

  @computed
  get wordsRemaining() {
    return playerWordRemaining(this.player, this.gameStore);
  }

  @action
  addPlayer() {
    const player = this.player;
    player.submit();
    if (this.isNew) {
      this.gameStore.setPlayer(player.model);
    }
  }

  @action
  setWord(word: string) {
    this.word = word;
  }

  @action
  addWord() {
    const res = addWord(this.player, this.word);
    if (res !== true) {
      if (typeof res === "string") {
        AppSnackBar.setMessage(res);
      }
      return;
    }
    this.word = "";
  }

}