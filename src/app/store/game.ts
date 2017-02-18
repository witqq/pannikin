import {observable, ObservableMap, action} from "mobx";
import {Player} from "./player";
import {StringMap} from "../utils/maps";

export class Game {

  @observable
  wordsCnt = 5;

  @observable
  players: ObservableMap<Player> = new ObservableMap({} as StringMap<Player>);

  @action
  setPlayer(player: Player) {
    this.players.set(player.id, player);
  }

}
