import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './topnav.styles.scss';
import * as logo from '../../assets/altronix_logo.png';

import '../bulma/field/field';
import '../bulma/icon/icon';
import '../bulma/navbar/navbar';
import '../bulma/navbar/navbar-label';
import '../bulma/navbar/navbar-item';
import '../bulma/navbar/navbar-dropdown';

@customElement('atx-topnav')
export class AtxTopnav extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <b-navbar color="primary">
        <b-navbar-item where="brand">
          <img src="${logo}" height="32px" />
        </b-navbar-item>
        <b-navbar-item>
          <b-navbar-label>
            <b-icon>settings</b-icon>
            Settings
          </b-navbar-label>
          <b-navbar-dropdown>
            <b-navbar-item><b-icon>account_circle</b-icon>Users</b-navbar-item>
            <b-navbar-item><b-icon>device_hub</b-icon>Devices</b-navbar-item>
          </b-navbar-dropdown>
        </b-navbar-item>
        <b-navbar-item>
          <b-navbar-label>
            <b-icon>description</b-icon>
            Docs
          </b-navbar-label>
          <b-navbar-dropdown>
            <b-navbar-item>API</b-navbar-item>
            <b-navbar-item>DashboardV12</b-navbar-item>
            <b-navbar-item>LinQM5</b-navbar-item>
            <b-navbar-item>SDK</b-navbar-item>
            <b-navbar-item>C++</b-navbar-item>
            <b-navbar-item>NodeJS</b-navbar-item>
            <b-navbar-item>Rust</b-navbar-item>
          </b-navbar-dropdown>
        </b-navbar-item>
        <b-navbar-item where="right">
          Sign In
          <b-icon>account_circle</b-icon>
        </b-navbar-item>
      </b-navbar>
    `;
  }
}
