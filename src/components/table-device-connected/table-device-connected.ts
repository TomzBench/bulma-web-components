import { LitElement, customElement, html, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import { Device } from '../../store/devices/state';
import * as scss from './table-device-connected.styles.scss';
import * as eflow from '../../assets/eflow.jpg';

@customElement('atx-table-device-connected')
export class AtxTableDeviceConnected extends LitElement {
  static styles = styles(scss.toString());
  @property({ type: Array }) devices: Device[] = [];
  @property({ type: Number }) selected: number = -1;

  fetch() {}

  calcLastSeen(d: Device) {
    const secs = Math.floor(new Date().getTime() / 1000) - d.lastSeen;
    console.log(d.lastSeen);
    console.log(new Date().getTime());
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
        ['is-narrow']: false,
        ['is-hoverable']: true,
        ['is-fullwidth']: false
      },
      column: (numeric?: boolean) => {
        return {
          'is-numeric': !!numeric,
          narrower: true
        };
      },
      row: (idx: number) => {
        return {
          'is-selected': idx === this.selected
        };
      }
    };
    return html`
      <div class="table-container">
        <table class="${classMap(c.table)}">
          <thead>
            <tr>
              <th class="${classMap(c.column(true))}"></th>
              <th class="${classMap(c.column())}"></th>
              <th class="${classMap(c.column())}"></th>
              <th class="${classMap(c.column())}"></th>
            </tr>
          </thead>
          <tbody>
            ${[...this.devices].splice(0, 10).map(
              (d, idx) =>
                html`
                  <tr class="${classMap(c.row(idx))}">
                    <td class="${classMap(c.column(true))}">${idx + 1}</td>
                    <td class="${classMap(c.column())}">
                      <img src="${eflow}" />
                    </td>
                    <td class="${classMap(c.column())}">
                      <div>
                        <span class="is-size-7 has-font-weight-bold">
                          ${d.product}
                        </span>
                      </div>
                      <div class="truncate">
                        <span class="is-size-7 has-text-grey truncate">
                          ${d.serial}
                        </span>
                      </div>
                    </td>
                    <td class="${classMap(c.column(true))}">
                      <div class="icon-container">
                        <span class="is-hidden">align</span>
                        <b-icon size="small" color="info">visibility</b-icon>
                        <b-icon size="small" color="success">all_out</b-icon>
                        <b-icon size="small" color="danger">delete</b-icon>
                        <span class="text has-text-grey">
                          ${this.calcLastSeen(d)}
                        </span>
                      </div>
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
          ${this.renderTable()}
        </div>
      </div>
    `;
  }
}
