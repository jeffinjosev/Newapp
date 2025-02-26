import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store/store';
import {AppState} from '@src/types';
import {apiCall} from '@helpers/apiHelper';

// Define the initial state using that type
const slice = 'app';
const initialState: AppState = {
  status: 'idle',
  splashscreenRendered: false,
};

export const appSlice = createSlice({
  name: slice,
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setSplashScreenStatus: (state, action) => {
      state.splashscreenRendered = action.payload;
    },
  },
  extraReducers: () => {},
});

// Action creators are generated for each case reducer function
export const {setStatus, setSplashScreenStatus} = appSlice.actions;

export default appSlice.reducer;

// Slice store data selector function

export const getStatus = (state: RootState) => state?.app?.status;
//events

export const getSplashStatus = (state: RootState) =>
  state?.app?.splashscreenRendered;
