import { html, fixture, expect } from '@open-wc/testing';
import '../table-user';
import { AtxUserTable } from '../table-user';

describe('table-user', () => {
  it('should render', () => {
    let table = new AtxUserTable();
    expect(table).instanceof(AtxUserTable);
  });
});
