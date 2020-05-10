import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './table-alert.styles.scss';

import { BTable, Table } from '../bulma/table/table';
import '../bulma/pagination/pagination';
import '../bulma/table/table';
import '../bulma/field/field';
import '../bulma/input/input';
import '../bulma/icon/icon';
import '../bulma/select/select';
import '../bulma/addon/addon';

export interface AlertTableData {
  device: string;
  product: string;
  who: string;
  what: string;
  siteId: string;
  when: Date;
  mesg: string;
}

export type AlertTable = Table<AlertTableData>;

@customElement('atx-table-alert')
export class AtxAlertTable extends LitElement {
  static styles = styles(scss.toString());
  _alerts: AlertTableData[] = [];
  set alerts(users: AlertTableData[]) {
    this._alerts = [...users];
    if (this.table) this.updateTable();
  }
  get users(): AlertTableData[] {
    return this._alerts;
  }
  private table: AlertTable = { data: [], columns: [] };

  updateTable() {
    this.table = {
      data: [...this.users],
      columns: [
        { label: 'device' },
        { label: 'product' },
        { label: 'who' },
        { label: 'what' },
        { label: 'siteId' },
        { label: 'when' },
        { label: 'mesg' }
      ]
    };
    this.requestUpdate();
  }

  firstUpdated() {
    this.updateTable();
  }

  render() {
    return html`
      <div class="columns is-desktop">
        <div class="column is-offset-6">
          <b-field size="small">
            <b-select>
              <b-icon>search</b-icon>
              <option>Device</option>
              <option>Product</option>
              <option>Who</option>
              <option>What</option>
              <option>SiteId</option>
              <option>When</option>
              <option>Mesg</option>
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
          <b-table
            .data="${this.table}"
            numbered
            fullwidth
            hoverable
            striped
            narrow
          ></b-table>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-pagination
            simple
            current="1"
            size="small"
            total="${this.users.length}"
            per-page="1"
            @b-prev=${() => console.log('Want alerts PREVIOUS')}
            @b-next=${() => console.log('Want alerts NEXT')}
          >
          </b-pagination>
        </div>
      </div>
    `;
  }
}
