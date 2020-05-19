import { rootReducer, RootState } from './store/reducers';
import { rootEpics } from './store/epics';
import { RootActions } from './store/action';
import { Dependencies } from './store/dependencies';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { UserService } from './services/user/user.service';
import { IoService } from './services/io/io.service';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { ContainerModule } from 'inversify';
import { container } from './ioc/container.root';
import { SYMBOLS } from './ioc/constants.root';

const io = new IoService(fetch.bind(window));
const users = new UserService(io);
container.bind(SYMBOLS.USER_SERVICE).toDynamicValue(() => users);

// Type params needs to be explicit when passing dependencies
// See: https://github.com/redux-observable/redux-observable/issues/592
const epicMiddleware = createEpicMiddleware<
  RootActions,
  RootActions,
  RootState,
  Dependencies
>({
  dependencies: { users }
});
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpics);
