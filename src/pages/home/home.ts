import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../components/bulma/styles';
import { SYMBOLS } from '../../ioc/constants.root';
import { UserService } from '../../services/user/user.service';
import { RouterService } from '../../services/router/router.service';
import { User } from '../../services/user/types';
import { domInject, domConsumer } from '../../components/shared/decorators';
import { SubmitLoginEvent } from '../../components/form-login/types';
import { Subscription } from 'rxjs';
import * as scss from './home.styles.scss';
import * as logo from '../../assets/altronix_logo_large.png';
import * as facebook from '../../assets/facebook.svg';
import * as github from '../../assets/github.svg';
import * as twitter from '../../assets/twitter.svg';
import * as linkedin from '../../assets/linkedin.svg';
import * as googleLocation from '../../assets/location.svg';

@domConsumer('atx-home')
export class AtxHome extends LitElement {
  static styles = styles(scss.toString());
  @domInject(SYMBOLS.USER_SERVICE) users!: UserService;
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  @property({ type: String }) show: string = '';

  render() {
    return html`
      <div class="home">
        <div class="hero is-fullheight">
          <atx-topnav>
            <a class="is-size-5" href="/home">Altronix Developer Portal</a>
          </atx-topnav>
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title"><img src="${logo}" /></h1>
              <h1 class="title has-text-weight-light">
                Altronix Developer Portal
              </h1>
              <nav class="breadcrumb is-centered">
                <ul>
                  <li>
                    <a class="has-text-primary" href="/dashboard">
                      <b-icon>desktop_mac</b-icon>
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a class="has-text-primary" href="/docs">
                      <b-icon>description</b-icon>
                      <span>Documentation</span>
                    </a>
                  </li>
                  <li>
                    <a
                      @click="${() => (this.show = 'contact')}"
                      class="has-text-primary"
                    >
                      <b-icon>mail</b-icon>
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="hero-foot">
            <div class="">
              <div class="column">
                <atx-footer></atx-footer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal
        @b-close="${() => (this.show = '')}"
        ?show="${this.show === 'contact'}"
      >
        <div class="popup is-clipped">
          <div class="box">
            <p class="popup-title">Submit message...</p>
            <atx-form-contact></atx-form-contact>
          </div>
        </div>
      </b-modal>
      <b-modal
        @b-close="${() => (this.show = '')}"
        ?show="${this.show === 'login'}"
      >
        <div class="popup is-clipped">
          <div class="box">
            <div class="container has-text-centered">
              <b-icon color="danger">warning</b-icon>
              <p class="popup-title">Please Log In To Continue...</p>
            </div>
          </div>
        </div>
      </b-modal>
    `;
  }
}
