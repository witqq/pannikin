import * as React from "react";
import {Stores, gameStore} from "../../../stores";
import {inject, observer} from "mobx-react";
import {Round} from "../../stores/round";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface RoundViewProps extends ClassAttributes<RoundView>,Stores {

}

export interface RoundViewState {

}

@inject(gameStore)
@observer
export class RoundView extends Component<RoundViewProps, RoundViewState> {
  private round: Round;

  constructor(props) {
    super(props);
    // TODO remove
    this.round=new Round(props.gameStore);
    this.state = {};
  }

  public render() {
    return <div></div>;
  }
}