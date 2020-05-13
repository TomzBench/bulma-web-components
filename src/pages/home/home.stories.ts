import { html } from 'lit-element';
import './home';
import '../../app-provider';

export default { title: 'atx-home' };

export const basic = () => {
  return html`
    <atx-provider><atx-home></atx-home></atx-provider>
  `.getHTML();
};
