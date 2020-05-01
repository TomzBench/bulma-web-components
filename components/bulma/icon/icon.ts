import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { readAttribute } from '../../shared/attributes';
import { styles } from '../styles';

import { IconWhere } from '../bulma-types';

@customElement('b-icon')
export class BIcon extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: String }) where: IconWhere = 'left';
  @property({ type: String }) kind: string = 'material-icons';
  @property({ type: String }) icon: string | undefined = undefined;

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.classList.add('icon');
    this.classList.add(`is-${this.where}`);
  }

  render() {
    return html`
      <i class="${this.kind}">
        ${this.firstChild}
      </i>
    `;
  }
}
