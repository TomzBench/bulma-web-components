import * as scss from './material-scss.scss';
import { unsafeCSS } from 'lit-element';

export const material = () => unsafeCSS(scss.toString());
export default material;
