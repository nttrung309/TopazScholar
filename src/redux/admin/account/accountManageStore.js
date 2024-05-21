// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";

import { GetAllUsersData } from "./accountManageThunk";

const initialState = {
  data: null,
  dataLoadingState: "idle",
  error: null,
};

const accountManageStore = createReducer(initialState, (builder) => {
  builder
    .addCase(GetAllUsersData.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetAllUsersData.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetAllUsersData.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default accountManageStore;
