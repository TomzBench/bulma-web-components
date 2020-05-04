import { Container } from 'inversify';
import { makeDecorator } from '../decorators';

test('domInject should inject property', () => {
  const { domInject } = makeDecorator({} as Container);
  class Foo {
    @domInject()
    prop!: string;
    constructor() {
      // this.prop = 'from constructor';
    }
  }

  let foo = new Foo();
  console.log(foo.prop);
});
