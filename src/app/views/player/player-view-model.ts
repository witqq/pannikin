import {Player} from "../../stores/player";
import {IViewModel, createViewModel} from "mobx-utils";
import {observable} from "mobx";

export type PlayerViewModel = Player & IViewModel<Player>;

export function playerViewModel(player: Player): PlayerViewModel {
  if (!player) {
    return;
  }
  const res = createViewModel(player);
  res.words = observable.array(player.words);
  return res;
}