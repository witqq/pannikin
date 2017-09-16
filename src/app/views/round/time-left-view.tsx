import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {observer, inject} from "mobx-react";

export const TimeLeftView = inject(gameStore)(
  observer(
    ({gameStore}: Stores) => {
      return (
        <h3>Осталось времени: <span>{gameStore.timeLeft}</span></h3>);
    }
  )
);

