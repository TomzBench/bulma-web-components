import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { writeAttribute, readAttribute } from '../../shared/attributes';
import { Sizes, Colors } from '../bulma-types';
import { BField } from './field';

import { styles } from '../styles';

@customElement('b-field-horizontal')
class BFieldHorizontal extends BField {
  static styles = styles(styles.toString());
  render() {
    const classes = this.makeClasses();
    return html`
      <div class="field is-horizontal ${classMap(classes.field)}">
        <div class="field-label is-normal">
          <label class="${classMap(classes.label)}">${this.label}</label>
        </div>
        <div class="field-body">
          ${Array.from(this.children).map(c =>
            c.classList.contains('field')
              ? c
              : html`
                  <div class="field">${c}</div>
                `
          )}
        </div>
      </div>
    `;
  }
}
