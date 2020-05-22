import { Action, actionCreator } from '../types';
import { Device } from './state';

interface Query {
  query?: { [key: string]: string | number };
  sort?: string;
  start: number;
  limit: number;
}

//
// ACTION TYPES
//
export const FETCH = 'devices/fetch';
export const FETCH_OK = 'devices/fetch/ok';
export const FETCH_ERR = 'devices/fetch/err';

//
// ACTION INTERFACES
//
export interface Fetch extends Action<typeof FETCH> {
  query?: Query;
}
export interface FetchOk extends Action<typeof FETCH_OK> {
  devices: Device[];
}
export interface FetchErr extends Action<typeof FETCH_ERR> {}

export type Actions = Fetch | FetchErr | FetchOk;

//
// ACTION CREATORS
//
export const actions = {
  fetch: actionCreator<Fetch>(FETCH),
  fetchOk: actionCreator<FetchOk>(FETCH_OK),
  fetchErr: actionCreator<FetchErr>(FETCH_ERR)
};
