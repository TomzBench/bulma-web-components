import { Container } from 'inversify';
// export function domInject() {
//   return function(proto: any, key: string) {
//     console.log(proto);
//     console.log(key);
//     Object.defineProperty(proto, key, {
//       configurable: true,
//       enumerable: true,
//       set: () => null,
//       get: () => 'From Injector'
//     });
//   };
// }

export function makeDecorator(c: Container) {
  function domInject() {
    return function(proto: any, key: string) {
      console.log(proto);
      console.log(key);
      Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: true,
        set: () => null,
        get: () => 'From Injector'
      });
    };
  }
  return { domInject };
}
