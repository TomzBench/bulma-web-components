import { html } from 'lit-element';
import './dashboard-main';

export default { title: 'atx-dashboard-main' };

export const basic = () => {
  return html`
    <atx-dashboard-main></atx-dashboard-main>
  `.getHTML();
};
