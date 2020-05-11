import { injectable } from 'inversify';
import { SYMBOLS } from '../../ioc/constants.root';
import { bindTo } from '../../ioc/container.root';
import { Router } from '@vaadin/router';

@bindTo(SYMBOLS.ROUTER_SERVICE, () => new RouterService(Router))
export class RouterService {
  constructor(private VaadinRouter: typeof Router) {}

  create(el: Element) {
    return new this.VaadinRouter(el);
  }
}
