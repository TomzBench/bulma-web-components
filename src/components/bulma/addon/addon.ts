import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { readAttribute } from '../../shared/attributes';
import { styles } from '../styles';

import { Colors, Sizes } from '../bulma-types';

@customElement('b-addon')
export class BAddon extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) fullwidth: boolean = false;
  @property({ type: Boolean }) static: boolean = false;
  @property({ type: String }) color?: Colors;
  @property({ type: String }) size?: Sizes;

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.classList.add('control');
    if (this.fullwidth) this.classList.add('is-expanded');
  }
  render() {
    const classes = {
      [`is-${this.color}`]: !!this.color,
      [`is-static`]: !!this.static,
      [`is-${this.size}`]: !!this.size,
      button: true
    };
    return html`
      <a class="${classMap(classes)}">${this.firstChild}</a>
    `;
  }
}