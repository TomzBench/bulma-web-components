import { Unsubscribe, Store } from 'redux';
import { LitElement } from 'lit-element';
type Constructor<T> = new (...args: any[]) => T;

export function connect<S>(store: Store<S>) {
  return function<T extends Constructor<LitElement>>(target: T) {
    return class extends target {
      store = store;
      _storeUnsubscribe!: Unsubscribe;
      connectedCallback() {
        super.connectedCallback();
        this._storeUnsubscribe = this.store.subscribe(() => {
          this.stateChanged(store.getState());
        });
      }
      disconnectedCallback() {
        this._storeUnsubscribe();
        super.disconnectedCallback();
      }

      stateChanged(s: S) {}
    };
  };
}
