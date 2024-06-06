// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import { GetHostByActId, UpdateHostByActId } from "./hostThunk";

const initialState = {
  data: null,
  dataLoadingState: "idle",
  error: null,
};

const hostStore = createReducer(initialState, (builder) => {
  builder
    // Get host by activity id
    .addCase(GetHostByActId.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetHostByActId.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetHostByActId.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    // Update host by activity id
    .addCase(UpdateHostByActId.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(UpdateHostByActId.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data.host;
      console.log(action.payload.data);
    })
    .addCase(UpdateHostByActId.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default hostStore;
