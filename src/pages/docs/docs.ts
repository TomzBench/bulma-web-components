import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { stylesCustom } from '../../components/bulma/styles';
import * as scss from './docs.styles.scss';

@customElement('atx-docs')
export class AtxDocs extends LitElement {
  static styles = stylesCustom(scss.toString());

  render() {
    return html`
      <p>docs works!</p>
    `;
  }
}
