import { Unsubscribe, Store } from 'redux';
import { LitElement } from 'lit-element';
import { SYMBOLS } from '../ioc/constants.root';
import { domInject, domConsumer } from '../components/shared/decorators';
import { decorate } from 'inversify';
type Constructor<T> = new (...args: any[]) => T;

export function connect<S = {}>() {
  return function<T extends Constructor<LitElement>>(target: T) {
    @domConsumer()
    class C extends target {
      @domInject(SYMBOLS.STORE_SERVICE) store!: Store<S>;
      _storeUnsubscribe!: Unsubscribe;
      connectedCallback() {
        super.connectedCallback();
        this._storeUnsubscribe = this.store.subscribe(() => {
          this.stateChanged(this.store.getState());
        });
      }
      disconnectedCallback() {
        this._storeUnsubscribe();
        super.disconnectedCallback();
      }

      stateChanged(s: S) {}
    }
    return C;
  };
}
