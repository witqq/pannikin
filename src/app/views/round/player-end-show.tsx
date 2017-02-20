import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";
import {If} from "../../utils/if-component";
import RaisedButton from "material-ui/RaisedButton";
import {WordsResolvedView} from "./words-resolved-view";

export const PlayerEndShowView = inject(gameStore)(
    observer(
        ({gameStore}:Stores) => {
          const {currentRound} = gameStore;
          return (
              <div>
                <WordsResolvedView/>
                <If cond={currentRound.wordIds.length}>
                  <RaisedButton label="Следующий игрок!"
                                onClick={() => gameStore.nextPlayer()}/>
                </If>
                <If cond={!currentRound.wordIds.length}>
                  <div>Раунд завершен
                    <RaisedButton label="Результаты раунда"
                                  onClick={() => gameStore.endRound()}/>
                  </div>
                </If>
              </div>
          );
        }
    )
);