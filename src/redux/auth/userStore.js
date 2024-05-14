// @ts-nocheck
import { createReducer } from '@reduxjs/toolkit';
import { setStatusLogin } from './userAction';
import { AuthLogin, AuthSignUp, AutoLogin } from './userThunk';

const initialState = {
  statusLogin: false,
  token: null,
  userData: {},
  dataLoadingState: "idle",
  error: null,
};

const userStore = createReducer(initialState, (builder) => {
  builder
    .addCase(setStatusLogin, (state, action) => {
      state.statusLogin = action.payload;
    })

    //Login
    .addCase(AuthLogin.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(AuthLogin.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      if (action.payload.data.data != null) {
        state.userData = action.payload.data.data;
        state.token = action.payload.data.token;
        localStorage.setItem('token', action.payload.data.token);
        localStorage.setItem('uid', action.payload.data.data.uid);
        state.statusLogin = true;
        console.log(action.payload, state.statusLogin, state.token);
      } else {
        state.error = action.payload.data.message;
      }
    })
    .addCase(AuthLogin.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Sign Up
    .addCase(AuthSignUp.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(AuthSignUp.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.userData = action.payload.data;
      state.statusLogin = true;
      console.log(action.payload.data);
    })
    .addCase(AuthSignUp.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Stay Logged In
    .addCase(AutoLogin.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(AutoLogin.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      if (action.payload.data.authState) {
        state.statusLogin = true;
        state.userData = action.payload.data.userData;
      } else {
        state.error = action.payload.data.message;
      }
    })
    .addCase(AutoLogin.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default userStore;
