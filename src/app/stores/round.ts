import {persist} from "mobx-persist/lib";
import {observable, action} from "mobx";
import {Game} from "./game";
import {randomInt} from "../utils/random-int";

export class Round {

  constructor(game: Game) {
    if (game) {
      this.wordIds = Object.keys(game.allWords);
    }
  }

  @persist("list")
  @observable
  wordIds: Array<string>;

  @persist
  @observable
  currentWordId: string;

  @action
  pickWord() {
    const wordIds = this.wordIds;
    const currentWordId = this.currentWordId;
    if (currentWordId) {
      wordIds.splice(wordIds.indexOf(currentWordId), 1);
    }
    this.currentWordId = wordIds[randomInt(0, wordIds.length)]
  }

  @action
  dropWord() {
    this.currentWordId = null;
  }

}

export class TeamPlayers {
  @persist("list")
  @observable
  playerIds: Array<string> = [];
}
