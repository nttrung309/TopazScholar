// @ts-nocheck
import { createReducer } from '@reduxjs/toolkit';
import { RootState } from '..';
import { setStatusLogin } from './userAction';
import { AuthLogin } from './userThunk';

const initialState = {
    statusLogin: true,
    userData: {},
    dataLoadingState: 'idle',
    error: null,
};

const userStore = createReducer(initialState, (builder) => {
    builder
        .addCase(setStatusLogin, (state, action) => {
            state.statusLogin = action.payload;
        })
        .addCase(AuthLogin.pending, (state, action) => {
            state.dataLoadingState = 'loading';
        })
        .addCase(AuthLogin.fulfilled, (state, action) => {
            state.dataLoadingState = 'succeeded';
            state.userData = action.payload.data.data;
            state.statusLogin = true;
            console.log(action.payload);
        })
        .addCase(AuthLogin.rejected, (state, action) => {
            state.dataLoadingState = 'failed';
            state.error = action.error.message;
        })
});

export default userStore;