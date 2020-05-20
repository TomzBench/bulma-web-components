import { actions as user, Actions as User } from './users/action';
import { actions as router, Actions as Router } from './router/action';

export const actions = { user, router };
export type RootActions = User | Router;
