import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../components/bulma/styles';
import { domConsumer, domInject } from '../../components/shared/decorators';
import { SYMBOLS } from '../../ioc/constants.root';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import * as scss from './dashboard.styles.scss';
import * as logo from '../../assets/altronix.png';
import './main/dashboard-main';
import '../../components/router-guard/router-guard';

@domConsumer('atx-dashboard')
export class AtxDashboard extends LitElement {
  static styles = styles(scss.toString());
  @domInject(SYMBOLS.USER_SERVICE) users!: UserService;
  $user?: Subscription;

  connectedCallback() {
    super.connectedCallback();
    this.$user = this.users.user.subscribe(u => {
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    if (this.$user) this.$user.unsubscribe();
    super.disconnectedCallback();
  }

  render() {
    const user = this.users.user.value ? this.users.user.value.firstName : '';
    return html`
      <atx-login-container>
        <atx-topnav user="${user}" wide> </atx-topnav>
        <div class="dashboard-container">
          <atx-router-guard role="0" redirect="/home">
            <nav class="breadcrumb">
              <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li class="is-active"><a>Main</a></li>
              </ul>
            </nav>
            <slot></slot>
          </atx-router-guard>
        </div>
        <div class="dashboard-sidenav">
          <div class="logo">
            <img src="${logo}" />
          </div>
          <div class="menu">
            <ul class="menu-list">
              <li>
                <a href="/dashboard/main"><b-icon>desktop_mac</b-icon></a>
              </li>
              <li>
                <a href="/dashboard/account"><b-icon>account_circle</b-icon></a>
              </li>
              <li>
                <a href="/dashboard/mail"><b-icon>mail</b-icon></a>
              </li>
              <li>
                <a href="/dashboard/lock"><b-icon>lock</b-icon></a>
              </li>
              <li>
                <a href="/dashboard/devices"><b-icon>device_hub</b-icon></a>
              </li>
              <li>
                <a href="/dashboard/power"><b-icon>power</b-icon></a>
              </li>
            </ul>
          </div>
        </div>
      </atx-login-container>
    `;
  }
}
