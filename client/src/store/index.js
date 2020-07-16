import { combineReducers } from 'redux';

import app from './store-app';
import user from './store-user';

export {
  app,
  user,
};

export default combineReducers({
  user,
  app,
});
