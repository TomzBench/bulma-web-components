import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { domConsumer, domInject } from '../../components/shared/decorators';
import { RouterService } from '../../services/router/router.service';
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
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  _show: string = '';
  set show(val: string) {
    this._show = val;
    this.requestUpdate();
  }
  get show(): string {
    return this._show;
  }

  render() {
    return html`
      <b-navbar color="primary" ?wide="${this.wide}">
        <b-navbar-item where="brand">
          <a href="/home"><img src="${logo}" height="32px"/></a>
        </b-navbar-item>
        <a class="navbar-item" href="/dashboard">
          Dashboard
        </a>
        <b-navbar-item href="/docs">
          <b-navbar-label>
            Docs
          </b-navbar-label>
          <b-navbar-dropdown>
            <b-navbar-item>API</b-navbar-item>
            <b-navbar-item>DashboardV12</b-navbar-item>
            <b-navbar-item>LinQM5</b-navbar-item>
            <b-navbar-item>SDK</b-navbar-item>
            <b-navbar-item>C++</b-navbar-item>
            <b-navbar-item>NodeJS</b-navbar-item>
            <b-navbar-item>Rust</b-navbar-item>
          </b-navbar-dropdown>
        </b-navbar-item>
        <b-navbar-item where="right" @click="${() => (this.show = 'signin')}">
          Sign In
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
