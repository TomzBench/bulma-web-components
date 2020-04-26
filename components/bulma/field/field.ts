import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';

type Size = 'small' | 'medium' | 'large';
// type Class = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
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
  @property({ type: String }) size: string = '';

  // Append the bulma class to callers input element
  appendClass(input: HTMLInputElement, cl: string) {
    let attr =
      input.attributes.getNamedItem('class') ||
      document.createAttribute('class');
    attr.value += ' ' + cl;
    input.attributes.setNamedItem(attr);
  }

  // Read callers <input /> attributes relevant to our component
  readAttribute<T extends string | boolean = string>(
    input: HTMLInputElement,
    key: keyof Attributes
  ): T | undefined {
    let attr = input.attributes.getNamedItem(key);
    return attr ? (attr.value as T) : undefined;
  }

  // Render an icon on left or right of the input
  renderIcon(
    icon: string,
    size: Size | undefined = 'medium',
    where: 'left' | 'right'
  ) {
    const classes = {
      icon: true,
      'is-left': where === 'left',
      'is-right': where === 'right',
      'is-small': size === 'small',
      'is-medium': size === 'medium',
      'is-large': size === 'large'
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
  renderHelp() {}

  // Render the input element surround with <field><control> classes
  renderInput(input: HTMLInputElement, l: string | undefined = undefined) {
    const label = this.readAttribute(input, 'label') || l;
    const iconLeft =
      this.readAttribute(input, 'iconLeft') ||
      this.readAttribute(input, 'icon');
    const iconRight = this.readAttribute(input, 'iconRight');
    const size = this.readAttribute<Size>(input, 'size');
    const color = this.readAttribute(input, 'color');
    const theme = this.readAttribute(input, 'theme');
    const loading = this.readAttribute<boolean>(input, 'loading');
    const help = this.readAttribute(input, 'help');
    const classes = {
      control: true,
      'has-icons-left': !!iconLeft,
      'has-icons-right': !!iconRight
    };

    this.appendClass(input, 'input');
    if (size) this.appendClass(input, `is-${size}`);

    // Read iconRight
    return html`
      <div class="field">
        ${label ? this.renderLabel(label, size) : ''}
        <div class="${classMap(classes)}">
          ${input} ${iconLeft ? this.renderIcon(iconLeft, size, 'left') : ''}
          ${iconRight ? this.renderIcon(iconRight, size, 'right') : ''}
        </div>
      </div>
    `;
  }

  // Render the callers inputs per horizontal structure layout
  renderHorizontal() {
    let inputs: HTMLInputElement[] = [];
    this.querySelectorAll('input').forEach(i => inputs.push(i));
    return html`
      <div class="field is-horizontal">
        <div class="field-label is-normal">
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
