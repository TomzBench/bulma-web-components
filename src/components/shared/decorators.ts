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

  return { lazyInject, /*consumer,*/ bind };
}
