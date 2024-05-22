// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";

import { ChangeActiveState, GetAllUsersData, UpdateUserData } from "./accountManageThunk";

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
    })

    .addCase(UpdateUserData.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(UpdateUserData.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = state.data.some(item => item.email === action.payload.data.email)
      ? state.data.map(item =>
          item.email === action.payload.data.email ? action.payload.data : item
        )
      : [...state.data, action.payload.data];
      console.log(action.payload.data);
    })
    .addCase(UpdateUserData.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })
    
    .addCase(ChangeActiveState.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(ChangeActiveState.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = state.data.some(item => item.email === action.payload.data.email)
      ? state.data.map(item =>
          item.email === action.payload.data.email ? action.payload.data : item
        )
      : [...state.data, action.payload.data];
      console.log(action.payload.data);
    })
    .addCase(ChangeActiveState.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default accountManageStore;
