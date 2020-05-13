import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { domConsumer, domInject } from '../../components/shared/decorators';
import { SYMBOLS } from '../../ioc/constants.root';
import * as scss from './topnav.styles.scss';
import * as logo from '../../assets/altronix.png';

import '../bulma/field/field';
import '../bulma/icon/icon';
import '../bulma/navbar/navbar';
import '../bulma/navbar/navbar-label';
import '../bulma/navbar/navbar-item';
import '../bulma/modal/modal';
import '../bulma/navbar/navbar-dropdown';
import '../form-login/form-login';

@domConsumer('atx-topnav')
export class AtxTopnav extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Boolean }) wide: boolean = false;
  @property({ type: String }) user: string | undefined = undefined;
  @property({ type: String }) show?: string;

  render() {
    const message = this.user ? this.user : 'Sign In';
    return html`
      <b-navbar color="primary" ?wide="${this.wide}">
        <b-navbar-item where="brand">
          <a href="/home"><img src="${logo}" height="32px"/></a>
        </b-navbar-item>
        ${Array.from(this.children)}
        <b-navbar-item where="right" @click="${() => (this.show = 'signin')}">
          <span>${message}</span>
          <b-icon>
            account_circle
          </b-icon>
        </b-navbar-item>
      </b-navbar>
      <b-modal
        @b-close="${() => (this.show = '')}"
        ?show="${this.show === 'signin'}"
      >
        <div class="signin is-clipped">
          <div class="box">
            <p class="signin-title">Please sign in...</p>
            <atx-form-login></atx-form-login>
          </div>
        </div>
      </b-modal>
    `;
  }
}
