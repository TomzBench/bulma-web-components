import { ofType, combineEpics, ActionsObservable } from 'redux-observable';
import { RootState } from '../reducers';
import { Dependencies } from '../dependencies';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { Action } from '../types';
import * as Actions from './action';

import { from } from 'rxjs';
import { map, switchMap, startWith, filter } from 'rxjs/operators';

export const login$ = (
  action$: ActionsObservable<Actions.Actions>,
  state$: Observable<RootState>,
  { users }: Dependencies
): Observable<Action> =>
  action$.pipe(
    filter(isOfType<typeof Actions.LOGIN>(Actions.LOGIN)),
    switchMap(action =>
      from(users.login(action.email, action.password)).pipe(
        map(response => Actions.loginOk(response))
      )
    )
  );
export default combineEpics(login$);
