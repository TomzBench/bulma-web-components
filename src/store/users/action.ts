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

// Submit login for authentication
export interface Login extends Action<typeof LOGIN> {
  email: string;
  password: string;
}

export interface LoginOk extends User, Action<typeof LOGIN_OK> {}
export interface Logout extends Action<typeof LOGOUT> {}

export const fetch = actionCreator<Fetch>(FETCH);
export const login = actionCreator<Login>(LOGIN);
export const loginOk = actionCreator<LoginOk>(LOGIN_OK);
export const logout = actionCreator<Logout>(LOGOUT);

export type Actions = Fetch | Login | Logout;
