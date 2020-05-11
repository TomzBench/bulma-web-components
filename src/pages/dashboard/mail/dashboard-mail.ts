import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../../components/bulma/styles';
import * as scss from './dashboard-mail.styles.scss';

@customElement('atx-dashboard-mail')
export class AtxDashboarMail extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <p>atx-dashboard-mail works!</p>
    `;
  }
}
