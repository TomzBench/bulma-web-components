import { html } from 'lit-element';
import './user-table.ts';

export default { title: 'atx-user-table' };

export const basic = () =>
  html`
    <atx-user-table></atx-user-table>
  `.getHTML();
