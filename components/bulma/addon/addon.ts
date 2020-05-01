import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { readAttribute } from '../../shared/attributes';
import { styles } from '../styles';

@customElement('b-addon')
export class BAddon extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) fullwidth: boolean = false;
  @property({ type: Boolean }) static: boolean = false;

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.classList.add('control');
    if (this.fullwidth) this.classList.add('is-expanded');
  }
  render() {
    const classes = { [`is-static`]: !!this.static, button: true };
    return html`
      <a class="${classMap(classes)}">${this.firstChild}</a>
    `;
  }
}
