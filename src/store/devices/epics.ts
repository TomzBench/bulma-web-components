import { Device } from './state';
import { Epic, combineEpics, ActionsObservable } from 'redux-observable';
import { RootEpic } from '../epics';
import { Observable } from 'rxjs';
import { Action } from '../types';
import { actions } from '../action';
import { DeviceFromServer, fromServer } from './filters';
import * as Actions from './action';

import { of, from } from 'rxjs';
import { map, switchMap, concat, startWith, filter } from 'rxjs/operators';

export const fetch$: RootEpic = (action$, state$, { io }): Observable<Action> =>
  action$.pipe(
    filter(e => e.type === Actions.FETCH),
    switchMap(action => {
      return from(io.get<DeviceFromServer[]>('api/v1/devices')).pipe(
        map(response =>
          actions.device.fetchOk({ devices: fromServer(response.json) })
        )
      );
    })
  );

export default combineEpics(fetch$);
