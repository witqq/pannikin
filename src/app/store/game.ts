import {observable, ObservableMap, action} from "mobx";
import {Player} from "./player";
import {StringMap} from "../utils/maps";
import {persist} from "mobx-persist/lib";

export class Game {

  @persist
  @observable
  wordsCnt = 5;

  @persist("map", Player)
  @observable
  players: ObservableMap<Player> = new ObservableMap({} as StringMap<Player>);

  @action
  setPlayer(player: Player) {
    this.players.set(player.id, player);
  }

  @action
  setWordCnt(wordsCnt:number){
    this.wordsCnt=wordsCnt;
  }

}
