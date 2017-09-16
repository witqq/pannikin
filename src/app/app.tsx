import * as React from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Stores, appStore, gameStore} from "../stores";
import {inject, observer} from "mobx-react";
import {Switch, Route, Redirect, RouteComponentProps} from "react-router";
import {APP_TITLE} from "./constants/app-constants";
import "./app.less";
import "./flex-container.less";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import {SnackBarView} from "./views/snack-bar/snack-bar-view";
import DevTools from "mobx-react-devtools";
import {If} from "./utils/if-component";
import {Main} from "./views/main/main-view";
import {PlayerView} from "./views/player/player-view";
import {getMuiTheme, darkBaseTheme} from "material-ui/styles";
import Paper from "material-ui/Paper";
import Component = React.Component;

export interface AppProps extends Stores, RouteComponentProps<{}> {

}

export interface AppState {
}

@inject(appStore, gameStore)
@observer
export class App extends Component<AppProps, AppState> {

  componentWillMount() {
    this.props.appStore.setTitle(APP_TITLE);
  }

  private goHome = () => {
    const {history, location} = this.props;
    const currentPath = location.pathname;
    if (currentPath !== "/") {
      history.push("/");
    }
  };

  private onReset = () => {
    this.props.gameStore.reset();
    this.goHome();
  };

  private createTest = () => {
    this.props.gameStore.createTestData();
  };

  private getRightButton() {
    let iconButtonElement = (
      <IconButton>
        <MoreVertIcon/>
      </IconButton>
    )
    return (
      <IconMenu iconButtonElement={iconButtonElement}
                targetOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "top"}}>
        <MenuItem primaryText="Начать новую игру"
                  onClick={this.onReset}/>
        <MenuItem primaryText="Тестовые игроки"
                  onClick={this.createTest}/>
      </IconMenu>
    )
  }

  private getContent() {
    const {appStore} = this.props;
    if (appStore.loading) {
      return <div>загрузка</div>
    }
    return (
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/player/:id?" component={PlayerView}/>
        <Redirect path="*" to="/"/>
      </Switch>
    );
  }

  render() {
    const {appStore} = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="flex-container">
          <AppBar title={appStore.title}
                  onTitleTouchTap={this.goHome}
                  titleStyle={{cursor: "pointer"}}
                  className="app-bar flex-container-header"
                  iconElementRight={this.getRightButton()}/>
          <div className="app-container flex-container-content" >
              {this.getContent()}
          </div>
          <SnackBarView/>
          <If cond={"production" !== process.env.NODE_ENV}>
            <DevTools/>
          </If>
        </div>
      </MuiThemeProvider>
    );
  }
}