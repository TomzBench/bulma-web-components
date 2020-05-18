import { combineEpics } from 'redux-observable';
import userEpics from './users/epics';

// Combine all epic middleware
const epics = combineEpics(userEpics);
export default epics;
