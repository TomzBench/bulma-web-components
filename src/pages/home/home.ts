import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../components/bulma/styles';
import { SYMBOLS } from '../../ioc/constants.root';
import { UserService } from '../../services/user/user.service';
import { domInject, domConsumer } from '../../components/shared/decorators';
import * as scss from './home.styles.scss';
import * as logo from '../../assets/altronix_logo_large.png';

@domConsumer('atx-home')
export class AtxHome extends LitElement {
  static styles = styles(scss.toString());
  @domInject(SYMBOLS.USER_SERVICE) user!: UserService;
  _show: string = '';
  set show(val: string) {
    this._show = val;
    this.requestUpdate();
  }
  get show(): string {
    return this._show;
  }

  onBeforeLeave(location: Location, commands: any) {
    if (location.pathname === '/dashboard' && !this.user.currentUser) {
      // TODO present sign in Modal and prevent navigation
      // return commands.prevent();
    }
  }

  render() {
    return html`
      <div class="home">
        <div class="hero is-fullheight">
          <atx-topnav>
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
        </div>
      </div>
      <b-modal
        @b-close="${() => (this.show = '')}"
        ?show="${this.show === 'contact'}"
      >
        <div class="contact is-clipped">
          <div class="box">
            <p class="contact-title">Submit message...</p>
            <atx-form-contact></atx-form-contact>
          </div>
        </div>
      </b-modal>
    `;
  }
}
