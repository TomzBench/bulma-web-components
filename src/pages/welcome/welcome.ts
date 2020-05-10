import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { stylesCustom } from '../../components/bulma/styles';
import * as scss from './welcome.styles.scss';

@customElement('atx-welcome')
export class AtxWelcome extends LitElement {
  static styles = stylesCustom(scss.toString());

  render() {
    return html`
      <p>welcome works!</p>
    `;
  }
}
