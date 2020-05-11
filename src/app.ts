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
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  private view: View = 'home';

  connectedCallback() {
    super.connectedCallback();
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
      <atx-dashboard></atx-dashboard>
    `;
  }
}
