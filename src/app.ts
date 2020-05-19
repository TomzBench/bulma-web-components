import { customElement, property, LitElement, html, query } from 'lit-element';
import { SYMBOLS } from './ioc/constants.root';
import { domConsumer, domInject } from './components/shared/decorators';
import { RouterService } from './services/router/router.service';
import { Subscription } from 'rxjs';
import { connect } from './store/connect';
import { RootState } from './store/reducers';
import { actions } from './store/action';

import './components/footer/footer';
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
import './pages/logout/logout';

import { styles } from './components/bulma/styles';
import * as scss from './app.styles.scss';

@domConsumer('atx-app')
export class App extends connect<RootState>()(LitElement) {
  static styles = styles(scss.toString());
  @property({ type: Boolean }) ready: boolean = false;
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  @query('.outlet') outlet!: Element;

  connectedCallback() {
    super.connectedCallback();
    if (!this.store.getState().users.ready) {
      this.store.dispatch(actions.refresh());
    } else {
      this.onReady();
    }
  }

  stateChanged(s: RootState) {
    if (!this.ready && s.users.ready) {
      this.onReady();
      this.ready = true;
    }
  }

  onReady() {
    let router = this.router.create(this.outlet);
    router.setRoutes([
      { path: '/', component: 'atx-home' },
      { path: '/home', component: 'atx-home' },
      { path: '/logout', component: 'atx-logout' },
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

  render() {
    return html`
      <div class="outlet"></div>
    `;
  }
}
