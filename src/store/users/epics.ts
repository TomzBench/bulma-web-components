import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootState } from '../reducers';
import { RootActions } from '../action';
import { Dependencies } from '../dependencies';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { Action } from '../types';
import { LOGIN, LOGIN_OK, LOGOUT, LOGOUT_OK } from './action';
import { actions } from '../action';

import { of, from } from 'rxjs';
import { map, switchMap, concat, startWith, filter } from 'rxjs/operators';

export const login$: Epic<RootActions, RootActions, RootState, Dependencies> = (
  action$,
  state$,
  { users, router }
): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof LOGIN>(LOGIN)),
    switchMap(action =>
      from(users.login(action.email, action.password)).pipe(
        map(response => actions.loginOk(response))
      )
    )
  );

export const loginRedirect$: Epic<
  RootActions,
  RootActions,
  RootState,
  Dependencies
> = (action$, state$, { users, router }): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof LOGIN_OK>(LOGIN_OK)),
    switchMap(action =>
      of(router.route('/dashboard')).pipe(map(() => actions.routeOk()))
    )
  );

export const logout$: Epic<
  RootActions,
  RootActions,
  RootState,
  Dependencies
> = (action$, state$, { users, router }): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof LOGOUT>(LOGOUT)),
    switchMap(action =>
      from(users.logout()).pipe(map(response => actions.logoutOk()))
    )
  );

export const logoutRedirect$: Epic<
  RootActions,
  RootActions,
  RootState,
  Dependencies
> = (action$, state$, { users, router }): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof LOGOUT_OK>(LOGOUT_OK)),
    switchMap(action =>
      of(router.route('/home')).pipe(map(() => actions.routeOk()))
    )
  );

export default combineEpics(login$, loginRedirect$, logout$, logoutRedirect$);
