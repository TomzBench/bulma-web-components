import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Sizes, Colors } from './types';
import { styles } from '../styles';

import { input } from '../input/input';
import { setAttribute, makeAttribute } from '../../shared/attributes';

@customElement('bulma-field')
class BulmaField extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) horizontal: boolean = false;
  @property({ type: Boolean }) grouped: boolean = false;
  @property({ type: Boolean }) addons: boolean = false;
  @property({ type: String }) label: string | undefined = undefined;
  @property({ type: String }) size: Sizes | undefined = undefined;
  @property({ type: String }) color: Colors | undefined = undefined;

  render() {
    const classes = {
      field: {
        field: true,
        'has-addons': this.addons,
        'is-grouped': this.grouped
      },
      label: {
        label: true,
        [`is-${this.size}`]: !!this.size
      }
    };
    return html`
      <div class="${classMap(classes.field)}">
        ${this.label &&
          html`
            <label class="${classMap(classes.label)}">${this.label}</label>
          `}
        ${Array.from(this.children).map((e: Element) => {
          if (e instanceof HTMLInputElement) {
            if (this.size) setAttribute(e, makeAttribute('size', this.size));
            if (this.color) setAttribute(e, makeAttribute('color', this.color));
            return input(e);
          } else {
            return e;
          }
        })}
      </div>
    `;
  }
}
