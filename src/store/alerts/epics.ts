import { Alert } from './state';
import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootEpic } from '../epics';
import { Observable } from 'rxjs';
import { Action } from '../types';
import { Query } from './action';
import { actions } from '../action';
import * as Actions from './action';

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
      return from(io.get<Alert[]>('api/v1/alerts')).pipe(
        map(response => actions.alert.fetchOk({ alerts: response.json }))
      );
    }),
    catchError(error => of(actions.alert.fetchErr()))
  );

const query: Query<Alert> = {
  sort: 'last_seen' as keyof Alert,
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
