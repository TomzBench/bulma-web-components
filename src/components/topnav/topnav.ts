import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { domConsumer, domInject } from '../../components/shared/decorators';
import {
  SubmitLogoutEvent,
  SubmitLoginEvent
} from '../../components/form-login/types';
import { Subscription } from 'rxjs';
import { AtxModalLogin } from '../modal-login/modal-login';
import { connect } from '../../store/connect';
import { RootState } from '../../store/reducers';
import { actions } from '../../store/users/action';
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
export class AtxTopnav extends connect<RootState>()(LitElement) {
  static styles = styles(scss.toString());
  @property({ type: Boolean }) wide: boolean = false;
  @property({ type: String }) user: string = '';
  @query('atx-modal-login') loginModal!: AtxModalLogin;

  showLoginModal() {
    this.loginModal.show();
  }

  logout() {
    this.store.dispatch(actions.logout());
  }

  async login(e: CustomEvent<SubmitLoginEvent>) {
    const { email, password } = e.detail;
    this.store.dispatch(actions.login({ email, password }));
    e.stopPropagation();
  }

  stateChanged(state: RootState) {
    this.user = state.users.user ? state.users.user.firstName : '';
  }

  renderAccountCircleUser() {
    const classes = { ['is-hidden']: this.user.length === 0 };
    let ret = html`
      <b-navbar-item class="${classMap(classes)}" where="right">
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

  renderAccountCircleLogin() {
    const classes = { ['is-hidden']: this.user.length !== 0 };
    return html`
      <b-navbar-item
        class="${classMap(classes)}"
        @click="${this.showLoginModal}"
        where="right"
      >
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
        <!-- -->
        ${this.renderAccountCircleUser()}
        <!-- -->
        ${this.renderAccountCircleLogin()}
        <!-- -->
      </b-navbar>
      <atx-modal-login @atx-login="${this.login}"></atx-modal-login>
    `;
  }
}
