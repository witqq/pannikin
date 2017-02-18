import {observable, action} from "mobx";

export class AppStore {

  @observable
  title: string;

  @observable
  selectedIndex = 0;

  @action
  setTitle(title: string) {
    this.title = title;
  }

  @action
  setSelectedIndex(index: number) {
    this.selectedIndex = index;
  }
}