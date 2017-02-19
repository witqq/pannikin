import {observable, action} from "mobx";
import {persist} from "mobx-persist/lib";
import {IdName} from "./utils/id-name";
import {Word} from "./word";
import {Game} from "./game";

export class Player extends IdName {

  @persist("list", Word)
  @observable
  words: Array<Word> = [];

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