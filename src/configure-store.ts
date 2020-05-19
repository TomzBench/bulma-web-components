import { SYMBOLS } from './ioc/constants.root';
import { bind } from './ioc/container.root';
import { inject } from 'inversify';
import { Store as ReduxStore } from 'redux';
import { rootReducer, RootState } from './store/reducers';
import { rootEpics } from './store/epics';
import { RootActions } from './store/action';
import { Dependencies } from './store/dependencies';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { UserService } from './services/user/user.service';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { ContainerModule } from 'inversify';

@bind(SYMBOLS.STORE_SERVICE)
export class Store {
  store: ReduxStore<RootState>;
  constructor(@inject(SYMBOLS.USER_SERVICE) users: UserService) {
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
    this.store = createStore(rootReducer, applyMiddleware(epicMiddleware));
    epicMiddleware.run(rootEpics);
  }
}
