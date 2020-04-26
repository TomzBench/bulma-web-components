import * as style from './material-top-app-bar.scss';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import { topAppBarWithStyles } from '@material/mwc-top-app-bar';
export const topAppBar = topAppBarWithStyles(style.toString());
export default topAppBar;
