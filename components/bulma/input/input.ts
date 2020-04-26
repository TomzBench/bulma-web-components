import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../styles';

@customElement('bulma-input')
class BulmaInput extends LitElement {
  @property({ type: String }) theme = 'default';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'small';
  render() {
    const classes = {};
    return html`
      <div class="field">
        <div class="control">
          <input class="input is-primary" placeholder="placeholder" />
        </div>
      </div>
    `;
  }
}
