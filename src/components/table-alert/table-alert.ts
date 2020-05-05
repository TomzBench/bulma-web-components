import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './table-alert.styles.scss';

import { BTable } from '../bulma/table/table';
import '../bulma/pagination/pagination.ts';
import '../bulma/table/table.ts';
import '../bulma/field/field.ts';
import '../bulma/input/input.ts';
import '../bulma/icon/icon.ts';
import '../bulma/select/select';
import '../bulma/addon/addon.ts';

export interface AlertTableData {
  device: string;
  product: string;
  who: string;
  what: string;
  siteId: string;
  when: Date;
  mesg: string;
}

@customElement('atx-table-alert')
export class AtxAlertTable extends LitElement {
  static styles = styles(scss.toString());
  @query('b-table') protected table!: BTable<AlertTableData> | null;
  _alerts: AlertTableData[] = [];
  set alerts(users: AlertTableData[]) {
    this._alerts = [...users];
    if (this.table) this.updateTable();
  }
  get users(): AlertTableData[] {
    return this._alerts;
  }

  updateTable() {
    this.table.tableData = {
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
        <div class="column is-6 is-paddingless"></div>
        <div class="column is-6 is-paddingless">
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
        <div class="column is-12 is-paddingless">
          <b-table numbered fullwidth hoverable striped narrow></b-table>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12 is-paddingless">
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