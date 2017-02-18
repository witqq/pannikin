import {observable} from "mobx";
import * as uuid from "uuid";
export class Player {

  constructor(name: string) {
    this.id = uuid.v4();
    this.name = name;
  }

  id: string;

  @observable
  name: string = "";

  @observable
  words: Array<string> = [];
}