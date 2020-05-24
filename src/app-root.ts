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
import './components/bulma/navbar/navbar-label';
import './components/bulma/navbar/navbar-item';
import './components/bulma/navbar/navbar-dropdown';
import './components/bulma/pagination/pagination';
import './components/bulma/select/select';
import './components/bulma/table/table';
import './components/bulma/textarea/textarea';
import './components/device-media/device-media';
import './components/material/circular-progress/circular-progress';
import './components/footer/footer';
import './components/form-contact/form-contact';
import './components/form-login/form-login';
import './components/form-signup/form-signup';
import './components/form-user/form-user';
import './components/modal-form-user/modal-form-user';
import './components/modal-login/modal-login';
import './components/modal-message/modal-message';
import './components/router-guard/router-guard';
import './components/table-alert/table-alert';
import './components/table-user/table-user';
import './components/table-device/table-device';
import './components/topnav/topnav';
import './components/ui-blocker/ui-blocker';
import './components/shared/decorators';
import './containers/login/login.container';
import './pages/dashboard/dashboard';
import './pages/dashboard/account/dashboard-account';
import './pages/dashboard/devices/dashboard-devices';
import './pages/dashboard/lock/dashboard-lock';
import './pages/dashboard/mail/dashboard-mail';
import './pages/dashboard/main/dashboard-main';
import './pages/dashboard/power/dashboard-power';
import './pages/docs/docs';
import './pages/home/home';
import './store/connect';
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
