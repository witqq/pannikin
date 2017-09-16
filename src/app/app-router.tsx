import * as React from "react";
import {Route} from "react-router";
import {App} from "./app";
import {HashRouter} from "react-router-dom";
import Component = React.Component;
import ClassAttributes = React.ClassAttributes;

export interface AppRouterProps extends ClassAttributes<AppRouter> {

}

export interface AppRouterState {

}

export class AppRouter extends Component<AppRouterProps, AppRouterState> {

  public render() {
    return (
      <HashRouter>
        <Route path="*" component={App}/>
      </HashRouter>);
  }
}