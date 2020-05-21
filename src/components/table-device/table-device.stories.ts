import { html } from 'lit-element';
import { AtxTableDevice } from './table-device';
import { styles } from '../bulma/styles';
import './table-device';
import * as scss from './table-device.styles.scss';

// Some dummy data
let array = new Array(8);
for (let i = 0; i < 8; i++)
  array[i] = {
    serial: '334hgfqREdzsued==',
    product: 'LinQ2',
    prj_version: '2.0.1',
    atx_version: '2.0.2',
    web_version: '2.0.0',
    mac: 'CB:45:AD:99:5D',
    lastSeen: new Date()
  };

export default { title: 'atx-table-device' };

export const basic = () => {
  let table: AtxTableDevice = new AtxTableDevice();
  table.devices = array;
  return table;
};
