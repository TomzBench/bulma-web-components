import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './table-user.styles.scss';

import { BTable } from '../bulma/table/table';
import '../bulma/pagination/pagination';
import '../bulma/table/table';
import '../bulma/field/field';
import '../bulma/input/input';
import '../bulma/icon/icon';
import '../bulma/select/select';
import '../bulma/addon/addon';

export interface UserTableData {
  name: string;
  email: string;
  role: number;
}

@customElement('atx-table-user')
export class AtxUserTable extends LitElement {
  static styles = styles(scss.toString());
  @query('b-table') protected table!: BTable<UserTableData>;

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
      <div class="columns is-desktop">
        <div class="column is-6 is-paddingless">
          <b-field size="small" grouped>
            <b-addon-button color="primary">
              <b-icon>add</b-icon>
              Add New User
            </b-addon-button>
            <b-addon-button color="danger">
              <b-icon>delete</b-icon>
              Delete Selected
            </b-addon-button>
          </b-field>
        </div>
        <div class="column is-6 is-paddingless">
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
        <div class="column is-12 is-paddingless">
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
      <div class="columns">
        <div class="column is-12 is-paddingless">
          <b-pagination
            simple
            current="1"
            size="small"
            total="${this.users.length}"
            per-page="1"
            @b-prev=${() => console.log('Want users PREVIOUS')}
            @b-next=${() => console.log('Want users NEXT')}
          >
          </b-pagination>
        </div>
      </div>
    `;
  }
}
