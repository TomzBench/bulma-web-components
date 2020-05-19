import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { SubmitLoginEvent } from './types';
import * as scss from './form-login.styles.scss';

import '../bulma/pagination/pagination';
import '../bulma/table/table';
import '../bulma/field/field';
import '../bulma/input/input';
import '../bulma/icon/icon';
import '../bulma/select/select';
import '../bulma/addon/addon';

@customElement('atx-form-login')
export class AtxFormLogin extends LitElement {
  @property({ type: String }) redirect: string = '/dashboard';
  static styles = styles(scss.toString());
  email: string = '';
  password: string = '';

  click() {
    console.log('FORM EVENT');
    this.dispatchEvent(
      new CustomEvent<SubmitLoginEvent>('atx-login', {
        bubbles: true,
        composed: true,
        detail: {
          email: this.email,
          password: this.password,
          redirect: this.redirect
        }
      })
    );
  }

  render() {
    return html`
      <b-field horizontal label="Email">
        <b-field>
          <b-input
            type="email"
            placeholder="Email@mail.com"
            @input="${(e: any) => (this.email = e.target.value)}"
          >
            <b-icon>mail</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Password">
        <b-field>
          <b-input
            type="password"
            placeholder="************"
            @input="${(e: any) => (this.password = e.target.value)}"
          >
            <b-icon>lock</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal>
        <b-field grouped>
          <b-addon-button @click="${() => this.click()}" color="info">
            Submit
          </b-addon-button>
          <b-addon-button color="white">
            <a class="">Forgot user name or password?</a>
          </b-addon-button>
        </b-field>
      </b-field>
    `;
  }
}
