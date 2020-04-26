import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';

@customElement('bulma-field')
class BulmaInput extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: Boolean }) horizontal: boolean = false;
  @property({ type: String }) label: string = '';
  @property({ type: String }) size: string = '';

  renderInput(input: HTMLInputElement, label: string | undefined = undefined) {
    // Add input bulma class
    let c =
      input.attributes.getNamedItem('class') ||
      document.createAttribute('class');
    c.value += ' input';
    input.attributes.setNamedItem(c);
    // Add label
    label = (() => {
      if (label) return label;
      let attr = input.attributes.getNamedItem('label');
      return attr ? attr.value : undefined;
    })();
    return html`
      <div class="field">
        ${label
          ? html`
              <label class="label">${label}</label>
            `
          : null}
        <div class="control">
          ${input}
        </div>
      </div>
    `;
  }

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

  renderVertical() {
    let inputs: HTMLInputElement[] = [];
    this.querySelectorAll('input').forEach(i => inputs.push(i));
    return html`
      ${inputs.map(i => this.renderInput(i, this.label))}
    `;
  }

  render() {
    return this.horizontal ? this.renderHorizontal() : this.renderVertical();
  }
}
