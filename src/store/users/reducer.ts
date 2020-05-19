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
  console.log('LOGIN');
  console.log(action);
  return { ...state };
}

function loginOk(state: State, action: Action.LoginOk): State {
  console.log('LOGIN_OK');
  console.log(action);
  return { ...state };
}

function loginErr(state: State, action: Action.LoginErr): State {
  return { ...state };
}

function logout(state: State, action: Action.Logout): State {
  console.log('LOGOUT');
  console.log(action);
  return { ...state };
}

function logoutOk(state: State, action: Action.LogoutOk): State {
  console.log('LOGOUT_OK');
  console.log(action);
  return { ...state };
}

function logoutErr(state: State, action: Action.LogoutErr): State {
  return { ...state };
}
