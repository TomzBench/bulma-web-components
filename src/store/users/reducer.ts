import * as Action from './action';
import { State, initial } from './state';

export default function reducer(state = initial, action: Action.Actions) {
  switch (action.type) {
    case Action.FETCH:
      return fetch(state, action);
      break;
    case Action.LOGIN:
      return login(state, action);
      break;
    case Action.LOGOUT:
      return logout(state, action);
      break;
  }
}

function fetch(state: State, action: Action.Fetch): State {
  return { ...state };
}

function login(state: State, action: Action.Login): State {
  return state;
}

function logout(state: State, action: Action.Logout): State {
  return state;
}
