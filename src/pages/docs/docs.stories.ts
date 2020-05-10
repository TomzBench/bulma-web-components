import { html } from 'lit-element';
import './docs';

export default { title: 'atx-docs' };

export const basic = () => {
  return html`
    <atx-docs></atx-docs>
  `.getHTML();
};
