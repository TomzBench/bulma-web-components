import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';

type Size = 'small' | 'medium' | 'large' | 'normal';
type Color = 'primary' | 'info' | 'succes' | 'warning' | 'danger';
interface Attributes {
  label: string;
  icon: string; // iconLeft alias
  iconLeft: string;
  iconRight: string;
  size: string;
  color: string;
  theme: string;
  loading: boolean;
  help: string;
}

@customElement('bulma-field')
class BulmaInput extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) horizontal: boolean = false;
  @property({ type: String }) label: string = '';
  @property({ type: String }) size: Size | undefined = undefined;
  @property({ type: String }) color: Color | undefined = undefined;

  // Read callers <input /> attributes relevant to our component
  readAttribute<T extends string | boolean = string>(
    input: HTMLInputElement,
    key: keyof Attributes
  ): T | undefined {
    let attr = input.attributes.getNamedItem(key);
    return attr ? (attr.value ? (attr.value as T) : (true as T)) : undefined;
  }

  // Render an icon on left or right of the input
  renderIcon(
    icon: string,
    size: Size | undefined = 'medium',
    where: 'left' | 'right'
  ) {
    const classes = {
      icon: true,
      [`is-${where}`]: true,
      [`is-${size}`]: !!size
    };

    return html`
      <span class="${classMap(classes)}">
        <i class="material-icons">${icon}</i>
      </span>
    `;
  }

  renderLabel(label: string, size?: Size) {
    const classes = {
      [`is-${size}`]: true,
      label: true
    };
    return html`
      <label class="${classMap(classes)}">${label}</label>
    `;
  }

  // Render help text
  renderHelp(help: string, color?: Color) {
    const classes = { help: true, [`is-${color}`]: !!color };
    return html`
      <p class="${classMap(classes)}">${help}</p>
    `;
  }

  // Render the input element surround with <field><control> classes
  renderInput(input: HTMLInputElement, l: string | undefined = undefined) {
    const label = this.readAttribute(input, 'label') || l;
    const iconLeft =
      this.readAttribute(input, 'iconLeft') ||
      this.readAttribute(input, 'icon');
    const iconRight = this.readAttribute(input, 'iconRight');
    const size = this.readAttribute<Size>(input, 'size') || this.size;
    const color = this.readAttribute<Color>(input, 'color');
    const theme = this.readAttribute(input, 'theme');
    const loading = this.readAttribute<boolean>(input, 'loading');
    const help = this.readAttribute(input, 'help');
    const classes = {
      control: true,
      [`is-${size}`]: !!size,
      'has-icons-left': !!iconLeft,
      'has-icons-right': !!iconRight,
      'is-loading': !!loading
    };

    input.classList.add('input');
    if (size) input.classList.add(`is-${size}`);
    if (color) input.classList.add(`is-${color}`);

    // Read iconRight
    return html`
      <div class="field">
        ${label ? this.renderLabel(label, size) : ''}
        <div class="${classMap(classes)}">
          ${input} ${iconLeft ? this.renderIcon(iconLeft, size, 'left') : ''}
          ${iconRight ? this.renderIcon(iconRight, size, 'right') : ''}
        </div>
        ${help ? this.renderHelp(help, color) : ''}
      </div>
    `;
  }

  // Render the callers inputs per horizontal structure layout
  renderHorizontal() {
    let size = this.size ? `is-${this.size}` : 'is-medium';
    let inputs: HTMLInputElement[] = [];
    this.querySelectorAll('input').forEach(i => inputs.push(i));
    return html`
      <div class="field is-horizontal">
        <div class="field-label ${size}">
          <label class="label">${this.label}</label>
        </div>
        <div class="field-body">
          ${inputs.map(i => this.renderInput(i))}
        </div>
      </div>
    `;
  }

  // Render the callers inputs per vertical structure layout
  renderVertical() {
    let inputs: HTMLInputElement[] = [];
    this.querySelectorAll('input').forEach(i => inputs.push(i));
    return html`
      ${inputs.map(i => this.renderInput(i, this.label))}
    `;
  }

  // Render callers inputs
  render() {
    return this.horizontal ? this.renderHorizontal() : this.renderVertical();
  }
}
