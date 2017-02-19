import {observable, ObservableMap, action, computed} from "mobx";
import {Player, isPlayerValid} from "./player";
import {StringMap} from "../utils/maps";
import {persist} from "mobx-persist/lib";

export const WORDS_COUNT = 5;
export class Game {

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.wordsCnt = WORDS_COUNT;
    this.players = new ObservableMap({} as StringMap<Player>);
  }

  @persist
  @observable
  wordsCnt;

  @persist("map", Player)
  @observable
  players: ObservableMap<Player>;

  @action
  setPlayer(player: Player) {
    this.players.set(player.id, player);
  }

  @action
  setWordCnt(wordsCnt: number) {
    this.wordsCnt = wordsCnt;
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
