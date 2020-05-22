import { actions as user, Actions as User } from './users/action';
import { actions as router, Actions as Router } from './router/action';
import { actions as device, Actions as Device } from './devices/action';
import { actions as alert, Actions as Alert } from './alerts/action';

export const actions = { user, router, device, alert };
export type RootActions = User | Router | Device | Alert;
