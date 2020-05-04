import { bulma } from './bulma';
import { unsafeCSS } from 'lit-element';

export const styles = (style: string) => [bulma(), unsafeCSS(style)];
export default styles;
