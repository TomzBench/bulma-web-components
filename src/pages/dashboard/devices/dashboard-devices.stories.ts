import { html } from 'lit-element';
import './dashboard-devices';

export default { title: 'atx-dashboard-devices' };

export const basic = () => {
  return html`
    <atx-dashboard-devices></atx-dashboard-devices>
  `.getHTML();
};
