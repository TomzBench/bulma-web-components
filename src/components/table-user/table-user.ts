import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './table-user.styles.scss';
import { connect } from '../../store/connect';
import { RootState } from '../../store/reducers';
import { actions } from '../../store/action';
import { User } from '../../services/user/types';

import { BTable, Table } from '../bulma/table/table';
import '../bulma/pagination/pagination';
import '../bulma/table/table';
import '../bulma/field/field';
import '../bulma/input/input';
import '../bulma/icon/icon';
import '../bulma/select/select';
import '../bulma/addon/addon';

@customElement('atx-table-user')
export class AtxUserTable extends connect<RootState>()(LitElement) {
  static styles = styles(scss.toString());
  @property({ type: Boolean }) bordered: boolean = false;
  @property({ type: Boolean }) striped: boolean = false;
  @property({ type: Boolean }) narrow: boolean = false;
  @property({ type: Boolean }) hoverable: boolean = false;
  @property({ type: Boolean }) fullwidth: boolean = false;
  @property({ type: Number }) selected: number = -1;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Array })
  set users(users: User[]) {
    this._users = [...users];
    this.requestUpdate();
  }
  get users(): User[] {
    return this._users;
  }
  _users: User[] = [];

  stateChanged(state: RootState) {
    this.users = state.users.users;
    this.loading = state.users.loading;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetch();
  }

  fetch() {
    this.store.dispatch(actions.user.fetch());
  }

  renderTable() {
    const c = {
      table: {
        table: true,
        ['is-bordered']: !!this.bordered,
        ['is-striped']: !!this.striped,
        ['is-narrow']: !!this.narrow,
        ['is-hoverable']: !!this.hoverable,
        ['is-fullwidth']: !!this.fullwidth
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
              <th class="${classMap(c.column())}">Name</th>
              <th class="${classMap(c.column())}">Email</th>
              <th class="${classMap(c.column())}">Role</th>
              <th class="${classMap(c.column())}">view</th>
              <th class="${classMap(c.column())}">edit</th>
              <th class="${classMap(c.column())}">delete</th>
            </tr>
          </thead>
          <tbody>
            ${this.users.map(
              (d, idx) =>
                html`
                  <tr class="${classMap(c.row(idx))}">
                    <td class="${classMap(c.column(true))}">${idx + 1}</td>
                    <td class="${classMap(c.column())}">${d.firstName}</td>
                    <td class="${classMap(c.column())}">${d.email}</td>
                    <td class="${classMap(c.column(true))}">${d.role}</td>
                    <td class="${classMap(c.column(true))}">
                      <span class="is-hidden">align</span>
                      <b-icon size="small" color="info">edit</b-icon>
                    </td>
                    <td class="${classMap(c.column(true))}">
                      <span class="is-hidden">align</span>
                      <b-icon size="small" color="info">visibility</b-icon>
                    </td>
                    <td class="${classMap(c.column(true))}">
                      <span class="is-hidden">align</span>
                      <b-icon size="small" color="danger">delete</b-icon>
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
          <b-field grouped>
            <b-addon-button color="success" size="small">
              <b-icon>add</b-icon>
            </b-addon-button>
            <b-addon-button color="warning" size="small">
              <b-icon @click="${this.fetch}">refresh</b-icon>
            </b-addon-button>
            <b-addon-button color="danger" size="small">
              <b-icon>delete</b-icon>
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
          <atx-ui-blocker ?active="${this.loading}">
            ${this.renderTable()}
          </atx-ui-blocker>
        </div>
      </div>
      <div class="columns">
        <div class="column is-offset-6">
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
