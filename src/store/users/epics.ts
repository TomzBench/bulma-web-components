import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootState } from '../reducers';
import { RootActions } from '../action';
import { Dependencies } from '../dependencies';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { Action } from '../types';
import { actions } from '../action';
import {
  FETCH,
  FETCH_OK,
  FETCH_ERR,
  REFRESH,
  REFRESH_OK,
  LOGIN,
  LOGIN_OK,
  LOGOUT,
  LOGOUT_OK
} from './action';

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
        map(response => actions.user.loginOk({ user: response }))
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
      of(router.route('/dashboard')).pipe(map(() => actions.router.routeOk()))
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
      from(users.logout()).pipe(map(response => actions.user.logoutOk()))
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
      of(router.route('/home')).pipe(map(() => actions.router.routeOk()))
    )
  );

// TODO can map to EPIC instead of calling service
export const refresh$: Epic<
  RootActions,
  RootActions,
  RootState,
  Dependencies
> = (action$, state$, { users, router }): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof REFRESH>(REFRESH)),
    switchMap(action =>
      from(users.refresh()).pipe(
        map(response => actions.user.refreshOk({ user: response }))
      )
    )
  );

export const fetch$: Epic<RootActions, RootActions, RootState, Dependencies> = (
  action$,
  state$,
  { users }
): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof FETCH>(FETCH)),
    switchMap(action => {
      return from(users.get()).pipe(
        map(response => actions.user.fetchOk({ users: response }))
      );
    })
  );

export default combineEpics(
  login$,
  loginRedirect$,
  logout$,
  logoutRedirect$,
  refresh$,
  fetch$
);
