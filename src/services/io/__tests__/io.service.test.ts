import 'reflect-metadata'; // TODO why is this not imported already
import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { IoService } from '../io.service';

function setup(mockReturnValue: Promise<any>) {
  let mockFetch = sinon.fake.returns(mockReturnValue);
  return { mockFetch };
}

describe('io.service', async () => {
  it('should send a get request', async () => {
    let response = new Promise(resolve => resolve({ json: () => {} }));
    let { mockFetch } = setup(response);
    let io = new IoService(mockFetch);
    await io.get('foo');
    mockFetch.calledWith('foo');
  });

  it('should send a put request', async () => {
    let response = new Promise(resolve => resolve({ json: () => {} }));
    let { mockFetch } = setup(response);
    let io = new IoService(mockFetch);
    await io.put('foo', { data: 'bar' });
    expect(mockFetch).calledWith('foo', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'bar' })
    });
  });

  it('should send a post request', async () => {
    let response = new Promise(resolve => resolve({ json: () => {} }));
    let { mockFetch } = setup(response);
    let io = new IoService(mockFetch);
    await io.post('foo', { data: 'bar' });
    expect(mockFetch).calledWith('foo', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: 'bar' })
    });
  });

  it('should send a delete request', async () => {
    let response = new Promise(resolve => resolve({ json: () => {} }));
    let { mockFetch } = setup(response);
    let io = new IoService(mockFetch);
    await io.delete('foo');
    expect(mockFetch).calledOnceWith('foo', {
      method: 'delete'
    });
  });

  it('should send headers with get request', async () => {
    let response = new Promise(resolve => resolve({ json: () => {} }));
    let { mockFetch } = setup(response);
    let io = new IoService(mockFetch);
    io.setHeader('Authorization', 'foo');
    await io.get('foo');
    expect(mockFetch).calledWith('foo', {
      headers: { Authorization: 'foo' }
    });

    io.removeHeader('Authorization');
    await io.get('foo');
    expect(mockFetch).calledWith('foo');
  });

  it('should send headers with delete request', async () => {
    let response = new Promise(resolve => resolve({ json: () => {} }));
    let { mockFetch } = setup(response);
    let io = new IoService(mockFetch);
    io.setHeader('Authorization', 'foo');
    await io.delete('foo');
    expect(mockFetch).calledWith('foo', {
      headers: { Authorization: 'foo' },
      method: 'delete'
    });

    io.removeHeader('Authorization');
    await io.delete('foo');
    expect(mockFetch).calledWith('foo', {
      method: 'delete'
    });
  });
});
