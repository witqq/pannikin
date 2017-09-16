import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import {PlayerShowWordsView} from "./player-show-words-view";
import {PlayerEndShowView} from "./player-end-show";

export const RoundContentView = inject(gameStore)(
  observer(
    ({gameStore}: Stores) => {
      const {currentPlayerStartedTime, currentPlayerStarted} = gameStore;
      if (!currentPlayerStartedTime && !currentPlayerStarted) {
        return <RaisedButton label="Поехали!"
                             onClick={() => gameStore.startShowWords()}/>
      }
      else if (currentPlayerStartedTime) {
        return <PlayerShowWordsView/>;
      }
      else {
        return <PlayerEndShowView/>
      }
    }
  )
);

