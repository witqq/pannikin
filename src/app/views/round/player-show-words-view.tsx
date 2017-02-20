import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import {WordsResolvedView} from "./words-resolved-view";

export const PlayerShowWordsView = inject(gameStore)(
    observer(
        ({gameStore}:Stores) => {

          return (
              <div>
                <WordsResolvedView/>
                <h4>Слово:</h4>
                <h4>{gameStore.currentWord}</h4>
                <RaisedButton label="Отгадали!"
                              onClick={() => gameStore.resolveCurrentWord()}/>
              </div>
          );
        }
    )
);

