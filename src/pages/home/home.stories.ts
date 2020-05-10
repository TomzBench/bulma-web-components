import { html } from 'lit-element';
import './home';

export default { title: 'atx-home' };

export const basic = () => {
  return html`
    <atx-home></atx-home>
  `.getHTML();
};
