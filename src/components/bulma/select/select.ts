import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { readAttribute } from '../../shared/attributes';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Sizes, Colors, TextFieldType } from '../bulma-types';

import { styles } from '../styles';

interface HelpArgs {
  color?: Colors;
  help?: string;
}

@customElement('b-select')
export class BSelect extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: String }) size?: Sizes;
  @property({ type: String }) color?: Colors;
  @property({ type: Boolean }) rounded: boolean = false;
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
  options: HTMLOptionElement[] = [];

  protected handleSelectChange() {}

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.icons = Array.from(this.querySelectorAll('b-icon'));
    this.options = Array.from(this.querySelectorAll('option')); // TODO - b-option
  }

  renderHelp({ help, color }: HelpArgs) {
    const classes = { [`is-${color}`]: !!color };
    return help
      ? html`
          <p class="help ${classMap(classes)}">${help}</p>
        `
      : ``;
  }

  render() {
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    let iconsLeft = false;
    let iconsRight = false;
    const color = this.color;
    const help = this.help;
    this.icons.forEach(i => {
      if (i.classList.contains('is-left')) {
        iconsLeft = true;
      } else if (i.classList.contains('is-right')) {
        iconsRight = true;
      }
    });
    this.classList.add('control');
    if (this.expanded) this.classList.add('is-expanded');
    if (this.size) this.classList.add(`is-${this.size}`);
    if (iconsLeft) this.classList.add('has-icons-left');
    if (iconsRight) this.classList.add('has-icons-right');
    const classes = {
      select: true,
      ['is-fullwidth']: !!this.expanded,
      [`is-${this.color}`]: !!this.color,
      [`is-${this.size}`]: !!this.size,
      [`is-rounded`]: !!this.rounded
    };
    return html`
      <div class="${classMap(classes)}">
        <select
          class="select"
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
          @input="${this.handleSelectChange}"
        >
          ${this.options}
        </select>
      </div>
      <!-- ICONS HERE -->
      ${this.icons}
      <!-- HELP -->
      ${this.renderHelp({ help, color })}
    `;
  }
}
