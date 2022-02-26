import { combineReducers } from 'redux';

import authReducer from './authReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  authState: authReducer,
  postState: postReducer,
});

export default rootReducer;
