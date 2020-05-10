import { customElement, LitElement, html } from 'lit-element';
import { SYMBOLS } from './ioc/constants.root';
import { domConsumer, domInject } from './components/shared/decorators';
import { UserService } from './services/user/user.service';
import { RouterService } from './services/router/router.service';

import { SubmitLoginEvent } from './components/form-login/types';
import './components/topnav/topnav';
import './pages/dashboard/dashboard';
import './pages/docs/docs';
import './pages/home/home';

import { styles } from './components/bulma/styles';
import * as scss from './app.styles.scss';

type View = 'home' | 'docs' | 'dashboard';

@domConsumer('atx-app')
export class App extends LitElement {
  static styles = styles(scss.toString());
  @domInject(SYMBOLS.USER_SERVICE) userService!: UserService;
  @domInject(SYMBOLS.ROUTER_SERVICE) routerService!: RouterService;
  private view: View = 'home';

  connectedCallback() {
    super.connectedCallback();
    this.routerService.route('/', () => this.onRoute('home'));
    this.routerService.route('/home', () => this.onRoute('home'));
    this.routerService.route('/docs', () => this.onRoute('docs'));
    this.routerService.route('/dashboard', () => this.onRoute('dashboard'));
  }

  onRoute(nav: View) {
    this.view = nav;
    this.requestUpdate();
  }

  async login(email: string, password: string) {
    let response = await this.userService.login(email, password).catch(e => e);
  }

  renderCurrentView() {
    switch (this.view) {
      case 'dashboard':
        return html`
          <atx-dashboard></atx-dashboard>
        `;
        break;
      case 'docs':
        return html`
          <atx-docs></atx-docs>
        `;
        break;
      default:
        return html`
          <atx-home></atx-home>
        `;
    }
  }

  render() {
    return html`
      <atx-topnav
        @atx-login="${(e: CustomEvent<SubmitLoginEvent>) => {
          this.login(e.detail.email, e.detail.password);
        }}"
      ></atx-topnav>
      ${this.renderCurrentView()}
    `;
  }
}
