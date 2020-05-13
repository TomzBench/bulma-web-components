import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../../components/bulma/styles';
import * as scss from './dashboard-account.styles.scss';

@customElement('atx-dashboard-account')
export class AtxDashboardAccount extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <div class="hero dashboard-container is-fullheight">
        <div class="hero-head"></div>
        <div class="hero-body">
          <p>TODO</p>
        </div>
        <div class="hero-foot"></div>
      </div>
    `;
  }
}
