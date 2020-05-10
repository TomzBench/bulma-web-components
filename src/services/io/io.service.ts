import { injectable } from 'inversify';
import { IoRequester, IoResponse, Fetch } from './types';
import { SYMBOLS } from '../../ioc/constants.root';
import { bindTo } from '../../ioc/container.root';

@bindTo(SYMBOLS.IO_SERVICE, () => new IoService(fetch.bind(window)))
export class IoService implements IoRequester {
  constructor(private fetch: Fetch) {}
  async get<T>(url: string): Promise<IoResponse<T>> {
    let response = await this.fetch(url);
    return { ...response, json: await response.json() };
  }

  async put<T>(url: string, obj: any): Promise<IoResponse<T>> {
    let response = await this.fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    });
    return { ...response, json: await response.json() };
  }

  async post<T>(url: string, obj: any): Promise<IoResponse<T>> {
    let response = await this.fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    });
    return { ...response, json: await response.json() };
  }

  async delete<T>(url: string): Promise<IoResponse<T>> {
    let response = await this.fetch(url, {
      method: 'delete'
    });
    return { ...response, json: await response.json() };
  }
}
