import {observable, action} from "mobx";

export class AppStore {
  @observable
  title: string;

  @observable
  loading = true;

  @action
  setTitle(title: string) {
    this.title = title;
  }
}