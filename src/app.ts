import { customElement, LitElement, html } from 'lit-element';
import { SYMBOLS } from './ioc/constants.root';
import { domConsumer, domInject } from './components/shared/decorators';
import { UserService } from './services/user/user.service';

import { SubmitLoginEvent } from './components/form-login/types';
import './components/topnav/topnav';
import './pages/dashboard/dashboard'; // TODO this should be a link

import { styles } from './components/bulma/styles';
import * as scss from './app.styles.scss';

@domConsumer('atx-app')
export class App extends LitElement {
  static styles = styles(scss.toString());
  @domInject(SYMBOLS.USER_SERVICE) userService!: UserService;

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
      <div class="container">
        <atx-dashboard></atx-dashboard>
      </div>
    `;
  }
}
