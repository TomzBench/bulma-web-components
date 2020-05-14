import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { UserService } from '../../services/user/user.service';
import { RouterService } from '../../services/router/router.service';
import { domConsumer, domInject } from '../../components/shared/decorators';
import { SYMBOLS } from '../../ioc/constants.root';
import { SubmitLoginEvent } from '../../components/form-login/types';
import { Subscription } from 'rxjs';
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
  @domInject(SYMBOLS.USER_SERVICE) users!: UserService;
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  @property({ type: Boolean }) wide: boolean = false;
  @property({ type: String }) user: string | undefined = undefined;
  @property({ type: String }) show?: string;
  $user?: Subscription;
  loggedIn: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this.$user = this.users.user.subscribe(u => {
      this.user = u && u.firstName;
      this.loggedIn = u ? true : false;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    if (this.$user) this.$user.unsubscribe();
    super.disconnectedCallback();
  }

  showSignin() {
    this.show = 'signin';
  }

  async logout() {
    await this.users.logout();
    this.router.route('/home');
  }

  async login(e: CustomEvent<SubmitLoginEvent>) {
    this.users
      .login(e.detail.email, e.detail.password)
      .then(() => this.router.route('/dashboard'))
      .catch(e => {
        // TODO show login error
        this.show = '';
        console.log(e);
      });
  }

  renderAccountCircleUser() {
    let ret = html`
      <b-navbar-item where="right">
        <b-navbar-label>
          <span>${this.user}</span>
          <b-icon>account_circle</b-icon>
        </b-navbar-label>
        <b-navbar-dropdown>
          <b-navbar-item @click="${this.logout}">Sign Out</b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    `;
    return ret;
  }

  renderAccountCircleSignin() {
    return html`
      <b-navbar-item @click="${this.showSignin}" where="right">
        <span>Sign In</span>
        <b-icon>account_circle</b-icon>
      </b-navbar-item>
    `;
  }

  render() {
    return html`
      <b-navbar color="primary" ?wide="${this.wide}">
        <b-navbar-item where="brand">
          <a href="/home"><img src="${logo}" height="32px"/></a>
        </b-navbar-item>
        ${Array.from(this.children)}
        <b-navbar-item><span>${this.user}</span></b-navbar-item>
        ${this.user
          ? this.renderAccountCircleUser()
          : this.renderAccountCircleSignin()}
      </b-navbar>
    `;
  }
}
