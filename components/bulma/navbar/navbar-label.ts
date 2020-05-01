import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

@customElement('b-navbar-label')
class BNavbarLabel extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    this.classList.add('b-navbar-label');
    return html`
      ${Array.from(this.children)}
    `;
  }
}
