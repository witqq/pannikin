import {observable, action} from "mobx";

export class SnackBarStore {
  @observable
  message: string = "";

  @action
  clearMessage() {
    this.message = "";
  }

  @action
  setMessage(message: string) {
    this.message = message;
  }
}

export const AppSnackBar = new SnackBarStore();

