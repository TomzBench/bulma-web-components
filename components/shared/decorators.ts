import { Container, decorate, injectable } from 'inversify';
import { ServiceIdentifier } from './types';

export function makeDecorator(container: Container) {
  function domInject(serviceIdentifier: ServiceIdentifier<any>) {
    return function(proto: any, key: string) {
      Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        set: () => null,
        get: () => container.get(serviceIdentifier)
      });
    };
  }

  function service(id: ServiceIdentifier<any>) {
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

  return { domInject, service };
}
