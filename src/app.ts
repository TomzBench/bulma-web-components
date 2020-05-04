import { customElement, LitElement, html } from 'lit-element';
import { SYMBOLS } from './ioc/constants.root';
import { lazyInject } from './ioc/ioc';
import { IoRequester } from './io/types';
import { styles } from './components/bulma/styles';
import * as scss from './app.styles.scss';

import './components/topnav/topnav.ts';

@customElement('atx-app')
export class App extends LitElement {
  static styles = styles(scss.toString());
  @lazyInject(SYMBOLS.IO_SERVICE) io!: IoRequester;
  constructor() {
    super();
  }
  render() {
    return html`
      <atx-topnav></atx-topnav>
    `;
  }
}
