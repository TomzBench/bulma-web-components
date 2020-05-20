import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './modal-login.styles.scss';
import '../bulma/modal/modal';

@customElement('atx-modal-login')
export class AtxModalLogin extends LitElement {
  _show: boolean = false;
  static styles = styles(scss.toString());
  show() {
    this._show = true;
    this.requestUpdate();
  }
  close() {
    this._show = false;
    this.requestUpdate();
  }
  render() {
    return html`
      <b-modal @b-close="${this.close}" ?show="${this._show === true}">
        <div class="signin is-clipped">
          <div class="box">
            <p class="subtitle is-size-6 has-text-weight-light">
              Please sign in...
            </p>
            <atx-form-login></atx-form-login>
          </div>
        </div>
      </b-modal>
    `;
  }
}
