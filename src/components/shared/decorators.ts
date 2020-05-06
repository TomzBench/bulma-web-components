import { Container, decorate, injectable } from 'inversify';
import { ServiceIdentifier } from './types';

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

  return { lazyInject, bind };
}

export const METADATA_KEYS = {
  domConsumer: 'altronix/domConsumer',
  domProperty: 'altronix/domProperty'
};

export interface DomPropertyMetadata {
  target: any;
  key: string;
  id: ServiceIdentifier<any>;
}

export function domInject(id: ServiceIdentifier<any>) {
  return function(target: any, key: string) {
    let list: DomPropertyMetadata[] = [];
    if (!Reflect.hasMetadata(METADATA_KEYS.domConsumer, target.constructor)) {
      // TODO - override connectedCallback()
      Reflect.defineMetadata(
        METADATA_KEYS.domConsumer,
        list,
        target.constructor
      );
      let original = target.constructor.prototype.connectedCallback;
      Object.defineProperty(target.constructor.prototype, 'connectedCallback', {
        writable: false,
        value: () => {
          original();
          console.log('OVERRIDE');
        }
      });
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
