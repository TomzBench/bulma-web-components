import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './form-user.styles.scss';

import '../bulma/pagination/pagination';
import '../bulma/table/table';
import '../bulma/field/field';
import '../bulma/input/input';
import '../bulma/icon/icon';
import '../bulma/select/select';
import '../bulma/addon/addon';

export interface SubmitUserEvent {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

@customElement('atx-form-user')
export class AtxFormUser extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: String }) firstName!: string;
  @property({ type: String }) lastName!: string;
  @property({ type: String }) email!: string;
  @property({ type: String }) phone!: string;
  @property({ type: String }) role!: string;
  @property({ type: String }) password!: string;

  submit() {
    const { firstName, lastName, email, password, phone, role } = this;
    this.dispatchEvent(
      new CustomEvent<SubmitUserEvent>('atx-add-user', {
        bubbles: true,
        composed: true,
        detail: { firstName, lastName, email, phone, role, password }
      })
    );
  }

  edit(e: any, key: keyof SubmitUserEvent) {
    console.log(key);
    this[key] = e.target.value;
  }

  render() {
    return html`
      <b-field horizontal label="Name">
        <b-field>
          <b-input
            @input="${(e: any) => this.edit(e, 'firstName')}"
            placeholder="First"
          >
            <b-icon>person</b-icon>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            @input="${(e: any) => this.edit(e, 'lastName')}"
            placeholder="Last"
          >
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Email">
        <b-field>
          <b-input
            @input="${(e: any) => this.edit(e, 'email')}"
            type="email"
            placeholder="Email..."
          >
            <b-icon>mail</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Phone">
        <b-field>
          <b-input
            @input="${(e: any) => this.edit(e, 'phone')}"
            type="tel"
            placeholder="+44"
          >
            <b-icon>phone</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Password">
        <b-field>
          <b-input
            @input="${(e: any) => this.edit(e, 'password')}"
            type="password"
            placeholder="****"
          >
            <b-icon>lock</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Role">
        <b-field>
          <b-select @input="${(e: any) => this.edit(e, 'role')}" expanded>
            <b-icon>lock</b-icon>
            <option>Admin</option>
            <option>Developer</option>
            <option>Sales</option>
            <option>General</option>
          </b-select>
        </b-field>
      </b-field>
      <b-field horizontal>
        <b-addon-button @click="${this.submit}" color="info">
          Submit
        </b-addon-button>
      </b-field>
    `;
  }
}
