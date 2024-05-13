// @ts-nocheck
import { createReducer } from '@reduxjs/toolkit';
import { GetAllActivity } from './activityThunk';

const initialState = {
    data: null,
    dataLoadingState: 'idle',
    error: null
};

const activityStore = createReducer(initialState, (builder) => {
    builder
        //Get All Activity
        .addCase(GetAllActivity.pending, (state, action) => {
            state.dataLoadingState = 'loading';
        })
        .addCase(GetAllActivity.fulfilled, (state, action) => {
            state.dataLoadingState = 'succeeded';
            state.data = action.payload.data;
            console.log(action.payload.data);
        })
        .addCase(GetAllActivity.rejected, (state, action) => {
            state.dataLoadingState = 'failed';
            state.error = action.error.message;
        })
});

export default activityStore;