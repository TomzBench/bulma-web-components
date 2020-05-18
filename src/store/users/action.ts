import { Action, actionCreator } from '../types';
import { User } from '../../services/user/types';
import { action } from 'typesafe-actions';

export const FETCH = 'users/fetch';
export const FETCH_OK = 'users/fetch/ok';
export const FETCH_ERR = 'users/fetch/err';
export const LOGIN = 'users/login';
export const LOGIN_OK = 'users/login/ok';
export const LOGIN_ERR = 'users/login/err';
export const LOGOUT = 'users/logout';
export const LOGOUT_OK = 'users/logout/ok';
export const LOGOUT_ERR = 'users/logout/err';

// Fetch users from the database
export interface Fetch extends Action<typeof FETCH> {
  query?: { [key: string]: string | number };
  sort?: string;
  start: number;
  limit: number;
}
export interface FetchOk extends User, Action<typeof FETCH_OK> {
  users: User[];
}
export interface FetchErr extends Action<typeof FETCH_ERR> {}

// Submit login for authentication
export interface Login extends Action<typeof LOGIN> {
  email: string;
  password: string;
}
export interface LoginOk extends User, Action<typeof LOGIN_OK> {}
export interface LoginErr extends Action<typeof LOGIN_ERR> {}

// Logout actions
export interface Logout extends Action<typeof LOGOUT> {}
export interface LogoutOk extends Action<typeof LOGOUT_OK> {}
export interface LogoutErr extends Action<typeof LOGOUT_ERR> {}

export const fetch = actionCreator<Fetch>(FETCH);
export const fetchOk = actionCreator<FetchOk>(FETCH_OK);
export const fetchErr = actionCreator<FetchErr>(FETCH_ERR);
export const login = actionCreator<Login>(LOGIN);
export const loginOk = actionCreator<LoginOk>(LOGIN_OK);
export const loginErr = actionCreator<LoginErr>(LOGIN_ERR);
export const logout = actionCreator<Logout>(LOGOUT);
export const logoutOk = actionCreator<LogoutOk>(LOGOUT_OK);
export const logoutErr = actionCreator<LogoutErr>(LOGOUT_ERR);

export type Actions =
  | Fetch
  | FetchErr
  | FetchOk
  | Login
  | LoginOk
  | LoginErr
  | Logout
  | LogoutOk
  | LogoutErr;
