import {
  LitElement,
  customElement,
  html,
  property,
  query,
  queryAll
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';
import { readAttribute } from '../../shared/attributes';
import { Sizes, Colors } from '../bulma-types';

/*
 * <b-field horizontal>
 *   <input slot="input"/>
 * </b-field>
 */

@customElement('b-field')
class BField extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) horizontal: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) size?: Sizes;
  @property({ type: String }) color?: Colors;

  render() {
    const addons = false;
    const grouped = false;
    const classes = {
      field: {
        field: true,
        'is-horizontal': this.horizontal,
        'has-addons': addons,
        'is-grouped': grouped
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
    return html`
      <div class="field ${classMap(classes.field)}">
        ${this.label
          ? html`
              <label class="${classMap(classes.label)}">${this.label}</label>
            `
          : ``}
        <slot></slot>
      </div>
    `;
  }
}
