import {observable, action} from "mobx";

export class AppStore {
  @observable
  title: string;

  @action
  setTitle(title: string) {
    this.title = title;
  }
}