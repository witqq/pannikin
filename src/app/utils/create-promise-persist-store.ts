import {optionsType} from "mobx-persist/lib";
import * as Storage from "mobx-persist/lib/storage";
import {action, reaction} from "mobx";
import {serialize, update} from "serializr";
import {mergeObservables} from "mobx-persist/lib/merge-x";

export interface PromiseResult<T> {
  promise: Promise<void>;
  store: T;

}

export function createPromise(options: optionsType = {}) {
  let storage = Storage;
  if (options.storage && options.storage !== window.localStorage) {
    storage = options.storage
  }
  return function persistStore<T extends Object>(key: string, store: T, initialState: any = {}): PromiseResult<T> {
    const promise = storage.getItem(key)
      .then((d: string) => JSON.parse(d))
      .then(action(`[mobx-persist ${key}] LOAD_DATA`, (persisted: any) => {
        if (persisted && typeof persisted === "object") {
          update(store, persisted)
        }
        mergeObservables(store, initialState)
      }))
    reaction(
      () => serialize(store),
      (data: any) => storage.setItem(key, JSON.stringify(data))
    )
    return {promise, store};
  }
}