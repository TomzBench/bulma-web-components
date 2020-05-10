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

export interface TableDeviceData {
  serial: string;
  product: string;
  prj_version: string;
  atx_version: string;
  web_version: string;
  mac: string;
  lastSeen: Date;
}

type TableDevice = Table<TableDeviceData>;

@customElement('atx-table-device')
export class AtxTableDevice extends LitElement {
  static styles = styles(scss.toString());

  _devices: TableDeviceData[] = [];
  set devices(devices: TableDeviceData[]) {
    this._devices = [...devices];
    if (this.table) this.updateTable();
  }
  get devices(): TableDeviceData[] {
    return this._devices;
  }

  private table: TableDevice = { columns: [], data: [] };

  firstUpdated() {
    this.updateTable();
  }

  updateTable() {
    this.table = {
      data: [...this.devices],
      columns: [
        { label: 'serial' },
        { label: 'product' },
        { label: 'prj_version' },
        { label: 'atx_version' },
        { label: 'web_version' },
        { label: 'mac' },
        { label: 'lastSeen' }
      ]
    };
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="columns is-desktop">
        <div class="column">
          <b-field size="small" grouped>
            <b-addon-button color="danger">
              <b-icon>delete</b-icon>
              Delete Selected
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
