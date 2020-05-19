import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Dependencies } from './dependencies';
import { RootActions } from './action';
import { RootState } from './reducers';
import userEpic from './users/epics';
import routerEpic from './router/epics';

// Combine all epic middleware
export const rootEpics = combineEpics(userEpic, routerEpic);
