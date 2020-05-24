import { html } from 'lit-element';
import { AtxDeviceMedia } from './device-media';

export default { title: 'atx-device-media' };

export const basic = () => {
  return html`
    <atx-device-media></atx-device-media>
  `.getHTML();
};
