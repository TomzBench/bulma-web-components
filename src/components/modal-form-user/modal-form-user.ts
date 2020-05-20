import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './modal-form-user.styles.scss';

@customElement('atx-modal-form-user')
export class AtxModalFormUser extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Boolean }) show: boolean = false;
  close() {
    this.show = false;
  }
  render() {
    return html`
      <b-modal @b-close="${this.close}" ?show="${this.show === true}">
        <div class="is-clipped">
          <div class="box">
            <p class="subtitle is-size-6 has-text-weight-light">
              Add a new user...
            </p>
            <atx-form-user></atx-form-user>
          </div>
        </div>
      </b-modal>
    `;
  }
}
