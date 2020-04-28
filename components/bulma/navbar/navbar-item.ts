import { LitElement, customElement, html, property, query } from 'lit-element';
import { TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';

@customElement('bulma-navbar-item')
class BulmaNavbarItem extends LitElement {
  // static styles = styles(styles.toString());
  @property({ type: Boolean }) dropdown: boolean = false;
  @property({ type: String }) icon: string | undefined = undefined;
  @property({ type: String }) label: string = '';
  elementChildren: Element[] = [];

  createRenderRoot() {
    // This means we can't use callers styles in our children node...
    // This component is tightly coupled with bulma and expects our styles is used
    // Also we cannot use <slot>
    return this;
  }

  connectedCallback() {
    this.elementChildren = Array.from(this.children);
    super.connectedCallback();
  }

  render() {
    return this.dropdown
      ? html`
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">${this.label}</a>
            <div class="navbar-dropdown">
              ${this.elementChildren}
            </div>
          </div>
        `
      : html`
          <a class="navbar-item">${this.label}</a>
        `;
  }
}
