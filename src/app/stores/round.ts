import {persist} from "mobx-persist/lib";
import {observable} from "mobx";
import {Teams} from "./teams";
import {Game} from "./game";
import {randomInt} from "../utils/random-int";

export class Round {

  constructor(game: Game) {
    this.wordIds = game.allWords.map(word => word.id);

    this.currentTeam = randomInt(0, 2);
  }

  @persist('list')
  @observable
  wordIds: Array<string>;

  @persist
  @observable
  currentTeam: Teams;

}

export class TeamPlayers {
  @persist('list')
  @observable
  playerIds: Array<string> = [];
}
