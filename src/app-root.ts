import 'reflect-metadata';
import { customElement, LitElement, html } from 'lit-element';
import './app';
import './app-provider';

@customElement('atx-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <atx-provider>
        <atx-app></atx-app>
      </atx-provider>
    `;
  }
}
