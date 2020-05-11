import { html } from 'lit-element';
import './dashboard-power';

export default { title: 'atx-dashboard-power' };

export const basic = () => {
  return html`
    <atx-dashboard-power></atx-dashboard-power>
  `.getHTML();
};
