import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootState } from '../reducers';
import { RootActions } from '../action';
import { Dependencies } from '../dependencies';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { Action } from '../types';
import { LOGIN, LOGOUT } from './action';
import { actions } from './action';

import { from } from 'rxjs';
import { map, switchMap, startWith, filter } from 'rxjs/operators';

export const login$: Epic<RootActions, RootActions, RootState, Dependencies> = (
  action$,
  state$,
  { users }
): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof LOGIN>(LOGIN)),
    switchMap(action =>
      from(users.login(action.email, action.password)).pipe(
        map(response => actions.loginOk(response))
      )
    )
  );

export const logout$: Epic<
  RootActions,
  RootActions,
  RootState,
  Dependencies
> = (action$, state$, { users }): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof LOGOUT>(LOGOUT)),
    switchMap(action =>
      from(users.logout()).pipe(map(response => actions.logoutOk()))
    )
  );

export default combineEpics(login$);
