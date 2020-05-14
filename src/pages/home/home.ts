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
  @property({ type: String }) user?: string;
  @property({ type: String }) show: string = '';
  $user?: Subscription;

  connectedCallback() {
    super.connectedCallback();
    this.$user = this.users.user.subscribe(u => {
      this.user = u && u.firstName;
    });
  }

  disconnectedCallback() {
    if (this.$user) this.$user.unsubscribe();
    super.disconnectedCallback();
  }

  onBeforeLeave(location: Location, commands: any) {
    if (location.pathname === '/dashboard' && !this.user) {
      this.show = 'login';
      return commands.prevent();
    }
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

  render() {
    return html`
      <div class="home">
        <div class="hero is-fullheight">
          <atx-topnav .user="${this.user}" @atx-login="${this.login}">
            <a class="is-size-5" href="/home">Altronix Developer Portal</a>
            <!--<a href="/dashboard">Dashboard</a>-->
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
            <nav class="tabs is-boxed is-fullwidth">
              <div class="container social-tabs">
                <ul>
                  <li>
                    <a class="location">
                      <img src="${googleLocation}" />
                    </a>
                  </li>
                  <li>
                    <a class="facebook">
                      <img src="${facebook}" />
                    </a>
                  </li>
                  <li>
                    <a class="github">
                      <img src="${github}" />
                    </a>
                  </li>
                  <li>
                    <a class="linkedin">
                      <img src="${linkedin}" />
                    </a>
                  </li>
                  <li>
                    <a class="twitter">
                      <img src="${twitter}" />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
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
