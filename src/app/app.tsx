import * as React from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Stores, appStore} from "../stores";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import Component = React.Component;

export interface AppProps extends Stores, RouteComponentProps<{}, {}> {

}

export interface AppState {
}

@inject(appStore)
@observer
export class App extends Component<AppProps, AppState> {

  private showModal = () => {
    this.props.router.push("/showModal");
  }

  render() {
    const {appStore} = this.props;
    return (
        <MuiThemeProvider>
          <div>
            <AppBar title={appStore.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            {this.props.children}
          </div>
        </MuiThemeProvider>
    );
  }
}