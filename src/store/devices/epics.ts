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
    filter((e): e is Actions.Fetch => e.type === Actions.FETCH),
    switchMap(action => {
      let url = 'api/v1/devices';
      let query = state$.value.devices;
      let keys = Object.keys(query.search) as (keyof Device)[];
      url += `?start=${query.start}`;
      url += `&limit=${query.limit}`;
      if (keys.length) url += `&search=${keys[0]}:${query.search[keys[0]]}`;
      if (query.sort) url += `&sort=${query.sort}`;
      if (query.order) url += `&order=${query.order}`;
      return from(io.get<DeviceFromServer[]>(url)).pipe(
        map(response =>
          actions.device.fetchOk({ devices: fromServer(response.json) })
        )
      );
    })
  );

export default combineEpics(fetch$);
