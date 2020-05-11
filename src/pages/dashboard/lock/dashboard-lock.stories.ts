import { html } from 'lit-element';
import './dashboard-lock';

export default { title: 'atx-dashboard-lock' };

export const basic = () => {
  return html`
    <atx-dashboard-lock></atx-dashboard-lock>
  `.getHTML();
};
