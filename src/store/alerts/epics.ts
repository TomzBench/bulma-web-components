import { Alert } from './state';
import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootEpic } from '../epics';
import { Observable } from 'rxjs';
import { Action } from '../types';
import { Query } from './action';
import { actions } from '../action';
import * as Actions from './action';
import { AlertFromServer, fromServer } from './filters';

import { of, from } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  repeat,
  delay,
  concat,
  startWith,
  takeUntil,
  filter
} from 'rxjs/operators';

export const fetch$: RootEpic = (action$, state$, { io }): Observable<Action> =>
  action$.pipe(
    filter((e): e is Actions.Fetch => e.type === Actions.FETCH),
    switchMap(action => {
      let url = 'api/v1/alerts';
      let query = state$.value.alerts;
      let keys = Object.keys(query.search) as (keyof Alert)[];
      url += `?start=${query.start}`;
      url += `&limit=${query.limit}`;
      if (keys.length) url += `&search=${keys[0]}:${query.search[keys[0]]}`;
      if (query.sort) url += `&sort=${query.sort}`;
      if (query.order) url += `&order=${query.order}`;
      return from(io.get<AlertFromServer[]>(url)).pipe(
        map(response =>
          actions.alert.fetchOk({ alerts: fromServer(response.json) })
        )
      );
    }),
    catchError(error => of(actions.alert.fetchErr()))
  );

const query: Query<Alert> = {
  sort: 'when' as keyof Alert,
  order: 'DESC'
};
export const poll$: RootEpic = (action$, state$): Observable<Action> =>
  action$.pipe(
    filter((e): e is Actions.PollStart => e.type === Actions.POLL_START),
    switchMap(poll =>
      action$.pipe(
        filter((e): e is Actions.FetchOk => e.type === Actions.FETCH_OK),
        delay(poll.ms || 5000),
        map(() => actions.alert.fetch({ query })),
        repeat(),
        takeUntil(action$.pipe(filter(e => e.type === Actions.POLL_STOP))),
        startWith(actions.alert.fetch({ query }))
      )
    ),
    catchError(error => of(actions.alert.fetchErr()))
  );

export const count$: RootEpic = (action$, state$, { io }): Observable<Action> =>
  action$.pipe(
    filter((e): e is Actions.Count => e.type === Actions.COUNT),
    switchMap(response =>
      from(io.get<{ count: number }>('/api/v1/alerts/count')).pipe(
        map(response => {
          const { count } = response.json;
          return actions.alert.countOk({ count });
        })
      )
    ),
    catchError(error => of(actions.alert.countErr()))
  );

export default combineEpics(fetch$, poll$, count$);
