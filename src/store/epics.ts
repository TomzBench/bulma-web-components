import { combineEpics } from 'redux-observable';
import userEpics from './users/epics';

const epics = combineEpics(userEpics);
export default epics;
