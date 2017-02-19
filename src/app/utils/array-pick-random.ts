import {randomInt} from "./random-int";

export const arrayPickRandom = <T>(arr: Array<T>): T => {
  if (!arr || !arr.length) {
    return;
  }
  const idx = randomInt(0, arr.length);
  return arr.splice(idx, 1)[0];
}