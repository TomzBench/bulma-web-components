import { html } from 'lit-element';
import './logout';
import '../../app-provider';

export default { title: 'atx-logout' };

export const basic = () => {
  return html`
    <atx-provider><atx-logout></atx-logout></atx-provider>
  `.getHTML();
};
