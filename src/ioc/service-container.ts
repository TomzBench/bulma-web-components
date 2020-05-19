import { SYMBOLS } from './constants.root';
import { UserService } from '../services/user/user.service';
import { IoService } from '../services/io/io.service';
import { ContainerModule } from 'inversify';
import { rootReducer, RootState } from '../store/reducers';
import { rootEpics } from '../store/epics';
import { RootActions } from '../store/action';
import { Dependencies } from '../store/dependencies';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

export default new ContainerModule(bind => {
  const io = new IoService(fetch.bind(window));
  const users = new UserService(io);
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
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpics);
  bind(SYMBOLS.USER_SERVICE).toDynamicValue(() => users);
  bind(SYMBOLS.STORE_SERVICE).toDynamicValue(() => store);
});
