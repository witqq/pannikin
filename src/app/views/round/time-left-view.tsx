import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";

export const TimeLeftView = inject(gameStore)(
    observer(
        ({gameStore}:Stores) => {
          return (
              <div>
                <h3>Осталось времени: <span>{gameStore.timeLeft}</span></h3>
              </div>);
        }
    )
);

export const WordsLeftView = inject(gameStore)(
    observer(
        ({gameStore}:Stores) => {
          const currentRound = gameStore.currentRound;
          if (!currentRound) {
            return null;
          }
          return (
              <div>
                <h3>Осталось слов: <span>{currentRound.wordIds.length}</span></h3>
              </div>);
        }
    )
);