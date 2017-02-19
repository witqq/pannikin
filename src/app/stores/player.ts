import {observable, action, computed} from "mobx";
import {persist} from "mobx-persist/lib";
import {IdName} from "./utils/id-name";
import {Word} from "./word";
import {Game} from "./game";
import {Teams} from "./teams";

export class Player extends IdName {

  constructor(name: string) {
    super(name);
    this.resetResults();
  }

  @action
  resetResults() {
    this.resultsByRound = [new PlayerRoundResults(), new PlayerRoundResults(), new PlayerRoundResults()];

  }

  @persist("list", Word)
  @observable
  words: Array<Word> = [];

  @persist
  @observable
  team: Teams;

  @computed get teamName() {
    return this.team === Teams.Team1 && "1" || "2";
  }

  @persist("list", PlayerRoundResults)
  @observable
  resultsByRound: Array<PlayerRoundResults>;

  @action
  resolveWord(round: number, wordId: string) {
    this.resultsByRound[round].resolvedWords.push(wordId);
  }

}

export const isPlayerValid = (player: Player, gameStore: Game) => {
  return !!player.name && playerWordRemaining(player, gameStore) === 0;
}

export const playerWordRemaining = (player: Player, gameStore: Game): number => {
  return gameStore.wordsCnt - player.words.length;
}

export const addWord = action((player: Player, newWord: string): string|boolean => {
  if (!newWord) {
    return false;
  }
  const index = player.words.findIndex(word =>
      word.name.toLowerCase() === newWord.toLowerCase()
  );
  if (index !== -1) {
    return "Такое слово уже есть";
  }
  player.words.push(new Word(newWord));
  return true;
})

export class PlayerRoundResults {
  @persist
  @observable
  resolvedWords: Array<string> = []
}