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
    default:
      return state;
  }
}

function fetch(state: State, action: Action.Fetch): State {
  return { ...state };
}

function fetchOk(state: State, action: Action.FetchOk): State {
  return { ...state };
}

function fetchErr(state: State, action: Action.FetchErr): State {
  return { ...state };
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
