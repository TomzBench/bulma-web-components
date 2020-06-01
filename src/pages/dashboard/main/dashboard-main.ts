import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../../../components/bulma/styles';
import { connect } from '../../../store/connect';
import { RootState } from '../../../store/reducers';
import { User } from '../../../services/user/types';
import { Device } from '../../../store/devices/state';
import { Alert } from '../../../store/alerts/state';
import { SubmitUserEvent } from '../../../components/form-user/form-user';
import * as scss from './dashboard-main.styles.scss';

@customElement('atx-dashboard-main')
export class AtxDashboardMain extends connect(LitElement) {
  static styles = styles(scss.toString());
  @property({ type: String }) popup: string = '';
  @property({ type: Number }) deviceTotal: number = 0;
  @property({ type: Number }) deviceStart: number = 0;
  @property({ type: Array }) devices: Device[] = [];
  @property({ type: Boolean }) devicesPoll: boolean = false;
  @property({ type: Boolean }) devicesLoading: boolean = false;
  @property({ type: Number }) alertTotal: number = 0;
  @property({ type: Number }) alertStart: number = 0;
  @property({ type: Array }) alerts: Alert[] = [];
  @property({ type: Boolean }) alertsPoll: boolean = false;
  @property({ type: Boolean }) alertsLoading: boolean = false;
  @property({ type: Number }) perPage: number = 10;
  @property({ type: Boolean }) usersLoading: boolean = false;
  @property({ type: Number }) userTotal: number = 0;
  @property({ type: Array }) users: User[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.fetchUsers();
    this.fetchDevices();
    this.fetchAlerts();
  }

  disconnectedCallback() {
    this.store.dispatch(this.actions.device.pollStop());
    this.store.dispatch(this.actions.alert.pollStop());
    super.disconnectedCallback();
  }

  stateChanged(state: RootState) {
    this.users = state.users.users;
    this.devices = state.devices.devices;
    this.deviceTotal = state.devices.count;
    this.deviceStart = state.devices.start;
    this.devicesLoading = state.devices.loading;
    this.alerts = state.alerts.alerts;
    this.alertTotal = state.alerts.count;
    this.alertStart = state.alerts.start;
    this.alertsLoading = state.alerts.loading;
    this.usersLoading = state.users.loading;
    this.userTotal = state.users.count;
  }

  fetchUsers() {
    this.store.dispatch(this.actions.user.count());
    this.store.dispatch(this.actions.user.fetch());
  }

  fetchDevices() {
    this.store.dispatch(this.actions.device.count());
    this.store.dispatch(this.actions.device.fetch());
  }

  fetchAlerts() {
    this.store.dispatch(this.actions.alert.count());
    this.store.dispatch(this.actions.alert.fetch());
  }

  pollDevicesToggle() {
    this.devicesPoll = !this.devicesPoll;
    this.store.dispatch(
      this.devicesPoll
        ? this.actions.device.pollStart()
        : this.actions.device.pollStop()
    );
  }

  pollAlertsToggle() {
    this.alertsPoll = !this.alertsPoll;
    this.store.dispatch(
      this.alertsPoll
        ? this.actions.alert.pollStart()
        : this.actions.alert.pollStop()
    );
  }

  eventFetchUsers(e: CustomEvent) {
    e.stopPropagation();
    this.fetchUsers();
  }

  eventSubmitNewUser(e: CustomEvent<SubmitUserEvent>) {
    e.stopPropagation();
    const user = { ...e.detail };
    this.store.dispatch(this.actions.user.create({ user }));
  }

  eventRemoveUser(e: CustomEvent<{ email: string }>) {
    e.stopPropagation();
    const email = e.detail.email;
    this.store.dispatch(this.actions.user.remove({ email }));
  }

  eventDevicesPolling(e: CustomEvent) {
    e.stopPropagation();
    this.pollDevicesToggle();
  }

  eventDevicesNext(e: Event) {
    e.stopPropagation();
    let start = this.store.getState().devices.start;
    start += this.perPage;
    this.store.dispatch(this.actions.device.fetch({ query: { start } }));
  }

  eventDevicesPrev(e: Event) {
    let start = this.store.getState().devices.start;
    start -= this.perPage;
    this.store.dispatch(this.actions.device.fetch({ query: { start } }));
  }

  eventAlertsPolling(e: CustomEvent) {
    e.stopPropagation();
    this.pollAlertsToggle();
  }

  eventAlertsNext(e: Event) {
    e.stopPropagation();
    let start = this.store.getState().alerts.start;
    start += this.perPage;
    this.store.dispatch(this.actions.alert.fetch({ query: { start } }));
  }

  eventAlertsPrev(e: Event) {
    let start = this.store.getState().alerts.start;
    start -= this.perPage;
    this.store.dispatch(this.actions.alert.fetch({ query: { start } }));
  }

  render() {
    return html`
      <div class="dashboard-main">
        <div class="columns">
          <div class="column">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <div class="tile is-child box">
                  <p class="title">${this.userTotal}</p>
                  <p class="subtitle">Users</p>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child box">
                  <p class="title">${this.deviceTotal}</p>
                  <p class="subtitle">Connected Devices</p>
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child box">
                  <p class="title">300</p>
                  <p class="subtitle">Emails Sent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column">
                  <p class="is-size-5 has-text-weight-light title underline">
                    Alerts
                  </p>
                </div>
              </div>
              <atx-table-alert
                height="${363}"
                per-page="${this.perPage}"
                .alerts="${this.alerts}"
                .count="${this.alertTotal}"
                .start="${this.alertStart}"
                ?polling="${this.alertsPoll}"
                ?loading="${this.alertsLoading}"
                @atx-polling-alerts="${this.eventAlertsPolling}"
                @b-next="${this.eventAlertsNext}"
                @b-prev="${this.eventAlertsPrev}"
              ></atx-table-alert>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column">
                  <p class="is-size-5 has-text-weight-light title underline">
                    User Management
                  </p>
                </div>
              </div>
              <atx-table-user
                height="${363}"
                .users="${this.users}"
                ?loading="${this.usersLoading}"
                @atx-add-user="${this.eventSubmitNewUser}"
                @atx-remove-user="${this.eventRemoveUser}"
                @atx-fetch-users="${this.eventFetchUsers}"
              ></atx-table-user>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column">
                  <p class="is-size-5 has-text-weight-light title underline">
                    Connected Device List
                  </p>
                </div>
              </div>
              <atx-table-device
                height="${363}"
                per-page="${this.perPage}"
                .devices="${this.devices}"
                .count="${this.deviceTotal}"
                .start="${this.deviceStart}"
                ?polling="${this.devicesPoll}"
                ?loading="${this.devicesLoading}"
                @atx-polling-devices="${this.eventDevicesPolling}"
                @b-next="${this.eventDevicesNext}"
                @b-prev="${this.eventDevicesPrev}"
              ></atx-table-device>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
