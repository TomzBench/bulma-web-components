import 'reflect-metadata';
import './app';
import './app-provider';
import './components/bulma/addon/addon';
import './components/bulma/bulma-base';
import './components/bulma/bulma';
import './components/bulma/field/field';
import './components/bulma/icon/icon';
import './components/bulma/input/input';
import './components/bulma/modal/modal';
import './components/bulma/navbar/navbar';
import './components/bulma/pagination/pagination';
import './components/bulma/select/select';
import './components/bulma/table/table';
import './components/bulma/textarea/textarea';
import './components/form-contact/form-contact';
import './components/form-user/form-user';
import './components/form-login/form-login';
import './components/form-signup/form-signup';
import './components/table-alert/table-alert';
import './components/table-user/table-user';
import './components/table-device/table-device';
import './components/topnav/topnav';
import './pages/dashboard/dashboard';
import './pages/dashboard/account/dashboard-account';
import './pages/dashboard/devices/dashboard-devices';
import './pages/dashboard/lock/dashboard-lock';
import './pages/dashboard/mail/dashboard-mail';
import './pages/dashboard/main/dashboard-main';
import './pages/dashboard/power/dashboard-power';
import './pages/docs/docs';
import './pages/home/home';
import { customElement, LitElement, html } from 'lit-element';

@customElement('atx-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <atx-provider>
        <atx-app></atx-app>
      </atx-provider>
    `;
  }
}
