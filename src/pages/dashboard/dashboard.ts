import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { stylesCustom } from '../../components/bulma/styles';
import { domConsumer, domInject } from '../../components/shared/decorators';
import { SYMBOLS } from '../../ioc/constants.root';
import { RouterService } from '../../services/router/router.service';
import * as scss from './dashboard.styles.scss';
import * as logo from '../../assets/altronix.png';
import './main/dashboard-main';

@domConsumer('atx-dashboard')
export class AtxDashboard extends LitElement {
  static styles = stylesCustom(scss.toString());
  @domInject(SYMBOLS.ROUTER_SERVICE) router!: RouterService;

  render() {
    return html`
      <div class="dashboard-container">
        <slot></slot>
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
