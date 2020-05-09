import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { stylesCustom } from '../../components/bulma/styles';
import * as scss from './dashboard.styles.scss';

import '../../components/table-user/table-user';
import '../../components/table-alert/table-alert';
import '../../components/table-device/table-device';

@customElement('atx-dashboard')
export class AtxDashboard extends LitElement {
  static styles = stylesCustom(scss.toString());

  render() {
    return html`
      <div class="dashboard-container">
        <div class="columns">
          <div class="column">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <div class="tile is-child box">
                  <p class="title">30</p>
                  <p class="subtitle">Users</p>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child box">
                  <p class="title">23</p>
                  <p class="subtitle">Connected Devices</p>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child box">
                  <p class="title">300</p>
                  <p class="subtitle">Emails Sent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column">
                  <p class="is-size-5 has-text-weight-light title underline">
                    User Management
                  </p>
                </div>
              </div>
              <atx-table-user></atx-table-user>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column">
                  <p class="is-size-5 has-text-weight-light title underline">
                    Connected Device List
                  </p>
                </div>
              </div>
              <atx-table-device></atx-table-device>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column">
                  <p class="is-size-5 has-text-weight-light title underline">
                    Alerts
                  </p>
                </div>
              </div>
              <atx-table-alert></atx-table-alert>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-sidenav">
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
