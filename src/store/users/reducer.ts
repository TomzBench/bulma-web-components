import * as Action from './action';
import { State, initial } from './state';

export default function reducer(state = initial, action: Action.Actions) {
  switch (action.type) {
    case Action.FETCH:
      return fetch(state, action);
      break;
    case Action.FETCH_OK:
      return fetchOk(state, action);
      break;
    case Action.FETCH_ERR:
      return fetchErr(state, action);
      break;
    case Action.LOGIN:
      return login(state, action);
      break;
    case Action.LOGIN_OK:
      return loginOk(state, action);
      break;
    case Action.LOGIN_ERR:
      return loginErr(state, action);
      break;
    case Action.LOGOUT:
      return logout(state, action);
      break;
    case Action.LOGOUT_OK:
      return logoutOk(state, action);
      break;
    case Action.LOGOUT_ERR:
      return logoutErr(state, action);
      break;
    case Action.REFRESH:
      return refresh(state, action);
      break;
    case Action.REFRESH_OK:
      return refreshOk(state, action);
      break;
    case Action.REFRESH_ERR:
      return refreshErr(state, action);
      break;
    case Action.CREATE:
      return create(state, action);
      break;
    case Action.CREATE_OK:
      return createOk(state, action);
      break;
    case Action.CREATE_ERR:
      return createErr(state, action);
      break;
    case Action.REMOVE:
      return remove(state, action);
      break;
    case Action.REMOVE_OK:
      return removeOk(state, action);
      break;
    case Action.REMOVE_ERR:
      return removeErr(state, action);
      break;
    case Action.COUNT:
      return count(state, action);
      break;
    case Action.COUNT_OK:
      return countOk(state, action);
      break;
    case Action.COUNT_ERR:
      return countErr(state, action);
      break;
    default:
      return state;
  }
}

function fetch(state: State, action: Action.Fetch): State {
  return { ...state, loading: true };
}

function fetchOk(state: State, action: Action.FetchOk): State {
  return { ...state, loading: false, users: action.users };
}

function fetchErr(state: State, action: Action.FetchErr): State {
  return { ...state, loading: false };
}

function login(state: State, action: Action.Login): State {
  return { ...state };
}

function loginOk(state: State, action: Action.LoginOk): State {
  return { ...state, user: action.user };
}

function loginErr(state: State, action: Action.LoginErr): State {
  return { ...state };
}

function logout(state: State, action: Action.Logout): State {
  return { ...state };
}

function logoutOk(state: State, action: Action.LogoutOk): State {
  return { ...state, user: undefined };
}

function logoutErr(state: State, action: Action.LogoutErr): State {
  return { ...state };
}

function refresh(state: State, action: Action.Refresh): State {
  return { ...state };
}

function refreshOk(state: State, action: Action.RefreshOk): State {
  return { ...state, user: action.user, ready: true };
}

function refreshErr(state: State, action: Action.RefreshErr): State {
  return { ...state, user: undefined, ready: true };
}

function create(state: State, action: Action.Create): State {
  return { ...state };
}

function createOk(state: State, action: Action.CreateOk): State {
  return { ...state };
}

function createErr(state: State, action: Action.CreateErr): State {
  return { ...state };
}

function remove(state: State, action: Action.Remove): State {
  return { ...state };
}

function removeOk(state: State, action: Action.RemoveOk): State {
  return { ...state };
}

function removeErr(state: State, action: Action.RemoveErr): State {
  return { ...state };
}

function count(state: State, action: Action.Count): State {
  let ret = { ...state };
  return ret;
}

function countOk(state: State, action: Action.CountOk): State {
  return { ...state, count: action.count };
}

function countErr(state: State, action: Action.CountErr): State {
  return { ...state };
}
