import { Container } from 'inversify';
import {
  makeDecorators,
  domInject,
  domConsumer,
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

  class Foo {
    @domInject(TEST_SERVICE_A)
    serviceA!: Service;
    @domInject(TEST_SERVICE_B)
    serviceB!: Service;
    @domInject(TEST_SERVICE_C)
    serviceC!: Service;
  }

  let foo = new Foo();
  let meta: DomPropertyMetadata[] = Reflect.getMetadata(
    METADATA_KEYS.domConsumer,
    foo.constructor
  );

  expect(meta.length).toBe(3);
  expect(meta[0].id).toBe(TEST_SERVICE_A);
  expect(meta[0].key).toBe('serviceA');
  expect(meta[0].target).toBe(Foo.prototype);
  expect(meta[1].id).toBe(TEST_SERVICE_B);
  expect(meta[1].key).toBe('serviceB');
  expect(meta[1].target).toBe(Foo.prototype);
  expect(meta[2].id).toBe(TEST_SERVICE_C);
  expect(meta[2].key).toBe('serviceC');
  expect(meta[2].target).toBe(Foo.prototype);
});

test('domConsumer should request services', () => {
  const TEST_SERVICE_A = Symbol.for('TestServiceA');
  const TEST_SERVICE_B = Symbol.for('TestServiceB');
  const TEST_SERVICE_C = Symbol.for('TestServiceC');
  interface Service {
    name: string;
  }

  class Connectable {
    connectedCallback() {}
  }

  @domConsumer()
  class Foo extends Connectable {
    @domInject(TEST_SERVICE_A)
    serviceA!: Service;
    @domInject(TEST_SERVICE_B)
    serviceB!: Service;
    @domInject(TEST_SERVICE_C)
    serviceC!: Service;
  }
  let foo = new Foo();
  foo.connectedCallback();
});
