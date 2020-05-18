import { ofType, combineEpics, ActionsObservable } from 'redux-observable';
import { RootState } from '../reducers';
import { Dependencies } from '../dependencies';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import * as Action from './action';

import { from } from 'rxjs';
import { map, switchMap, startWith, filter } from 'rxjs/operators';

export const login$ = (
  action$: ActionsObservable<Action.Actions>,
  state$: Observable<RootState>,
  { users }: Dependencies
) => {
  action$.pipe(
    filter(isOfType<typeof Action.LOGIN>(Action.LOGIN)),
    switchMap(action =>
      from(users.login(action.email, action.password)).pipe(
        map(response => Action.loginOk(response))
      )
    )
  );
};

export default combineEpics(login$);
