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

@customElement('b-field')
class BField extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) horizontal: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) size?: Sizes;
  @property({ type: String }) color?: Colors;
  addons: HTMLElement[] = [];
  inputs: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addons = Array.from(this.querySelectorAll('b-addon'));
    this.inputs = Array.from(this.querySelectorAll('b-input'));
    console.log(this.addons);
  }

  render() {
    const classes = {
      field: {
        field: true,
        'is-horizontal': this.horizontal,
        'has-addons': this.addons.length,
        'is-grouped': false
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
        <!-- INPUTS -->
        ${this.inputs}
        <!-- ADDONS -->
        ${this.addons}
      </div>
    `;
  }
}
