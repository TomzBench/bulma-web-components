import {
  LitElement,
  eventOptions,
  customElement,
  html,
  property,
  query
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { readAttribute } from '../../shared/attributes';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Sizes, Colors, TextFieldType } from '../bulma-types';

import { styles } from '../styles';

@customElement('b-input')
export class BInput extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: String }) size?: Sizes;
  @property({ type: String }) color?: Colors;
  @property({ type: String }) label?: string;
  @property({ type: String }) help?: string;
  @property({ type: String }) type: TextFieldType = 'text';
  @property({ type: String }) value: string = '';
  // @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) expanded: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readOnly = false;
  @property({ type: Number }) maxLength = -1;
  @property({ type: String }) pattern = '';
  @property({ type: Number }) min: number | string = '';
  @property({ type: Number }) max: number | string = '';
  @property({ type: Number }) step: number | null = null;
  icons: HTMLElement[] = [];
  iconsLeft: boolean = false;
  iconsRight: boolean = false;

  protected handleInputChange() {}

  connectedCallback() {
    super.connectedCallback();
    this.iconsLeft = this.querySelectorAll('.is-left').length ? true : false;
    this.iconsRight = this.querySelectorAll('.is-right').length ? true : false;
    this.icons = Array.from(this.querySelectorAll('.icon'));
    this.icons.forEach(i => {
      if (readAttribute(i, 'is-left')) {
        this.iconsLeft = true;
      } else if (readAttribute(i, 'is-right')) {
        this.iconsRight = true;
      }
    });
    console.log(this.icons);
    this.classList.add('FOOFOOTEST');
  }

  render() {
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    const classes = {
      ['is-expanded']: this.expanded,
      [`is-${this.size}`]: !!this.size,
      ['has-icons-left']: this.iconsLeft,
      ['has-icons-right']: this.iconsRight
    };
    return html`
      <div class="control ${classMap(classes)}">
        <input
          class="input"
          aria-labelledby="label"
          type="${this.type}"
          .value="${this.value}"
          ?disabled="${false}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          maxlength="${ifDefined(maxOrUndef)}"
          pattern="${ifDefined(this.pattern ? this.pattern : undefined)}"
          min="${ifDefined(this.min === '' ? undefined : (this.min as number))}"
          max="${ifDefined(this.max === '' ? undefined : (this.max as number))}"
          step="${ifDefined(this.step === null ? undefined : this.step)}"
          inputmode="${ifDefined(this.inputMode)}"
          @input="${this.handleInputChange}"
        />
        <!-- ICONS HERE -->
        ${this.icons}
      </div>
      <!-- ADDONS HERE -->
    `;
  }
}
