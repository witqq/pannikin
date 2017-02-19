import * as uuid from "uuid";
import {persist} from "mobx-persist/lib";
import {observable} from "mobx";

export class IdName {
  constructor(name: string) {
    this.id = uuid.v4();
    this.name = name;
  }

  @persist
  id: string;

  @persist
  @observable
  name: string = "";
}