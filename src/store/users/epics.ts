import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootState } from '../reducers';
import { RootActions } from '../action';
import { Dependencies } from '../dependencies';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { Action } from '../types';
import { actions } from '../action';
import { toServer } from './filters';
import * as Actions from './action';

import { of, from } from 'rxjs';
import { map, switchMap, concat, startWith, filter } from 'rxjs/operators';

export const login$: Epic<RootActions, RootActions, RootState, Dependencies> = (
  action$,
  state$,
  { users, router }
): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof Actions.LOGIN>(Actions.LOGIN)),
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
    filter(isOfType<typeof Actions.LOGIN_OK>(Actions.LOGIN_OK)),
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
    filter(isOfType<typeof Actions.LOGOUT>(Actions.LOGOUT)),
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
    filter(isOfType<typeof Actions.LOGOUT_OK>(Actions.LOGOUT_OK)),
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
    filter(isOfType<typeof Actions.REFRESH>(Actions.REFRESH)),
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
    filter(isOfType<typeof Actions.FETCH>(Actions.FETCH)),
    switchMap(action => {
      return from(users.get()).pipe(
        map(response => actions.user.fetchOk({ users: response }))
      );
    })
  );

export const create$: Epic<
  RootActions,
  RootActions,
  RootState,
  Dependencies
> = (action$, state$, { users }): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof Actions.CREATE>(Actions.CREATE)),
    switchMap(action =>
      from(users.create(toServer(action.user))).pipe(
        map(response => actions.user.createOk({ response }))
      )
    )
  );

export const remove$: Epic<
  RootActions,
  RootActions,
  RootState,
  Dependencies
> = (action$, state$, { users }): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof Actions.REMOVE>(Actions.REMOVE)),
    switchMap(action =>
      from(users.remove(action.email)).pipe(
        map(response => actions.user.removeOk({ response }))
      )
    )
  );

export default combineEpics(
  login$,
  loginRedirect$,
  logout$,
  logoutRedirect$,
  refresh$,
  fetch$,
  create$,
  remove$
);
