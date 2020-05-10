import { html } from 'lit-element';
import './dashboard-account';

export default { title: 'atx-dashboard-account' };

export const basic = () => {
  return html`
    <atx-dashboard-account></atx-dashboard-account>
  `.getHTML();
};
