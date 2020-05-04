import { LitElement, customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from '../bulma/styles';
import * as scss from './user-table.styles.scss';

import { ExtendedTableData } from '../bulma/bulma-types';
import { BTable } from '../bulma/table/table';
import '../bulma/table/table.ts';

interface TableData {
  name: string;
  email: string;
  role: number;
}

@customElement('atx-user-table')
export class AtxUserTable extends LitElement {
  static styles = styles(scss.toString());
  @query('b-table') table!: BTable<TableData>;
  render() {
    return html`
      <div class="box">
        <b-table fullwidth hoverable striped narrow variant="crud"></b-table>
      </div>
    `;
  }
}
