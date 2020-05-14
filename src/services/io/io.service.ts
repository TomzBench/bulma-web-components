import { injectable } from 'inversify';
import { IoRequester, IoResponse, Fetch } from './types';
import { SYMBOLS } from '../../ioc/constants.root';
import { bindTo } from '../../ioc/container.root';

type Headers = {
  [key: string]: string;
};

@bindTo(SYMBOLS.IO_SERVICE, () => new IoService(fetch.bind(window)))
export class IoService implements IoRequester {
  headers: Headers = {};
  constructor(private fetch: Fetch) {}
  async get<T>(url: string): Promise<IoResponse<T>> {
    let config = { credentials: 'same-origin' };
    let headers = this.headers;
    if (Object.keys(headers).length) Object.assign(config, { headers });
    let response = await this.fetch(url, config);
    return { ...response, json: await response.json() };
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  removeHeader(key: string) {
    delete this.headers[key];
  }

  async put<T>(url: string, obj: any): Promise<IoResponse<T>> {
    const headers = Object.assign({}, this.headers, {
      'Content-Type': 'application/json'
    });
    let response = await this.fetch(url, {
      method: 'put',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(obj)
    });
    return { ...response, json: await response.json() };
  }

  async post<T>(url: string, obj: any): Promise<IoResponse<T>> {
    const headers = Object.assign({}, this.headers, {
      'Content-Type': 'application/json'
    });
    let response = await this.fetch(url, {
      method: 'post',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(obj)
    });
    return { ...response, json: await response.json() };
  }

  async delete<T>(url: string): Promise<IoResponse<T>> {
    const headers = this.headers;
    const config = { credentials: 'same-origin', method: 'delete' };
    if (Object.keys(headers).length) Object.assign(config, { headers });
    let response = await this.fetch(url, config);
    return { ...response, json: await response.json() };
  }
}
