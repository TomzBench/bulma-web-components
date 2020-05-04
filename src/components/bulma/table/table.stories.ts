import { html, TemplateResult } from 'lit-element';

import { ExtendedTableData } from '../bulma-types';
import { BTable } from './table';
import './table.ts';

interface TableData {
  name: string;
  email: string;
  role: number;
}

// Some dummy data
let array = new Array(20);
for (let i = 0; i < 20; i++)
  array[i] = {
    name: 'Tom',
    email: 'Jinglefoo@foo.com',
    role: 'admin'
  };

export default { title: 'b-table' };

export const basic = () => {
  let table: BTable<ExtendedTableData<TableData>> = new BTable();
  table.fullwidth = true;
  table.narrow = true;
  table.hoverable = true;
  table.selected = 5;
  table.tableData = {
    data: [...array],
    columns: [{ label: 'name' }, { label: 'email' }, { label: 'role' }]
  };
  return table;
};

export const numbered = () => {
  let table: BTable<ExtendedTableData<TableData>> = new BTable();
  table.fullwidth = true;
  table.numbered = true;
  table.narrow = true;
  table.hoverable = true;
  table.tableData = {
    data: [...array],
    columns: [{ label: 'name' }, { label: 'email' }, { label: 'role' }]
  };
  return table;
};

export const actions = () => {
  let table: BTable<ExtendedTableData<TableData>> = new BTable();
  table.fullwidth = true;
  table.narrow = true;
  table.hoverable = true;
  table.variant = 'crud';
  table.tableData = {
    data: [...array],
    columns: [{ label: 'name' }, { label: 'email' }, { label: 'role' }]
  };
  return table;
};
