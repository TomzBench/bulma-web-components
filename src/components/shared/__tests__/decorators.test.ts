import { Container } from 'inversify';
import {
  makeDecorators,
  domInject,
  DomPropertyMetadata,
  METADATA_KEYS
} from '../decorators';

test('lazyInject should inject service', () => {
  const TEST_SERVICE_A = Symbol.for('TestServiceA');
  const TEST_SERVICE_B = Symbol.for('TestServiceB');
  const TEST_SERVICE_C = Symbol.for('TestServiceC');
  const container = new Container();
  const { lazyInject, bind } = makeDecorators(container);

  interface Service {
    name: string;
  }

  @bind(TEST_SERVICE_A)
  class ServiceA implements Service {
    name: string = 'ServiceA';
  }
  @bind(TEST_SERVICE_B)
  class ServiceB implements Service {
    name: string = 'ServiceB';
  }
  @bind(TEST_SERVICE_C)
  class ServiceC implements Service {
    name: string = 'ServiceC';
  }

  class Foo {
    @lazyInject(TEST_SERVICE_A)
    serviceA!: Service;
    @lazyInject(TEST_SERVICE_B)
    serviceB!: Service;
    @lazyInject(TEST_SERVICE_C)
    serviceC!: Service;
  }
  let foo = new Foo();
  expect(foo.serviceA.name).toBe('ServiceA');
  expect(foo.serviceB.name).toBe('ServiceB');
  expect(foo.serviceC.name).toBe('ServiceC');
});

test('domInject should add metadata', () => {
  const TEST_SERVICE_A = Symbol.for('TestServiceA');
  const TEST_SERVICE_B = Symbol.for('TestServiceB');
  const TEST_SERVICE_C = Symbol.for('TestServiceC');
  interface Service {
    name: string;
  }

  class Base {
    connectedCallback() {
      console.log('BASE');
    }
  }

  class Foo extends Base {
    @domInject(TEST_SERVICE_A)
    serviceA!: Service;
    @domInject(TEST_SERVICE_B)
    serviceB!: Service;
    @domInject(TEST_SERVICE_C)
    serviceC!: Service;
    connectedCallback() {
      super.connectedCallback();
      console.log('FOO');
    }
  }

  let foo = new Foo();
  let meta: DomPropertyMetadata[] = Reflect.getMetadata(
    METADATA_KEYS.domConsumer,
    foo.constructor
  );
  foo.connectedCallback();
});
