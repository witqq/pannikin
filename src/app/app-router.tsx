import * as React from "react";
import {Router, hashHistory, Route, IndexRoute, Redirect} from "react-router";
import {App} from "./app";
import {Main} from "./view/main";
import {PlayerView} from "./view/player-view";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface AppRouterProps extends ClassAttributes<AppRouter> {

}

export interface AppRouterState {

}

export const AppHistory = hashHistory;

export class AppRouter extends Component<AppRouterProps, AppRouterState> {

  public render() {
    return <Router history={hashHistory}>
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