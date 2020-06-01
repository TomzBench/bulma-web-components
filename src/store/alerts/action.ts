import { Action, actionCreator } from '../types';
import { Alert } from './state';

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
export const FETCH = 'alerts/fetch';
export const FETCH_OK = 'alerts/fetch/ok';
export const FETCH_ERR = 'alerts/fetch/err';
export const POLL_START = 'alerts/poll/start';
export const POLL_STOP = 'alerts/poll/stop';
export const COUNT = 'alerts/count';
export const COUNT_OK = 'alerts/count/ok';
export const COUNT_ERR = 'alerts/count/err';

//
// ACTION INTERFACES
//
export interface Fetch extends Action<typeof FETCH> {
  query?: Query<Alert>;
}
export interface FetchOk extends Action<typeof FETCH_OK> {
  alerts: Alert[];
}
export interface FetchErr extends Action<typeof FETCH_ERR> {}
export interface PollStart extends Action<typeof POLL_START> {
  ms?: number;
}
export interface PollStop extends Action<typeof POLL_STOP> {}

export interface Count extends Action<typeof COUNT> {}
export interface CountOk extends Action<typeof COUNT_OK> {
  count: number;
}
export interface CountErr extends Action<typeof COUNT_ERR> {}

export type Actions =
  | Fetch
  | FetchErr
  | FetchOk
  | PollStart
  | PollStop
  | Count
  | CountOk
  | CountErr;

//
// ACTION CREATORS
//
export const actions = {
  fetch: actionCreator<Fetch>(FETCH),
  fetchOk: actionCreator<FetchOk>(FETCH_OK),
  fetchErr: actionCreator<FetchErr>(FETCH_ERR),
  pollStart: actionCreator<PollStart>(POLL_START),
  pollStop: actionCreator<PollStop>(POLL_STOP),
  count: actionCreator<Count>(COUNT),
  countOk: actionCreator<CountOk>(COUNT_OK),
  countErr: actionCreator<CountErr>(COUNT_ERR)
};
