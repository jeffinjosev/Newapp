import {applyMiddleware, compose} from '@reduxjs/toolkit';
import {legacy_createStore as createStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from '@store/RootReducer';
import {LOG} from '@helpers/Global';
import {logout} from '@helpers/Utils';

// import CommonHelper from '../common/helpers/CommonHelper';
//@ts-ignore
const customMiddleWare = store => next => action => {
  const state = store.getState();
  if (action.payload) {
    let payload = action.payload;
    if (
      (payload?.status == 401 && action.type !== 'auth/login/fulfilled') ||
      payload?.status == 403
    ) {
      LOG('STATUS AND TYPE', payload?.status, action.type);
      if (
        !(
          action.type === 'auth/verifyOtp/fulfilled' ||
          action.type === 'auth/verifyOtpSignup/fulfilled' ||
          action.type === 'user/verifyOtpEditEmail/fulfilled'
        )
      ) {
        logout();
      }
    }
  }

  next(action);
};

const configureStore = (initialState: object) => {
  const enhance = compose(applyMiddleware(thunk, logger, customMiddleWare));
  return createStore(RootReducer, initialState, enhance);
};

const store = configureStore({});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
