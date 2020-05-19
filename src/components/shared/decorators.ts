import { Container, decorate, injectable } from 'inversify';
import { ServiceIdentifier } from './types';
import { customElement, LitElement } from 'lit-element';
import { Unsubscribe, Store } from 'redux';
import { SYMBOLS } from '../../ioc/constants.root';

export const METADATA_KEYS = {
  domConsumer: 'altronix/domConsumer',
  domProperty: 'altronix/domProperty'
};

export interface DomPropertyMetadata {
  target: any;
  key: string;
  id: ServiceIdentifier<any>;
}

interface DomProviderArg {
  id: ServiceIdentifier<any>;
  service: any;
}

export interface DomInjectEvent {
  id: ServiceIdentifier<any>;
  service?: any;
}

type Constructor<T> = new (...args: any[]) => T;

export function makeDecorators(container: Container) {
  function lazyInject(serviceIdentifier: ServiceIdentifier<any>) {
    return function(target: any, key: string) {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        set: () => null,
        get: () => container.get(serviceIdentifier)
      });
    };
  }

  function bind(id: ServiceIdentifier<any>) {
    return function<Args extends any[], T extends {}>(
      target: new (...args: Args) => T
    ): new (...args: Args) => T {
      decorate(injectable(), target);
      container
        .bind(id)
        .to(target)
        .inSingletonScope();
      return target;
    };
  }

  function bindTo(id: ServiceIdentifier<any>, to: () => any) {
    return function<Args extends any[], T extends {}>(
      target: new (...args: Args) => T
    ): new (...args: Args) => T {
      decorate(injectable(), target);
      container
        .bind(id)
        .toDynamicValue(to)
        .inSingletonScope();
      return target;
    };
  }

  function connect<S>() {
    return function<T extends Constructor<LitElement>>(target: T) {
      const store = container.get<Store<S>>(SYMBOLS.STORE_SERVICE);
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

  return { lazyInject, bind, bindTo, connect };
}

export function domProvider(el: string, container: Container) {
  return function<T extends { new (...args: any[]): LitElement }>(target: T) {
    class C extends target {
      constructor(...args: any[]) {
        super(...args);

        // Listen for dom inject requests
        this.addEventListener('dom-inject-request', e => {
          let event = e as CustomEvent<DomInjectEvent>;
          let service = container.get(event.detail.id);
          if (service) {
            event.detail.service = container.get(event.detail.id);
            e.stopPropagation();
          }
        });
      }
    }
    customElement(el)(C);
    return C;
  };
}

export function domConsumer(el: string) {
  return function<T extends { new (...args: any[]): LitElement }>(target: T) {
    class C extends target {
      constructor(...args: any[]) {
        super(...args);
      }
      connectedCallback() {
        let meta: DomPropertyMetadata[] =
          Reflect.getMetadata(METADATA_KEYS.domConsumer, target) || [];
        meta.forEach(m => {
          const event = new CustomEvent<DomInjectEvent>('dom-inject-request', {
            composed: true,
            bubbles: true,
            detail: { id: m.id }
          });
          this.dispatchEvent(event);
          if (event.detail.service) {
            Object.defineProperty(this, m.key, {
              writable: false,
              value: event.detail.service
            });
          } else {
            throw new Error(`No dom provider found for ${m.id.toString()}`);
          }
        });
        super.connectedCallback();
      }
    }
    customElement(el)(C);
    return C;
  };
}

export function domInject(id: ServiceIdentifier<any>) {
  return function(target: any, key: string) {
    let list: DomPropertyMetadata[] = [];
    if (!Reflect.hasMetadata(METADATA_KEYS.domConsumer, target.constructor)) {
      Reflect.defineMetadata(
        METADATA_KEYS.domConsumer,
        list,
        target.constructor
      );
    } else {
      list = Reflect.getMetadata(METADATA_KEYS.domConsumer, target.constructor);
    }

    list.push({
      target,
      key,
      id
    });
  };
}
