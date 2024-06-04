// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import { GetAllActivity, HostActivity, UpdateActivity } from "./activityThunk";

const initialState = {
  data: null,
  dataLoadingState: "idle",
  error: null,
};

const activityStore = createReducer(initialState, (builder) => {
  builder
    //Get All Activity
    .addCase(GetAllActivity.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetAllActivity.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetAllActivity.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Host Activity
    .addCase(HostActivity.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(HostActivity.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(HostActivity.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Update Activity
    .addCase(UpdateActivity.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(UpdateActivity.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(UpdateActivity.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default activityStore;
