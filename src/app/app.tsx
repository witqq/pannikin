import * as React from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Stores, appStore, gameStore} from "../stores";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import {APP_TITLE} from "./constants/app-constants";
import {appHistory} from "./app-history";
import "./app.less";
import "./flex-container.less";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import Component = React.Component;

export interface AppProps extends Stores, RouteComponentProps<{}, {}> {

}

export interface AppState {
}

@inject(appStore, gameStore)
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
  };

  private onReset = () => {
    this.props.gameStore.reset();
    this.goHome();
  }

  private getRightButton() {
    let iconButtonElement = (
        <IconButton>
          <MoreVertIcon/>
        </IconButton>
    )
    return (
        <IconMenu iconButtonElement={iconButtonElement}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem primaryText="Начать новую игру"
                    onClick={this.onReset}/>
        </IconMenu>
    )
  }

  render() {
    const {appStore} = this.props;
    return (
        <MuiThemeProvider>
          <div className="flex-container">
            <AppBar title={appStore.title}
                    onTitleTouchTap={this.goHome}
                    titleStyle={{cursor:"pointer"}}
                    className="app-bar flex-container-header"
                    iconElementRight={this.getRightButton()}/>
            <div className="app-container flex-container-content">
              {this.props.children}
            </div>
          </div>
        </MuiThemeProvider>
    );
  }
}