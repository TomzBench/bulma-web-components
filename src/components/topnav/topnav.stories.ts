import { html } from 'lit-element';
import '../../app-root';
import '../../app-provider';
import './topnav';

export default { title: 'atx-topnav' };

export const basic = () =>
  html`
    <atx-provider><atx-topnav></atx-topnav></atx-provider>
  `.getHTML();
