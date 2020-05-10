import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { stylesCustom } from '../../components/bulma/styles';
import * as scss from './dashboard.styles.scss';

import * as logo from '../../assets/altronix.png';
import './main/dashboard-main';

@customElement('atx-dashboard')
export class AtxDashboard extends LitElement {
  static styles = stylesCustom(scss.toString());

  render() {
    return html`
      <div class="dashboard-container">
        <atx-dashboard-main></atx-dashboard-main>
      </div>
      <div class="dashboard-sidenav">
        <div class="logo">
          <img src="${logo}" />
        </div>
        <div class="menu">
          <ul class="menu-list">
            <li>
              <a><b-icon>desktop_mac</b-icon></a>
            </li>
            <li>
              <a><b-icon>account_circle</b-icon></a>
            </li>
            <li>
              <a><b-icon>mail</b-icon></a>
            </li>
            <li>
              <a><b-icon>lock</b-icon></a>
            </li>
            <li>
              <a><b-icon>device_hub</b-icon></a>
            </li>
            <li>
              <a><b-icon>power</b-icon></a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}
