import { html } from 'lit-element';
import './chart';

export default { title: 'atx-chart' };

export const basic = () => {
  return html`
    <atx-chart></atx-chart>
  `.getHTML();
};
