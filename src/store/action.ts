import { actions as userActions, Actions as UserActions } from './users/action';
import {
  actions as routerActions,
  Actions as RouterActions
} from './router/action';

export const actions = { ...userActions, ...routerActions };
export type RootActions = UserActions | RouterActions;
