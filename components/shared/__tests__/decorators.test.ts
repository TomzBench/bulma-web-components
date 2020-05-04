import { Container } from 'inversify';
import { makeDecorator } from '../decorators';

test('domInject should inject property', () => {
  // Init container
  const TEST_SERVICE = Symbol.for('TestService');
  const container = new Container();
  const { domInject, service } = makeDecorator(container);

  // Create test service
  @service(TEST_SERVICE)
  class TestService {
    test(): string {
      return 'valid test service';
    }
  }

  // Inject test service
  class Foo {
    @domInject(TEST_SERVICE)
    prop!: TestService;
    constructor() {}
  }

  let foo = new Foo();
  console.log(foo.prop.test());
});
