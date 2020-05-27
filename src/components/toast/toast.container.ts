import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Sizes, Colors } from '../bulma/bulma-types';
import { styles } from '../bulma/styles';
import * as scss from './toast.styles.scss';

type Positions =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';
@customElement('atx-toast-container')
class AtxToastContainer extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: String }) position: Positions = 'bottom-right';
  render() {
    return html`
      <div class="toast-container ${this.position}">
        <slot></slot>
      </div>
    `;
  }
}
