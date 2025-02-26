import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store/store';
import {UserSliceState} from '@src/types';
import {apiCall, assetApiCall} from '@helpers/apiHelper';
import {storeUser} from '@helpers/LocalStorage';
import {LOG} from '@helpers/Global';
// Define the initial state using that type
const slice = 'user';
const initialState: UserSliceState = {
  User: {},
  isLoggedIn: false,
};

export const GetLoggedUser: any = createAsyncThunk(
  `${slice}/me`,
  async (data: {}) => {
    const response = await apiCall('get', `${slice}/me`, data, true);
    LOG('GETLOGGED USER RESPONSE', response);
    return response;
  },
);
export const UpdateUser: any = createAsyncThunk(
  `${slice}/update/me`,
  async (data: {}) => {
    const response = await assetApiCall('put', `${slice}/me`, data, true);
    return response;
  },
);
export const UpdateUserDetailsOnly: any = createAsyncThunk(
  `${slice}/update/me/details`,
  async (data: {}) => {
    const response = await apiCall('put', `${slice}/me`, data, true);
    return response;
  },
);
export const UpdatePassword: any = createAsyncThunk(
  `${slice}/update/password`,
  async (data: {}) => {
    const response = await apiCall('put', `${slice}/password`, data, true);
    return response;
  },
);
export const DeleteUser: any = createAsyncThunk(
  `${slice}/delete`,
  async (data: {}) => {
    const response = await apiCall('DELETE', `${slice}/me`, data, true);
    LOG('delet user response', response);
    return response;
  },
);

export const GetCMS: any = createAsyncThunk(
  `${slice}/page`,
  async (data: {name: string}) => {
    const response = await apiCall('get', `page/${data}/webview`, {}, true);
    return response;
  },
);

export const verifyOtpEditEmail: any = createAsyncThunk(
  `${slice}/verifyOtpEditEmail`,
  async (data: {id: number}) => {
    const response = await apiCall('put', `${slice}/me/verify`, data, true);
    return response;
  },
);
export const userSlice = createSlice({
  name: slice,
  initialState,
  reducers: {
    resetState: state => initialState,
    setUser: (state, action) => {
      state.User = action.payload;
      if (Object.keys(action.payload).length != 0) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    setUserLogOut: state => {
      state.User = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(GetLoggedUser.fulfilled, (state, action) => {
        LOG('GetLoggedUser action', action);
        if (action?.payload?.data?.user) {
          const user = action?.payload?.data?.user;
          state.User = user;
          state.isLoggedIn = true;
          storeUser(user);
        }
      })
      .addCase(UpdateUserDetailsOnly.fulfilled, (state, action) => {
        LOG('UpdateUserDetailsOnly action', action);
        if (action?.payload?.data?.user) {
          state.User = action?.payload?.data?.user;
        }
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        LOG('UpdateUserDetailsOnly action', action);
        if (action?.payload?.data?.user) {
          state.User = action?.payload?.data?.user;
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const {resetState, setUser, setUserLogOut} = userSlice.actions;

export default userSlice.reducer;

// Slice store data selector function

export const getLoggedUser = (state: RootState) => state?.user?.User;
export const getLoggedStatus = (state: RootState) => state?.user?.isLoggedIn;
