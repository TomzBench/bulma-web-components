import { html } from 'lit-element';
import { AtxAlertTable } from './table-alert';
import { styles } from '../bulma/styles';
import './table-alert';
import * as scss from './table-alert.styles.scss';

// Some dummy data
let array = new Array(8);
for (let i = 0; i < 8; i++)
  array[i] = {
    device: '334hgfqREdzsued==',
    product: 'LINQ2',
    who: 'Jim@foobar.com',
    what: 'Output 0 (Office-3)',
    siteId: 'Alp street',
    when: new Date(),
    mesg: 'Output triggered (Open)'
  };

export default { title: 'atx-table-alert' };

export const basic = () => {
  let table: AtxAlertTable = new AtxAlertTable();
  table.alerts = array;
  return table;
};
