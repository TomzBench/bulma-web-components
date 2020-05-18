import { combineReducers } from 'redux';
import userReducers from './users/reducer';

export const rootReducer = combineReducers({
  users: userReducers
});

export type RootState = ReturnType<typeof rootReducer>;
