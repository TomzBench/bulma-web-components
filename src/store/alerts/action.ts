import { Action, actionCreator } from '../types';
import { Alert } from './state';

interface Query {
  query?: { [key: string]: string | number };
  sort?: string;
  start: number;
  limit: number;
}

//
// ACTION TYPES
//
export const FETCH = 'alerts/fetch';
export const FETCH_OK = 'alerts/fetch/ok';
export const FETCH_ERR = 'alerts/fetch/err';

//
// ACTION INTERFACES
//
export interface Fetch extends Action<typeof FETCH> {
  query?: Query;
}
export interface FetchOk extends Action<typeof FETCH_OK> {
  alerts: Alert[];
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
