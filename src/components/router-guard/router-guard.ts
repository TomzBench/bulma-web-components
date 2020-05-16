import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { until } from 'lit-html/directives/until';
import { styles } from '../../components/bulma/styles';
import { SYMBOLS } from '../../ioc/constants.root';
import { UserService } from '../../services/user/user.service';
import { RouterService } from '../../services/router/router.service';
import { domInject, domConsumer } from '../../components/shared/decorators';

import * as scss from './router-guard.styles.scss';
import '../material/circular-progress/circular-progress';

@domConsumer('atx-router-guard')
export class AtxRouterGuard extends LitElement {
  @property({ type: Number }) role: number = 0;
  @property({ type: String }) redirect: string = '/home';
  @property({ type: Boolean }) popup: boolean = false;
  @property({ type: Number }) transition: number = 10;
  @domInject(SYMBOLS.USER_SERVICE) users!: UserService;
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  static styles = styles(scss.toString());

  connectedCallback() {
    super.connectedCallback();
  }

  back() {
    this.popup = false;
    this.router.route(this.redirect);
  }

  async asyncRender() {
    await this.users.ready;
    const user = this.users.user.value;
    if (!user || user.role < this.role) {
      this.popup = true;
    } else {
      if (this.transition) {
        await new Promise(resolve =>
          setTimeout(() => resolve(), this.transition)
        );
      }
    }
    const message = this.users.user.value
      ? 'You do not have access'
      : 'Please sign in';
    return html`
      ${this.popup
        ? ''
        : html`
            <slot></slot>
          `}
      <b-modal @b-close="${this.back}" ?show="${this.popup}">
        <div class="box popup is-clipped">
          <div class="container has-text-centered">
            <div class="columns is-multiline">
              <div class="column is-12">
                <b-icon color="danger">warning</b-icon>
              </div>
              <div class="column is-12">
                <p class="popup-title">${message}</p>
              </div>
              <div class="column is-12">
                <button @click="${this.back}" class="button is-primary">
                  BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    `;
  }

  render() {
    return until(
      this.asyncRender(),
      html`
        <div class="hero is-fullheight">
          <div class="hero-body">
            <m-circular-progress
              class="loading"
              size="large"
            ></m-circular-progress>
          </div>
        </div>
      `
    );
  }
}
