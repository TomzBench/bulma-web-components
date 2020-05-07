import 'reflect-metadata';
import { customElement, LitElement, html } from 'lit-element';
import { SYMBOLS } from './ioc/constants.root';
import { lazyInject } from './ioc/container.root';
import { IoService } from './io/io.service';
import { styles } from './components/bulma/styles';
import * as scss from './app.styles.scss';

import './components/topnav/topnav';

@customElement('atx-app')
export class App extends LitElement {
  static styles = styles(scss.toString());
  @lazyInject(SYMBOLS.IO_SERVICE) io!: IoService;

  async connectedCallback() {
    super.connectedCallback();
    let result = await this.io.get('foo').catch(e => e);
    console.log(result);
  }
  render() {
    return html`
      <atx-topnav></atx-topnav>
    `;
  }
}
