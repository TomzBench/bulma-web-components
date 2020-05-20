import { Action, actionCreator } from '../types';
import { User } from '../../services/user/types';

//
// ACTION TYPES
//
export const FETCH = 'users/fetch';
export const FETCH_OK = 'users/fetch/ok';
export const FETCH_ERR = 'users/fetch/err';
export const LOGIN = 'users/login';
export const LOGIN_OK = 'users/login/ok';
export const LOGIN_ERR = 'users/login/err';
export const LOGOUT = 'users/logout';
export const LOGOUT_OK = 'users/logout/ok';
export const LOGOUT_ERR = 'users/logout/err';
export const REFRESH = 'users/refresh';
export const REFRESH_OK = 'users/refresh/ok';
export const REFRESH_ERR = 'users/refresh/err';

//
// ACTION INTERFACES
//
export interface Fetch extends Action<typeof FETCH> {
  query?: { [key: string]: string | number };
  sort?: string;
  start: number;
  limit: number;
}
export interface FetchOk extends Action<typeof FETCH_OK> {
  users: User[];
}
export interface FetchErr extends Action<typeof FETCH_ERR> {}
export interface Login extends Action<typeof LOGIN> {
  email: string;
  password: string;
}
export interface LoginOk extends Action<typeof LOGIN_OK> {
  user: User;
}
export interface LoginErr extends Action<typeof LOGIN_ERR> {}
export interface Logout extends Action<typeof LOGOUT> {}
export interface LogoutOk extends Action<typeof LOGOUT_OK> {}
export interface LogoutErr extends Action<typeof LOGOUT_ERR> {}
export interface Refresh extends Action<typeof REFRESH> {}
export interface RefreshOk extends Action<typeof REFRESH_OK> {
  user: User;
}
export interface RefreshErr extends Action<typeof REFRESH_ERR> {}
export type Actions =
  | Fetch
  | FetchErr
  | FetchOk
  | Login
  | LoginOk
  | LoginErr
  | Logout
  | LogoutOk
  | LogoutErr
  | Refresh
  | RefreshOk
  | RefreshErr;

//
// ACTIONS CREATORS
//
export const actions = {
  fetch: actionCreator<Fetch>(FETCH),
  fetchOk: actionCreator<FetchOk>(FETCH_OK),
  fetchErr: actionCreator<FetchErr>(FETCH_ERR),
  login: actionCreator<Login>(LOGIN),
  loginOk: actionCreator<LoginOk>(LOGIN_OK),
  loginErr: actionCreator<LoginErr>(LOGIN_ERR),
  logout: actionCreator<Logout>(LOGOUT),
  logoutOk: actionCreator<LogoutOk>(LOGOUT_OK),
  logoutErr: actionCreator<LogoutErr>(LOGOUT_ERR),
  refresh: actionCreator<Logout>(REFRESH),
  refreshOk: actionCreator<LogoutOk>(REFRESH_OK),
  refreshErr: actionCreator<LogoutErr>(REFRESH_ERR)
};
