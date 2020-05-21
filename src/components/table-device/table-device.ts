import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './table-device.styles.scss';

import { BTable, Table } from '../bulma/table/table';
import '../bulma/pagination/pagination';
import '../bulma/table/table';
import '../bulma/field/field';
import '../bulma/input/input';
import '../bulma/icon/icon';
import '../bulma/select/select';
import '../bulma/addon/addon';

export interface Device {
  serial: string;
  product: string;
  prj_version: string;
  atx_version: string;
  web_version: string;
  mac: string;
  lastSeen: Date;
}

@customElement('atx-table-device')
export class AtxTableDevice extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Number }) selected: number = -1;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) popup: string = '';
  @property({ type: Array }) devices: Device[] = [];

  renderTable() {
    const c = {
      table: {
        table: true,
        ['is-bordered']: false,
        ['is-striped']: true,
        ['is-narrow']: true,
        ['is-hoverable']: true,
        ['is-fullwidth']: true
      },
      column: (numeric?: boolean) => {
        return {
          'is-numeric': !!numeric
        };
      },
      row: (idx: number) => {
        return {
          'is-selected': idx === this.selected
        };
      }
    };
    return html`
      <div class="table-container">
        <table class="${classMap(c.table)}">
          <thead>
            <tr>
              <th class="${classMap(c.column(true))}">Idx</th>
              <th class="${classMap(c.column())}">Serial</th>
              <th class="${classMap(c.column())}">Product</th>
              <th class="${classMap(c.column())}">Version</th>
              <th class="${classMap(c.column())}">MAC</th>
              <th class="${classMap(c.column())}">Last Seen</th>
              <th class="${classMap(c.column(true))}">View</th>
            </tr>
          </thead>
          <tbody>
            ${this.devices.map(
              (d, idx) =>
                html`
                  <tr class="${classMap(c.row(idx))}">
                    <td class="${classMap(c.column(true))}">${idx + 1}</td>
                    <td class="${classMap(c.column())}">${d.serial}</td>
                    <td class="${classMap(c.column())}">${d.product}</td>
                    <td class="${classMap(c.column())}">${d.prj_version}</td>
                    <td class="${classMap(c.column())}">${d.mac}</td>
                    <td class="${classMap(c.column())}">33</td>
                    <td class="${classMap(c.column(true))}">
                      <span class="is-hidden">align</span>
                      <b-icon size="small" color="info">visibility</b-icon>
                    </td>
                  </tr>
                `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  render() {
    return html`
      <div class="columns is-desktop">
        <div class="column">
          <b-field size="small" grouped>
            <b-addon-button disabled color="success" size="small">
              <b-icon>add</b-icon>
            </b-addon-button>
            <b-addon-button color="warning" size="small">
              <b-icon>refresh</b-icon>
            </b-addon-button>
          </b-field>
        </div>
        <div class="column">
          <b-field size="small">
            <b-select>
              <b-icon>search</b-icon>
              <option>Name</option>
              <option>Email</option>
              <option>Role</option>
            </b-select>
            <b-input expanded placeholder="search"></b-input>
            <b-addon-button color="warning">
              <b-icon>search</b-icon>
            </b-addon-button>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          ${this.renderTable()}
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-pagination
            simple
            current="1"
            size="small"
            total="${this.devices.length}"
            per-page="1"
            @b-prev=${() => console.log('Want devices PREVIOUS')}
            @b-next=${() => console.log('Want devices NEXT')}
          >
          </b-pagination>
        </div>
      </div>
    `;
  }
}
