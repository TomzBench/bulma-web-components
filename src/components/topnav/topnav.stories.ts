import { html } from 'lit-element';
import './topnav';

export default { title: 'atx-topnav' };

export const basic = () =>
  html`
    <atx-topnav></atx-topnav>
  `.getHTML();

export const raw = () =>
  html`
    <atx-topnav-raw></atx-topnav-raw>
  `.getHTML();
