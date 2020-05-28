import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './chart.styles.scss';

@customElement('atx-chart')
export class AtxChart extends LitElement {
  static styles = styles(scss.toString());

  render() {
    return html`
      <p>atx-chart works!</p>
    `;
  }
}
