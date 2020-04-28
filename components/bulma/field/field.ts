import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Sizes, Colors } from './types';
import { styles } from '../styles';

import { input } from '../input/input';
import { select } from '../select/select';
import { setAttribute, makeAttribute } from '../../shared/attributes';

@customElement('bulma-field')
class BulmaField extends LitElement {
  static styles = styles('');
  @property({ type: Boolean }) horizontal: boolean = false;
  @property({ type: Boolean }) grouped: boolean = false;
  @property({ type: Boolean }) addons: boolean = false;
  @property({ type: String }) label: string | undefined = undefined;
  @property({ type: String }) size: Sizes | undefined = undefined;
  @property({ type: String }) color: Colors | undefined = undefined;

  renderChildren() {
    return Array.from(this.children).map((e: Element) => {
      if (e instanceof HTMLInputElement) {
        if (this.size) setAttribute(e, makeAttribute('size', this.size));
        if (this.color) setAttribute(e, makeAttribute('color', this.color));
        return input(e);
      } else if (e instanceof HTMLSelectElement) {
        if (this.size) setAttribute(e, makeAttribute('size', this.size));
        if (this.color) setAttribute(e, makeAttribute('color', this.color));
        return select(e);
      } else if (e instanceof BulmaField) {
        return e;
      } else {
        return e;
      }
    });
  }

  render() {
    const classes = {
      field: {
        field: true,
        'is-horizontal': this.horizontal,
        'has-addons': this.addons,
        'is-grouped': this.grouped
      },
      'field-label': {
        [`is-${this.size}`]: !!this.size,
        'is-normal': true //!this.size
      },
      label: {
        label: true,
        [`is-${this.size}`]: !!this.size
      }
    };
    return this.horizontal
      ? html`
          <div class="field ${classMap(classes.field)}">
            <div class="field-label ${classMap(classes['field-label'])}">
              ${this.label
                ? html`
                    <label class="${classMap(classes.label)}">
                      ${this.label}
                    </label>
                  `
                : ''}
            </div>
            <div class="field-body">
              ${this.renderChildren().map(
                el =>
                  html`
                    <div class="field">${el}</div>
                  `
              )}
            </div>
          </div>
        `
      : html`
          <div class="${classMap(classes.field)}">
            ${this.label &&
              html`
                <label class="${classMap(classes.label)}">${this.label}</label>
              `}
            ${this.renderChildren()}
          </div>
        `;
  }
}
