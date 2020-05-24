import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './device-media.styles.scss';
import * as eflow from '../../assets/eflow.jpg';

@customElement('atx-device-media')
export class AtxDeviceMedia extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <artical class="media">
        <figure class="media-left">
          <img src="${eflow}" />
        </figure>
        <div class="media-content">
          <div class="content">
            <p class="title is-size-4">Eflow</p>
            <p class="subtitle is-size-6 has-text-grey">Serial: cc4x89...</p>
          </div>
        </div>
        <div class="media-right">
          <div class="icon-container">
            <b-icon color="info" icon="visibility"></b-icon>
            <b-icon color="success" icon="all_out"></b-icon>
            <b-icon color="danger" icon="delete"></b-icon>
            <b-icon><p class="is-size-5 has-text-grey">32s</p></b-icon>
          </div>
        </div>
      </artical>
    `;
  }
}
