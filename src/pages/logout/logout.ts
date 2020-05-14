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
import * as scss from './logout.styles.scss';
import * as logo from '../../assets/altronix_logo_large.png';
import * as facebook from '../../assets/facebook.svg';
import * as github from '../../assets/github.svg';
import * as twitter from '../../assets/twitter.svg';
import * as linkedin from '../../assets/linkedin.svg';
import * as googleLocation from '../../assets/location.svg';

@domConsumer('atx-logout')
export class AtxLogout extends LitElement {
  static styles = styles(scss.toString());
  @domInject(SYMBOLS.USER_SERVICE) users!: UserService;
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;
  @property({ type: String }) show: string = '';

  render() {
    return html`
      <div class="logout">
        <div class="hero is-fullheight">
          <atx-topnav>
            <a class="is-size-5" href="/home">Altronix Developer Portal</a>
          </atx-topnav>
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title"><img src="${logo}" /></h1>
              <h1 class="title has-text-weight-light">
                Good Bye
              </h1>
              <a href="/home" class="button is-primary">GO BACK</a>
            </div>
          </div>
          <div class="hero-foot"></div>
        </div>
      </div>
    `;
  }
}
