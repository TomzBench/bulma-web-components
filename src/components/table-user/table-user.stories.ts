import { html } from 'lit-element';
import { AtxUserTable } from './table-user';
import { styles } from '../bulma/styles';
import './table-user';
import * as scss from './table-user.styles.scss';

// Some dummy data
let array = new Array(8);
for (let i = 0; i < 8; i++)
  array[i] = {
    name: 'Tom',
    email: 'Jinglefoo@foo.com',
    role: 'admin'
  };

export default { title: 'atx-table-user' };

export const basic = () => {
  let table: AtxUserTable = new AtxUserTable();
  table.users = array;
  return table;
};
