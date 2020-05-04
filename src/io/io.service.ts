import { IoRequester } from './types';
import { bind } from '../ioc/ioc';
import { SYMBOLS } from '../ioc/constants.root';

@bind(SYMBOLS.IO_SERVICE)
export class IoService implements IoRequester {
  async get<T>(url: string): Promise<T> {
    return (await fetch(url)).json();
  }

  async put<T>(url: string, obj: any): Promise<T> {
    return (await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    })).json();
  }

  async post<T>(url: string, obj: any): Promise<T> {
    return (await fetch(url, {
      method: 'post',
      headers: {},
      body: obj
    })).json();
  }

  async delete<T>(url: string): Promise<T> {
    return (await fetch(url, {
      method: 'delete'
    })).json();
  }
}
