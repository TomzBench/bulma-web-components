import { Container, decorate, injectable } from 'inversify';
import { ServiceIdentifier } from './types';

export const METADATA_KEYS = {
  domConsumer: 'altronix/domConsumer',
  domProperty: 'altronix/domProperty'
};

export interface DomPropertyMetadata {
  target: any;
  key: string;
  id: ServiceIdentifier<any>;
}

interface Connectable extends HTMLElement {
  connectedCallback(): void;
}

interface DomProviderArg {
  id: ServiceIdentifier<any>;
  service: any;
}

export interface DomInjectEvent {
  id: ServiceIdentifier<any>;
  service?: any;
}

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

  function domProvider() {
    return function<T extends { new (...args: any[]): HTMLElement }>(
      target: T
    ) {
      class C extends target {
        constructor(...args: any[]) {
          super(...args);
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
      return C;
    };
  }

  function domConsumer() {
    return function<T extends { new (...args: any[]): Connectable }>(
      target: T
    ) {
      decorate(injectable(), target);
      class C extends target {
        constructor(...args: any[]) {
          super(...args);
        }
        connectedCallback() {
          let meta: DomPropertyMetadata[] =
            Reflect.getMetadata(METADATA_KEYS.domConsumer, target) || [];
          meta.forEach(m => {
            const event = new CustomEvent<DomInjectEvent>(
              'dom-inject-request',
              {
                composed: true,
                bubbles: true,
                detail: { id: m.id }
              }
            );
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
      return C;
    };
  }

  function domInject(id: ServiceIdentifier<any>) {
    return function(target: any, key: string) {
      let list: DomPropertyMetadata[] = [];
      if (!Reflect.hasMetadata(METADATA_KEYS.domConsumer, target.constructor)) {
        Reflect.defineMetadata(
          METADATA_KEYS.domConsumer,
          list,
          target.constructor
        );
      } else {
        list = Reflect.getMetadata(
          METADATA_KEYS.domConsumer,
          target.constructor
        );
      }

      list.push({
        target,
        key,
        id
      });
    };
  }

  return { lazyInject, bind, domProvider, domConsumer, domInject };
}
