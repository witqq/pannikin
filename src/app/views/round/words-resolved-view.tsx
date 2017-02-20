import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";

export const WordsResolvedView = inject(gameStore)(
    observer(
        ({gameStore}:Stores) => {
          return (
              <h3>Отгадано <span>{gameStore.currentPlayerWordsResolve}</span> слов(а)</h3>);
        }
    )
);