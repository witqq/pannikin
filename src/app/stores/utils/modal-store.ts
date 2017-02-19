import {observable, action} from "mobx";

export class ModalStore {
  @observable
  modalOpen = false;

  @action
  showModal() {
    this.modalOpen = true;
  }

  @action
  hideModal() {
    this.modalOpen = false;
  }
}