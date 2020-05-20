import { Action, actionCreator } from '../types';
import { User, UserAdd as UserAddServer } from '../../services/user/types';

interface Query {
  query?: { [key: string]: string | number };
  sort?: string;
  start: number;
  limit: number;
}

// TODO move these to types...
// export type ROLE = 'Admin' | 'Developer' | 'Sales' | 'General';
export type UserAdd = Omit<UserAddServer, 'role'> & { role: string };

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
export const CREATE = 'users/create';
export const CREATE_OK = 'users/create/ok';
export const CREATE_ERR = 'users/create/err';
export const REMOVE = 'users/remove';
export const REMOVE_OK = 'users/remove/ok';
export const REMOVE_ERR = 'users/remove/err';

//
// ACTION INTERFACES
//
export interface Fetch extends Action<typeof FETCH> {
  query?: Query;
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
export interface Create extends Action<typeof CREATE> {
  user: UserAdd;
  query?: Query;
}
export interface CreateOk extends Action<typeof CREATE_OK> {}
export interface CreateErr extends Action<typeof CREATE_ERR> {}
export interface Remove extends Action<typeof REMOVE> {
  email: string;
}
export interface RemoveOk extends Action<typeof REMOVE_OK> {}
export interface RemoveErr extends Action<typeof REMOVE_ERR> {}

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
  | RefreshErr
  | Create
  | CreateOk
  | CreateErr
  | Remove
  | RemoveOk
  | RemoveErr;

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
  refresh: actionCreator<Refresh>(REFRESH),
  refreshOk: actionCreator<RefreshOk>(REFRESH_OK),
  refreshErr: actionCreator<RefreshErr>(REFRESH_ERR),
  create: actionCreator<Create>(CREATE),
  createOk: actionCreator<CreateOk>(CREATE_OK),
  createErr: actionCreator<CreateErr>(CREATE_ERR),
  remove: actionCreator<Remove>(REMOVE),
  removeOk: actionCreator<RemoveOk>(REMOVE_OK),
  removeErr: actionCreator<RemoveErr>(REMOVE_ERR)
};
