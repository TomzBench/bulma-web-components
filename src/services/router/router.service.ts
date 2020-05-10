import { injectable } from 'inversify';
import { SYMBOLS } from '../../ioc/constants.root';
import { bindTo } from '../../ioc/container.root';
import page from 'page';

type RouteCallback = (ctx: typeof page.Context, next: () => any) => any;

@bindTo(SYMBOLS.ROUTER_SERVICE, () => new RouterService(page.bind(window)))
export class RouterService {
  constructor(private router: typeof page) {
    this.router({ window: window } as any); // @types/page fail
  }

  route(path: string, ...callbacks: RouteCallback[]): void {
    this.router(path, ...callbacks);
  }
}
