import { html, fixture, expect } from '@open-wc/testing';
import { Container } from 'inversify';
import {
  makeDecorators,
  domInject,
  domConsumer,
  DomPropertyMetadata,
  METADATA_KEYS
} from '../decorators';

describe('lazyInject ', () => {
  it('should inject a service', () => {
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
    expect(foo.serviceA.name).to.be('ServiceA');
    expect(foo.serviceB.name).to.be('ServiceB');
    expect(foo.serviceC.name).to.be('ServiceC');
  });
});

describe('domInject', () => {
  it('domInject should add metadata', () => {
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

    expect(meta.length).to.eq(3);
    expect(meta[0].id).to.eq(TEST_SERVICE_A);
    expect(meta[0].key).to.eq('serviceA');
    expect(meta[0].target).to.eq(Foo.prototype);
    expect(meta[1].id).to.eq(TEST_SERVICE_B);
    expect(meta[1].key).to.eq('serviceB');
    expect(meta[1].target).to.eq(Foo.prototype);
    expect(meta[2].id).to.eq(TEST_SERVICE_C);
    expect(meta[2].key).to.eq('serviceC');
    expect(meta[2].target).to.eq(Foo.prototype);
  });
});

describe('domConsumer', () => {
  it('domConsumer should request services', () => {
    const TEST_SERVICE_A = Symbol.for('TestServiceA');
    const TEST_SERVICE_B = Symbol.for('TestServiceB');
    const TEST_SERVICE_C = Symbol.for('TestServiceC');
    interface Service {
      name: string;
    }

    // TODO move to mock
    class Base {
      addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions
      ): void {}
      dispatchEvent(event: Event): boolean {
        return false;
      }
      removeEventListener(
        type: string,
        callback: EventListenerOrEventListenerObject | null,
        options?: EventListenerOptions | boolean
      ): void {}
      connectedCallback() {}
    }

    @domConsumer()
    class Foo extends Base {
      @domInject(TEST_SERVICE_A)
      serviceA!: Service;
      @domInject(TEST_SERVICE_B)
      serviceB!: Service;
      @domInject(TEST_SERVICE_C)
      serviceC!: Service;
    }
    let foo = new Foo();
    // TODO expect mock event to be called
    foo.connectedCallback();
  });
});
