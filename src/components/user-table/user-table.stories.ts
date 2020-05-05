import { html } from 'lit-element';
import { UserTableData, AtxUserTable } from './user-table';
import './user-table.ts';

// Some dummy data
let array = new Array(8);
for (let i = 0; i < 8; i++)
  array[i] = {
    name: 'Tom',
    email: 'Jinglefoo@foo.com',
    role: 'admin'
  };

export default { title: 'atx-user-table' };

export const basic = () => {
  let table: AtxUserTable = new AtxUserTable();
  table.users = array;
  return table;
};
