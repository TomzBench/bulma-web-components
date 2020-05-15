import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { UserService } from '../../services/user/user.service';
import { RouterService } from '../../services/router/router.service';
import { domConsumer, domInject } from '../../components/shared/decorators';
import { SYMBOLS } from '../../ioc/constants.root';
import {
  SubmitLoginEvent,
  SubmitLogoutEvent
} from '../../components/form-login/types';
import { Subscription } from 'rxjs';

@domConsumer('atx-login-container')
export class AtxTopnavContainer extends LitElement {
  @domInject(SYMBOLS.USER_SERVICE) users!: UserService;
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  $user?: Subscription;

  connectedCallback() {
    super.connectedCallback();
    this.$user = this.users.user.subscribe(u => {});
  }

  disconnectedCallback() {
    if (this.$user) this.$user.unsubscribe();
    super.disconnectedCallback();
  }

  async logout(e: CustomEvent<SubmitLogoutEvent>) {
    await this.users
      .logout()
      .then(() => this.router.route(e.detail.redirect || '/logout'))
      .catch();
  }

  async login(e: CustomEvent<SubmitLoginEvent>) {
    this.users
      .login(e.detail.email, e.detail.password)
      .then(() => this.router.route(e.detail.redirect || '/dashboard'))
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return html`
      <slot @atx-login="${this.login}" @atx-logout="${this.logout}"></slot>
    `;
  }
}
