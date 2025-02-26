import {combineReducers} from 'redux';
import appReducer from '@src/appSlice';
import userReducer from '@onboardFlow/userSlice';
export default combineReducers({
  app: appReducer,
  user: userReducer,
});
