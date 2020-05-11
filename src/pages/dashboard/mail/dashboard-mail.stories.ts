import { html } from 'lit-element';
import './dashboard-mail';

export default { title: 'atx-dashboard-mail' };

export const basic = () => {
  return html`
    <atx-dashboard-mail></atx-dashboard-mail>
  `.getHTML();
};
