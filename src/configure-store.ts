import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { RootActions } from './store/action';
import { Dependencies } from './store/dependencies';
import { rootReducer, RootState } from './store/reducers';
import { rootEpics, createAppEpicMiddleware } from './store/epics';
import { container } from './ioc/container.root';
import { UserService } from './services/user/user.service';
import { SYMBOLS } from './ioc/constants.root';

// Type params needs to be explicit when passing dependencies
// See: https://github.com/redux-observable/redux-observable/issues/592
const epicMiddleware = createEpicMiddleware<
  RootActions,
  RootActions,
  RootState,
  Dependencies
>({
  dependencies: {
    users: container.get<UserService>(SYMBOLS.USER_SERVICE)
  }
});
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpics);
