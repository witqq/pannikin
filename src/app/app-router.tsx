import * as React from "react";
import {Router, Route, IndexRoute, Redirect} from "react-router";
import {App} from "./app";
import {Main} from "./view/main";
import {PlayerView} from "./view/player-view";
import {appHistory} from "./app-history";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface AppRouterProps extends ClassAttributes<AppRouter> {

}

export interface AppRouterState {

}

export class AppRouter extends Component<AppRouterProps, AppRouterState> {

  public render() {
    return <Router history={appHistory}>
      <Route path='/'
             component={App}>
        <IndexRoute component={Main}/>
        <Route path="/player(/:id)"
               component={PlayerView}/>
      </Route>
      <Redirect from="*"
                to="/"/>
    </Router>;
  }
}