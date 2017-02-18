import {observable} from "mobx";
import * as uuid from "uuid";
import {persist} from "mobx-persist/lib";
export class Player {

  constructor(name: string) {
    this.id = uuid.v4();
    this.name = name;
  }

  @persist
  id: string;

  @persist
  @observable
  name: string = "";

  @persist("list")
  @observable
  words: Array<string> = [];
}