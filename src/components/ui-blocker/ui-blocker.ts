import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import * as style from './ui-blocker.styles.scss';
import { styles } from '../bulma/styles';

import '../material/circular-progress/circular-progress';

@customElement('atx-ui-blocker')
class AtxUiBlocker extends LitElement {
  @property({ type: Number }) transition: number = 100;
  static styles = styles(styles.toString());

  render() {
    return html`
      <div class=""><slot></slot></div>
      <div class="hero is-fullheight">
        <div class="hero-body">
          <m-circular-progress
            class="loading"
            size="large"
          ></m-circular-progress>
        </div>
      </div>
    `;
  }
}
