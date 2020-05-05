import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './user-table.styles.scss';

import { BTable } from '../bulma/table/table';
import '../bulma/table/table.ts';
import '../bulma/field/field.ts';
import '../bulma/input/input.ts';
import '../bulma/icon/icon.ts';
import '../bulma/select/select';
import '../bulma/addon/addon.ts';

export interface UserTableData {
  name: string;
  email: string;
  role: number;
}

@customElement('atx-user-table')
export class AtxUserTable extends LitElement {
  static styles = styles(scss.toString());
  @query('b-table') protected table!: BTable<UserTableData> | null;

  _users: UserTableData[] = [];
  set users(users: UserTableData[]) {
    this._users = [...users];
    if (this.table) this.updateTable();
  }
  get users(): UserTableData[] {
    return this._users;
  }

  firstUpdated() {
    this.updateTable();
  }

  updateTable() {
    this.table.tableData = {
      data: [...this.users],
      columns: [{ label: 'name' }, { label: 'email' }, { label: 'role' }]
    };
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-6"></div>
            <div class="column is-6 right">
              <b-field>
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
        </div>
        <div class="column is-12">
          <b-table
            numbered
            fullwidth
            hoverable
            striped
            narrow
            variant="crud"
          ></b-table>
        </div>
      </div>
    `;
  }
}
