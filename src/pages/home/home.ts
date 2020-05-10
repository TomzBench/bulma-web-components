import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { stylesCustom } from '../../components/bulma/styles';
import * as scss from './home.styles.scss';

@customElement('atx-home')
export class AtxHome extends LitElement {
  static styles = stylesCustom(scss.toString());

  render() {
    return html`
      <p>home works!</p>
    `;
  }
}
