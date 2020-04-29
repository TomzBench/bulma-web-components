import { html } from 'lit-element';
import './topnav.ts';

export default { title: 'atx-topnav' };

export const basic = () =>
  html`
    <atx-topnav></atx-topnav>
  `.getHTML();
