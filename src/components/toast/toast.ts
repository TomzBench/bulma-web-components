import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Sizes, Colors } from '../bulma/bulma-types';
import { styles } from '../bulma/styles';
import * as scss from './toast.styles.scss';

@customElement('atx-toast')
class AtxToast extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: String }) message: string = '';
  @property({ type: Boolean }) light: boolean = false;
  @property({ type: String }) color: Colors = 'info';
  render() {
    const classes = {
      [`is-${this.color}`]: !!this.color,
      [`is-light`]: !!this.light
    };
    return html`
      <div class="toast notification ${classMap(classes)}">
        <button class="delete"></button>
        ${this.firstChild}
      </div>
    `;
  }
}
