import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './table-user.styles.scss';
import { User } from '../../services/user/types';
import { SubmitUserEvent } from '../form-user/form-user';

@customElement('atx-table-user')
export class AtxUserTable extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Number }) height: number = 0;
  @property({ type: Number }) selected: number = -1;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) popup: string = '';
  @property({ type: Array }) users: User[] = [];

  // Event submit new user (Bubbles from atx-form component)
  // We close our popup and the event bubbles up to container
  submitNewUser(e: CustomEvent<SubmitUserEvent>) {
    this.close(); // Event bubbles up
  }

  // Dispatch an event that a user has clicked button to add a new user
  eventFetchUsers(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('atx-fetch-users', {
        bubbles: true,
        composed: true,
        detail: {}
      })
    );
  }

  // Dispatch an event that a user has clicked a button to remove a user
  eventRemoveUser(e: Event) {
    e.stopPropagation();
    const email = this.removeEmail;
    if (email) {
      this.dispatchEvent(
        new CustomEvent<{ email: string }>('atx-remove-user', {
          bubbles: true,
          composed: true,
          detail: { email }
        })
      );
    }
    this.close();
  }

  // Local event, user clicked the Add button
  eventAddPopup(e: Event) {
    e.stopPropagation();
    this.popup = 'add';
  }

  // Local event, user clicked the remove button. (Prompt warning)
  removeEmail: string | undefined = undefined;
  eventRemovePopup(e: Event, email: string) {
    e.stopPropagation();
    this.removeEmail = email;
    this.popup = 'remove';
  }

  // Close any popup
  close() {
    this.popup = '';
  }

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
      <div
        class="table-container"
        style="${this.height ? `height:${this.height}px` : ``}"
      >
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
                    <td
                      class="${classMap(c.column(true))}"
                      @click="${(e: Event) =>
                        this.eventRemovePopup(e, d.email)}"
                    >
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
            <b-addon-button
              @click="${this.eventAddPopup}"
              color="success"
              size="small"
            >
              <b-icon>add</b-icon>
            </b-addon-button>
            <b-addon-button
              @click="${this.eventFetchUsers}"
              color="warning"
              size="small"
            >
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
      <atx-modal-message
        @b-close="${this.close}"
        ?show="${this.popup === 'remove'}"
        type="danger"
      >
        <div class="has-text-centered">
          <p class="title">Remove User</p>
          <p class="subtitle">
            Are you sure you want to remove ${this.removeEmail}
          </p>
          <b-field centered grouped>
            <b-addon-button @click="${this.eventRemoveUser}" color="success">
              Confirm
            </b-addon-button>
            <b-addon-button @click="${this.close}" color="danger">
              Cancel
            </b-addon-button>
          </b-field>
        </div>
      </atx-modal-message>
      <atx-modal-form-user
        @atx-add-user="${this.submitNewUser}"
        @b-close="${this.close}"
        ?show="${this.popup === 'add'}"
      ></atx-modal-form-user>
    `;
  }
}
