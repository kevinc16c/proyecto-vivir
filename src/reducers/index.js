import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import user from './user';
import lugar from './lugar';
const rootReducer = combineReducers({
  settings: settings,
  user: user,
  routing: routerReducer,
  lugar: lugar,
});

export default rootReducer;
