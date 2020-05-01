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
import { writeAttribute, readAttribute } from '../../shared/attributes';
import { Sizes, Colors } from '../bulma-types';

@customElement('b-field')
class BField extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) horizontal: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) size?: Sizes;
  @property({ type: String }) color?: Colors;
  @property({ type: Boolean }) grouped: boolean = false;
  addons: HTMLElement[] = [];
  inputs: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addons = Array.from(this.querySelectorAll('b-addon'));
    this.inputs = Array.from(this.querySelectorAll('b-input'));
    Array.from(this.children).forEach(i => {
      if (this.size) writeAttribute(i, 'size', this.size);
      if (this.color && !readAttribute(i, 'color')) {
        writeAttribute(i, 'color', this.color);
      }
    });
  }

  render() {
    const hasAddons = this.addons.length && !this.grouped;
    const grouped = this.addons.length || this.inputs.length >= 2;
    const isGrouped = this.grouped && grouped;
    const classes = {
      field: {
        field: true,
        'is-horizontal': this.horizontal,
        'has-addons': hasAddons,
        'is-grouped': isGrouped
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
        ${this.label && !(hasAddons || isGrouped)
          ? html`
              <label class="${classMap(classes.label)}">${this.label}</label>
            `
          : ``}
        ${Array.from(this.children)}
      </div>
    `;
  }
}
