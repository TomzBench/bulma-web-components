import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './topnav.scss';
import * as logo from '../../assets/altronix_logo.png';

import '../bulma/field/field';
import '../bulma/navbar/navbar';
import '../bulma/navbar/navbar-label';
import '../bulma/navbar/navbar-item';
import '../bulma/navbar/navbar-dropdown';

@customElement('atx-topnav')
class AtxTopnav extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <b-navbar color="primary">
        <b-navbar-item where="brand">
          <img src="${logo}" height="32" />
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

@customElement('atx-topnav-raw')
class AtxTopnavRaw extends LitElement {
  static styles = styles(scss.toString());
  render() {
    return html`
      <div class="navbar is-primary">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src="${logo}" height="32" />
          </a>
          <a
            class="navbar-burger burger"
            role="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="brandButton"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-arrowless">
              <span class="navbar-link__icon">
                <i class="material-icons">settings</i>
              </span>
              <span>Settings</span>
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                <span class="navbar-link__icon">
                  <i class="material-icons">account_circle</i>
                </span>
                <span>Users</span>
              </a>
              <a class="navbar-item">
                <span class="navbar-link__icon">
                  <i class="material-icons">device_hub</i>
                </span>
                <span>Devices</span>
              </a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-arrowless">
              <span class="navbar-link__icon">
                <i class="material-icons">description</i>
              </span>
              <span>Docs</span>
            </a>
            <div class="navbar-dropdown">
              <p class="navbar-item navbar-item--title">API</p>
              <a class="navbar-item">DashboardV12</a>
              <a class="navbar-item">LinQM5</a>
              <hr class="navbar-divider" />
              <p class="navbar-item navbar-item--title">SDK</p>
              <a class="navbar-item">linq-network</a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <a class="navbar-item">
            <span class="navbar-link__icon">
              <i class="material-icons">account_circle</i>
            </span>
            <span>Sign in</span>
          </a>
        </div>
      </div>
    `;
  }
}
