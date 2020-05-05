import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './form-user.styles.scss';

import '../bulma/pagination/pagination.ts';
import '../bulma/table/table.ts';
import '../bulma/field/field.ts';
import '../bulma/input/input.ts';
import '../bulma/icon/icon.ts';
import '../bulma/select/select';
import '../bulma/addon/addon.ts';

@customElement('atx-form-user')
export class AtxFormUser extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <b-field horizontal label="Name">
        <b-field>
          <b-input placeholder="First">
            <b-icon>person</b-icon>
          </b-input>
        </b-field>
        <b-field>
          <b-input placeholder="Last"> </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Email">
        <b-field>
          <b-input type="email" placeholder="Email...">
            <b-icon>mail</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Phone">
        <b-field>
          <b-input type="tel" placeholder="+44">
            <b-icon>phone</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Password">
        <b-field>
          <b-input type="password" placeholder="****">
            <b-icon>lock</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Role">
        <b-field>
          <b-select expanded>
            <b-icon>lock</b-icon>
            <option>Admin</option>
            <option>Developer</option>
            <option>Sales</option>
            <option>General</option>
          </b-select>
        </b-field>
      </b-field>
      <b-field horizontal>
        <b-addon-button color="info">Submit</b-addon-button>
      </b-field>
    `;
  }
}
