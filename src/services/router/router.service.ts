import { injectable } from 'inversify';
import { SYMBOLS } from '../../ioc/constants.root';
import { bindTo } from '../../ioc/container.root';

type RouteCallback = (ctx: typeof page.Context, next: () => any) => any;

@bindTo(SYMBOLS.ROUTER_SERVICE, () => new RouterService())
export class RouterService {
  constructor() {}
}
