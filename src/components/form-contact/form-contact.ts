import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './form-contact.styles.scss';

@customElement('atx-form-contact')
export class AtxFormContact extends LitElement {
  static styles = styles(scss.toString());

  render() {
    return html`
      <b-field horizontal label="Type">
        <b-field>
          <b-select expanded>
            <option>SDK Support</option>
            <option>API Integration Support</option>
            <option>General (engineering)</option>
            <option>General (sales)</option>
          </b-select>
        </b-field>
      </b-field>
      <b-field horizontal label="Subject">
        <b-field>
          <b-input expanded placeholder="API Request For Product Integration">
            <b-icon>subject</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Email">
        <b-field>
          <b-input expanded placeholder="joe@gmail.com">
            <b-icon>mail</b-icon>
          </b-input>
        </b-field>
      </b-field>
      <b-field horizontal label="Message">
        <b-field>
          <b-textarea expanded rows="4"> </b-textarea>
        </b-field>
      </b-field>
      <b-field horizontal>
        <b-addon-button color="info">Submit</b-addon-button>
      </b-field>
    `;
  }
}
