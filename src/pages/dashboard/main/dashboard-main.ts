import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../../components/bulma/styles';
import * as scss from './dashboard-main.styles.scss';

import '../../../components/table-user/table-user';
import '../../../components/table-alert/table-alert';
import '../../../components/table-device/table-device';

@customElement('atx-dashboard-main')
export class AtxDashboardMain extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <div class="dashboard-main">
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
              <atx-ui-blocker ?active="${false}">
                <atx-table-user></atx-table-user>
              </atx-ui-blocker>
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
    `;
  }
}
