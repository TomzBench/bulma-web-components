import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../components/bulma/styles';
import * as scss from './modal-message.styles.scss';

@customElement('atx-modal-message')
export class AtxModalMessage extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Boolean }) show: boolean = false;
  @property({ type: String }) type: string = 'info';
  @property({ type: String }) message: string = '';

  close() {
    this.show = false;
  }

  render() {
    const icon = this.type === 'info' ? 'info' : 'warning';
    console.log(icon);
    return html`
      <b-modal @b-close="${this.close}" ?show="${this.show}">
        <div class="popup is-clipped">
          <div class="box">
            <div class="container has-text-centered">
              <b-icon color="${this.type}" icon="${icon}"/></b-icon>
              ${
                this.message
                  ? html`
                      <p class="popup-title">${this.message}</p>
                    `
                  : html`
                      <slot></slot>
                    `
              }
            </div>
          </div>
        </div>
      </b-modal>
    `;
  }
}
