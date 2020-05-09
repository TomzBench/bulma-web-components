import { html } from 'lit-element';
import './dashboard';

export default { title: 'atx-dashboard' };

export const basic = () => {
  return html`
    <atx-dashboard></atx-dashboard>
  `.getHTML();
};
