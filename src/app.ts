import { customElement, LitElement, html, query } from 'lit-element';
import { SYMBOLS } from './ioc/constants.root';
import { domConsumer, domInject } from './components/shared/decorators';
import { UserService } from './services/user/user.service';
import { RouterService } from './services/router/router.service';
import { SubmitLoginEvent } from './components/form-login/types';

import './components/topnav/topnav';
import './pages/dashboard/dashboard';
import './pages/dashboard/main/dashboard-main';
import './pages/dashboard/account/dashboard-account';
import './pages/dashboard/devices/dashboard-devices';
import './pages/dashboard/lock/dashboard-lock';
import './pages/dashboard/mail/dashboard-mail';
import './pages/dashboard/power/dashboard-power';
import './pages/docs/docs';
import './pages/home/home';

import { styles } from './components/bulma/styles';
import * as scss from './app.styles.scss';

@domConsumer('atx-app')
export class App extends LitElement {
  static styles = styles(scss.toString());
  @domInject(SYMBOLS.USER_SERVICE) userService!: UserService;
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  @query('.outlet') outlet!: Element;

  firstUpdated() {
    let router = this.router.create(this.outlet);
    router.setRoutes([
      { path: '/', component: 'atx-home' },
      { path: '/home', component: 'atx-home' },
      { path: '/docs', component: 'atx-docs' },
      {
        path: '/dashboard',
        component: 'atx-dashboard',
        children: [
          { path: '/', component: 'atx-dashboard-main' },
          { path: '/main', component: 'atx-dashboard-main' },
          { path: '/account', component: 'atx-dashboard-account' },
          { path: '/mail', component: 'atx-dashboard-mail' },
          { path: '/lock', component: 'atx-dashboard-lock' },
          { path: '/devices', component: 'atx-dashboard-devices' },
          { path: '/power', component: 'atx-dashboard-power' }
        ]
      }
    ]);
  }

  async login(email: string, password: string) {
    let response = await this.userService.login(email, password).catch(e => e);
  }

  render() {
    return html`
      <atx-topnav
        @atx-login="${(e: CustomEvent<SubmitLoginEvent>) => {
          this.login(e.detail.email, e.detail.password);
        }}"
      ></atx-topnav>
      <div class="outlet"></div>
    `;
  }
}
