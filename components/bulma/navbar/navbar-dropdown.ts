import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';
import { Colors, Sizes, NavbarWhere, NODE_TYPES } from '../bulma-types';

@customElement('b-navbar-dropdown')
class BNavbarDropdown extends LitElement {
  items: HTMLElement[] = [];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.items = Array.from(this.querySelectorAll('b-navbar-item'));
    console.log(this.items);
  }

  render() {
    console.log(this.items);
    this.classList.add('navbar-dropdown');
    return html`
      ${this.items}
    `;
  }
}
