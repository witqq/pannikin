import * as React from "react";
import {Stores, snackBarStore} from "../../../stores";
import {observer, inject} from "mobx-react";
import Snackbar from "material-ui/Snackbar";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface SnackBarViewProps extends ClassAttributes<SnackBarView>, Stores {

}

export interface SnackBarViewState {

}

@inject(snackBarStore)
@observer
export class SnackBarView extends Component<SnackBarViewProps, SnackBarViewState> {

  public render() {
    const snackBarStore = this.props.snackBarStore;
    const message = snackBarStore.message;
    return <Snackbar open={!!message}
                     message={message}
                     autoHideDuration={4000}
                     onRequestClose={() => snackBarStore.clearMessage()}/>;
  }
}