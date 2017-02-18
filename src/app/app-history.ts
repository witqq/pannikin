import {hashHistory} from "react-router";
import {History} from "history";

export interface AppHistory extends History{
  getCurrentLocation?(): Location;
}

export const appHistory: AppHistory = hashHistory;