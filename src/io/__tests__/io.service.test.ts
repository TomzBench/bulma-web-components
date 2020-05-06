import { html, fixture, expect } from '@open-wc/testing';
import { IoService } from '../io.service';

// TODO need to replace jest.fn() with some sinon equiv

describe('io', () => {
  it('works', () => {
    expect(1).to.eq(1);
  });
});

/*
function setup(mockReturnValue: Promise<any>) {
  let mockFetch = jest.fn();
  mockFetch.mockReturnValue(mockReturnValue);
  return { mockFetch };
}
test('io.service should send a get request', async () => {
  let response = new Promise(resolve => resolve({ json: () => {} }));
  let { mockFetch } = setup(response);
  let io = new IoService(mockFetch);
  await io.get('foo');
  expect(mockFetch).toBeCalledWith('foo');
});

test('io.service should send a put request', async () => {
  let response = new Promise(resolve => resolve({ json: () => {} }));
  let { mockFetch } = setup(response);
  let io = new IoService(mockFetch);
  await io.put('foo', { data: 'bar' });
  expect(mockFetch).toBeCalledWith('foo', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: { data: 'bar' }
  });
});

test('io.service should send a post request', async () => {
  let response = new Promise(resolve => resolve({ json: () => {} }));
  let { mockFetch } = setup(response);
  let io = new IoService(mockFetch);
  await io.post('foo', { data: 'bar' });
  expect(mockFetch).toBeCalledWith('foo', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: { data: 'bar' }
  });
});

test('io.service should send a delete request', async () => {
  let response = new Promise(resolve => resolve({ json: () => {} }));
  let { mockFetch } = setup(response);
  let io = new IoService(mockFetch);
  await io.delete('foo');
  expect(mockFetch).toBeCalledWith('foo', {
    method: 'delete'
  });
});
*/
