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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <atx-topnav wide>
        <a class="is-size-5" href="/home">Altronix Developer Portal</a>
      </atx-topnav>
      <div class="dashboard-container">
        <atx-router-guard transition="750" role="0" redirect="/home">
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
    `;
  }
}
