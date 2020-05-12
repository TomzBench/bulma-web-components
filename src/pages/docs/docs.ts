import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../components/bulma/styles';
import * as scss from './docs.styles.scss';

@customElement('atx-docs')
export class AtxDocs extends LitElement {
  static styles = styles(scss.toString());

  render() {
    return html`
      <div class="hero is-fullheight">
        <atx-topnav></atx-topnav>
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Under Construction</h1>
          </div>
        </div>
      </div>
    `;
  }
}
