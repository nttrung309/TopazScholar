// @ts-nocheck
import { createReducer } from '@reduxjs/toolkit';
import { NotifyGetAllData } from './notifyThunk';
import {  } from './notifyAction';

const initialState = {
  data: [],
  dataLoadingState: "idle",
  error: null
};

const notifyStore = createReducer(initialState, (builder) => {
  builder
    .addCase(NotifyGetAllData.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(NotifyGetAllData.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
    })
    .addCase(NotifyGetAllData.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })
});

export default notifyStore;
