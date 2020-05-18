import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Dependencies } from './dependencies';
import { RootActions } from './action';
import { RootState } from './reducers';
import userEpics from './users/epics';

// Combine all epic middleware
export const rootEpics = combineEpics(userEpics);
