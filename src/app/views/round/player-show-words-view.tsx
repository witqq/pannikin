import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";
import {WordsResolvedView} from "./words-resolved-view";
import ActionDone from "material-ui/svg-icons/action/done";
import FloatingActionButton from "material-ui/FloatingActionButton";
import "./player-show-words-view.less";

export const PlayerShowWordsView = inject(gameStore)(
  observer(
    ({gameStore}: Stores) => {

      return (
        <div>
          <WordsResolvedView/>
          <h4>Слово:</h4>
          <h4>{gameStore.currentWord}</h4>
          <FloatingActionButton iconStyle={{width: "100px", height: "100px", backgroundColor: "green"}}
                                style={{display: "table"}}
                                className="resolve-word-button"
                                onClick={() => gameStore.resolveCurrentWord()}
                                disabled={gameStore.resolveButtonDisabled}>
            <ActionDone/>
          </FloatingActionButton>
        </div>
      );
    }
  )
);

