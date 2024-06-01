// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import { GetHostById } from "./hostThunk";

const initialState = {
  data: null,
  dataLoadingState: "idle",
  error: null,
};

const hostStore = createReducer(initialState, (builder) => {
  builder
    //Get Host by Id
    .addCase(GetHostById.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetHostById.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetHostById.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default hostStore;
