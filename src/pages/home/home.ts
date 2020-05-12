import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../components/bulma/styles';
import * as scss from './home.styles.scss';
import * as logo from '../../assets/altronix_logo_large.png';

@customElement('atx-home')
export class AtxHome extends LitElement {
  static styles = styles(scss.toString());

  render() {
    return html`
      <div class="home">
        <div class="hero is-fullheight">
          <atx-topnav>
            <a href="/dashboard">Dashboard</a>
          </atx-topnav>
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title"><img src="${logo}" /></h1>
              <h1 class="title has-text-weight-light">
                Altronix Device Portal
              </h1>
              <button class="button is-primary">
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
