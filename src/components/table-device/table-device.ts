import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { Device } from '../../store/devices/state';
import { connect } from '../../store/connect';
import { RootState } from '../../store/reducers';
import * as scss from './table-device.styles.scss';

@customElement('atx-table-device')
export class AtxTableDevice extends connect(LitElement) {
  static styles = styles(scss.toString());
  @property({ type: Number }) height: number = 0;
  @property({ type: Number }) selected: number = -1;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Number }) count: number = 10;
  @property({ type: String }) popup: string = '';
  @property({ type: Array }) devices: Device[] = [];

  stateChanged(state: RootState) {
    this.loading = state.devices.loading;
    this.devices = state.devices.devices;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetch();
  }

  fetch() {
    this.store.dispatch(
      // TODO use camel_case parser to remove as keyof Device cast
      this.actions.device.fetch({
        query: { sort: 'last_seen' as keyof Device, order: 'DESC' }
      })
    );
  }

  calcLastSeen(d: Device) {
    const secs = Math.floor(new Date().getTime() / 1000) - d.lastSeen;
    return html`
      <p>${secs}s</p>
    `;
  }

  renderTable() {
    const c = {
      table: {
        table: true,
        ['is-bordered']: false,
        ['is-striped']: true,
        ['is-narrow']: true,
        ['is-hoverable']: true,
        ['is-fullwidth']: true
      },
      column: (numeric?: boolean) => {
        return {
          'is-numeric': !!numeric
        };
      },
      row: (idx: number) => {
        return {
          'is-selected': idx === this.selected
        };
      }
    };
    return html`
      <div
        class="table-container"
        style="${this.height ? `height:${this.height}px` : ``}"
      >
        <table class="${classMap(c.table)}">
          <thead>
            <tr>
              <th class="${classMap(c.column(true))}">Idx</th>
              <th class="${classMap(c.column())}">Serial</th>
              <th class="${classMap(c.column())}">Site</th>
              <th class="${classMap(c.column())}">Product</th>
              <th class="${classMap(c.column())}">Version</th>
              <th class="${classMap(c.column())}">MAC</th>
              <th class="${classMap(c.column())}">Last Seen</th>
              <th class="${classMap(c.column(true))}">View</th>
            </tr>
          </thead>
          <tbody>
            ${[...this.devices].splice(0, 10).map(
              (d, idx) =>
                html`
                  <tr class="${classMap(c.row(idx))}">
                    <td class="${classMap(c.column(true))}">${idx + 1}</td>
                    <td class="${classMap(c.column())}">
                      <div class="truncate">
                        ${d.serial}
                      </div>
                    </td>
                    <td class="${classMap(c.column())}">${d.siteId}</td>
                    <td class="${classMap(c.column())}">${d.product}</td>
                    <td class="${classMap(c.column())}">${d.prjVersion}</td>
                    <td class="${classMap(c.column())}">${d.mac}</td>
                    <td class="${classMap(c.column())}">
                      <div>
                        ${this.calcLastSeen(d)}
                      </div>
                    </td>
                    <td class="${classMap(c.column(true))}">
                      <span class="is-hidden">align</span>
                      <b-icon size="small" color="info">visibility</b-icon>
                    </td>
                  </tr>
                `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  render() {
    return html`
      <div class="columns is-desktop">
        <div class="column">
          <b-field size="small" grouped>
            <b-addon-button disabled color="success" size="small">
              <b-icon>add</b-icon>
            </b-addon-button>
            <b-addon-button @click="${this.fetch}" color="warning" size="small">
              <b-icon>refresh</b-icon>
            </b-addon-button>
          </b-field>
        </div>
        <div class="column">
          <b-field size="small">
            <b-select>
              <b-icon>search</b-icon>
              <option>Name</option>
              <option>Email</option>
              <option>Role</option>
            </b-select>
            <b-input expanded placeholder="search"></b-input>
            <b-addon-button color="warning">
              <b-icon>search</b-icon>
            </b-addon-button>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <atx-ui-blocker ?active="${this.loading}">
            ${this.renderTable()}
          </atx-ui-blocker>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-pagination
            simple
            current="1"
            size="small"
            total="${this.devices.length}"
            per-page="1"
            @b-prev=${() => console.log('Want devices PREVIOUS')}
            @b-next=${() => console.log('Want devices NEXT')}
          >
          </b-pagination>
        </div>
      </div>
    `;
  }
}
