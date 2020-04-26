import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { Menu } from '@material/mwc-menu';

import { styles } from '../material';
import * as style from './top-bar.scss';

import '../material/material-top-app-bar';
import '../material/material-menu';

@customElement('ldp-top-bar')
export class TopBar extends LitElement {
  static styles = styles(style.toString());
  @property({ type: String }) theme: string = 'default';
  @property({ type: String }) title: string = '';

  render() {
    const c = {};
    return html`
      <m-top-app-bar class="${this.theme}" dense>
        <div slot="title">${this.title}</div>
        <span slot="actionItems" class="top-bar__button">
          <p>foo</p>
        </span>
        <span slot="actionItems" class="top-bar__button">
          <p>bar</p>
        </span>
      </m-top-app-bar>
    `;
  }
}

export default TopBar;
