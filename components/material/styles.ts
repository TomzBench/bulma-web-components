import material from './material';
import { unsafeCSS } from 'lit-element';

export const styles = (style: string) => [material(), unsafeCSS(style)];
export default styles;
