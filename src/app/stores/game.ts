import {observable, ObservableMap, action, computed} from "mobx";
import {Player, isPlayerValid} from "./player";
import {StringMap} from "../utils/maps";
import {persist} from "mobx-persist/lib";
import {GameState} from "./game-states";
import {AppSnackBar} from "../views/snack-bar/snack-bar-store";
import {arrayPickRandom} from "../utils/array-pick-random";

export const WORDS_COUNT = 5;
export class Game {

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.wordsCnt = WORDS_COUNT;
    this.players = new ObservableMap({} as StringMap<Player>);
    this.state = GameState.Settings;
    this.team1 = [];
    this.team2 = [];
  }

  @persist
  @observable
  wordsCnt;

  @persist
  @observable
  state: GameState;

  @persist("map", Player)
  @observable
  players: ObservableMap<Player>;

  @persist("list", Player)
  @observable
  team1: Array<Player>;

  @persist("list", Player)
  @observable
  team2: Array<Player>;

  @action
  setPlayer(player: Player) {
    this.players.set(player.id, player);
  }

  @action
  setWordCnt(wordsCnt: number) {
    this.wordsCnt = wordsCnt;
  }

  @action
  startGame() {
    if (!this.canStart) {
      AppSnackBar.setMessage("Заполните все необходимы настройки для анчала игры");
      return;
    }
    this.state = GameState.Commands;
    const players = this.players.values();
    const team1: Array<Player> = [];
    const team2: Array<Player> = [];
    while (players.length) {
      const player1 = arrayPickRandom(players);
      const player2 = arrayPickRandom(players);
      player1 && team1.push(player1);
      player2 && team2.push(player2);
    }
    this.team1 = team1;
    this.team2 = team2;
  }

  @action
  reset() {
    this.initialize();
  }

  @computed get canStart() {
    if (this.players.keys().length < 3) {
      return false;
    }
    return !this.players.values().some(player => !isPlayerValid(player, this))
  }
}
