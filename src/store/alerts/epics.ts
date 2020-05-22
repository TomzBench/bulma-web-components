import { Alert } from './state';
import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootEpic } from '../epics';
import { Observable } from 'rxjs';
import { Action } from '../types';
import { actions } from '../action';
import * as Actions from './action';

import { of, from } from 'rxjs';
import { map, switchMap, concat, startWith, filter } from 'rxjs/operators';

export const fetch$: RootEpic = (action$, state$, { io }): Observable<Action> =>
  action$.pipe(
    filter((e): e is Actions.Fetch => e.type === Actions.FETCH),
    switchMap(action => {
      return from(io.get<Alert[]>('api/v1/alerts')).pipe(
        map(response => actions.alert.fetchOk({ alerts: response.json }))
      );
    })
  );

export default combineEpics(fetch$);
