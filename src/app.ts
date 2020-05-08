import 'reflect-metadata';
import { customElement, LitElement, html } from 'lit-element';
import { SYMBOLS } from './ioc/constants.root';
import { lazyInject } from './ioc/container.root';
import { UserService } from './services/user/user.service';
import { styles } from './components/bulma/styles';
import * as scss from './app.styles.scss';

import { SubmitLoginEvent } from './components/form-login/types';
import './components/topnav/topnav';

@customElement('atx-app')
export class App extends LitElement {
  static styles = styles(scss.toString());
  @lazyInject(SYMBOLS.USER_SERVICE) userService!: UserService;

  async connectedCallback() {
    super.connectedCallback();
  }

  async login(email: string, password: string) {
    console.log('FOOOOOO');
    // let response = await this.userService.login(email, password);
  }

  render() {
    return html`
      <atx-topnav
        @atx-login="${(e: CustomEvent<SubmitLoginEvent>) => {
          this.login(e.detail.email, e.detail.password);
        }}"
      ></atx-topnav>
    `;
  }
}
