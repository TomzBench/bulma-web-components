import { Action, actionCreator } from '../types';
import { Device } from './state';

export interface Query<T> {
  search?: { [P in keyof T]: string };
  sort?: keyof T;
  order?: 'ASC' | 'DESC';
  start?: number;
  limit?: number;
}

//
// ACTION TYPES
//
export const FETCH = 'devices/fetch';
export const FETCH_OK = 'devices/fetch/ok';
export const FETCH_ERR = 'devices/fetch/err';
export const POLL_START = 'devices/poll/start';
export const POLL_STOP = 'devices/poll/stop';

//
// ACTION INTERFACES
//
export interface Fetch extends Action<typeof FETCH> {
  query?: Query<Device>;
}
export interface FetchOk extends Action<typeof FETCH_OK> {
  devices: Device[];
}
export interface FetchErr extends Action<typeof FETCH_ERR> {}
export interface PollStart extends Action<typeof POLL_START> {
  ms?: number;
}
export interface PollStop extends Action<typeof POLL_STOP> {}

export type Actions = Fetch | FetchErr | FetchOk | PollStart | PollStop;

//
// ACTION CREATORS
//
export const actions = {
  fetch: actionCreator<Fetch>(FETCH),
  fetchOk: actionCreator<FetchOk>(FETCH_OK),
  fetchErr: actionCreator<FetchErr>(FETCH_ERR),
  pollStart: actionCreator<PollStart>(POLL_START),
  pollStop: actionCreator<PollStop>(POLL_STOP)
};
