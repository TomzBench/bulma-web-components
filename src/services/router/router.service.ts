import { injectable } from 'inversify';
import { SYMBOLS } from '../../ioc/constants.root';
import { bindTo } from '../../ioc/container.root';
import page from 'page';

type RouteCallback = (ctx: typeof page.Context, next: () => any) => any;

@bindTo(SYMBOLS.ROUTER_SERVICE, () => new RouterService(page.bind(window)))
export class RouterService {
  constructor(private router: typeof page) {}

  _context?: typeof page.Context;
  get context(): typeof page.Context | undefined {
    return this._context;
  }
  set context(ctx: typeof page.Context | undefined) {
    this._context = ctx;
  }

  private saveContext(ctx: typeof page.Context, next: () => any) {
    this.context = ctx;
    next();
  }

  route(path: string, ...callbacks: RouteCallback[]): void {
    if (callbacks.length) callbacks.unshift(this.saveContext.bind(this));
    this.router(path, ...callbacks);
  }

  ready() {
    this.router({ window: window } as any); // @types/page fail
  }
}
