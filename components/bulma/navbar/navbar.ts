import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';

import { readAttribute } from '../../shared/attributes';

@customElement('bulma-navbar')
class BulmaNavbar extends LitElement {
  elementChildren: Array<Element> = [];
  @property({ type: String }) color: string | undefined = undefined;
  @query('.navbar-start') start!: HTMLElement;
  @query('.navbar-end') end!: HTMLElement;
  @query('.navbar-menu') menu!: HTMLElement;
  @query('.logo') logo!: HTMLElement;

  // createRenderRoot() {
  //   return this;
  // }

  firstUpdated() {
    this.renderNavs();
  }

  renderNavs() {
    Array.from(this.children).forEach(e => {
      if (readAttribute(e, 'start')) {
        this.start.appendChild(e);
      } else if (readAttribute(e, 'end')) {
        this.end.appendChild(e);
      } else if (readAttribute(e, 'logo')) {
        this.logo.appendChild(e);
      }
    });
  }

  render() {
    const classes = { [`is-${this.color}`]: !!this.color };
    return html`
      <div class="navbar ${classMap(classes)}" role="navigation">
        <div class="navbar-brand">
          <a class="navbar-item logo" href=""><slot name="logo"></slot></a>
          <a
            class="navbar-burger burger"
            role="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="brandButton"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end"></div>
        </div>
      </div>
      <style>
        ${styles('')}
      </style>
    `;
  }
}
