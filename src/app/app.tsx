import * as React from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Stores, appStore} from "../stores";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import {APP_TITLE} from "./constants/app-constants";
import Component = React.Component;
import {appHistory} from "./app-history";

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

  componentWillMount() {
    this.props.appStore.setTitle(APP_TITLE);
  }

  private goHome = () => {
    const currentPath = appHistory.getCurrentLocation().pathname;
    if (currentPath !== "/") {
      appHistory.push("/");
    }
  }

  render() {
    const {appStore} = this.props;
    return (
        <MuiThemeProvider>
          <div>
            <AppBar title={appStore.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onTitleTouchTap={this.goHome}
                    titleStyle={{cursor:"pointer"}}/>
            {this.props.children}
          </div>
        </MuiThemeProvider>
    );
  }
}