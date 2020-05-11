import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../../components/bulma/styles';
import * as scss from './dashboard-lock.styles.scss';

@customElement('atx-dashboard-lock')
export class AtxDashboardLock extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <p>atx-dashboard-lock works!</p>
    `;
  }
}
