import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";

export const WordsLeftView = inject(gameStore)(
    observer(
        ({gameStore}:Stores) => {
          const currentRound = gameStore.currentRound;
          if (!currentRound) {
            return null;
          }
          return (
              <h3>Осталось слов: <span>{currentRound.wordIds.length}</span></h3>);
        }
    )
);