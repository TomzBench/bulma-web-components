import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';
import '../bulma-base';

import { readAttribute } from '../../shared/attributes';

@customElement('bulma-navbar')
class BulmaNavbar extends LitElement {
  static styles = styles(styles.toString());
  @property({ type: String }) color: string | undefined = undefined;
  @query('.navbar-start') start!: HTMLElement;
  @query('.navbar-end') end!: HTMLElement;

  firstUpdated() {
    this.renderNavs();
  }

  renderNavs() {
    Array.from(this.children).forEach(e => {
      console.log(e);
      if (readAttribute(e, 'start')) {
        this.start.appendChild(e);
      } else if (readAttribute(e, 'end')) {
        this.start.appendChild(e);
      }
    });
  }

  render() {
    const classes = { [`is-${this.color}`]: !!this.color };
    return html`
      <div class="navbar ${classMap(classes)}" role="navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href=""><slot name="logo"></slot></a>
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
    `;
  }
}
