// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import { CreateSupplyType, GetAllSupplyTypes } from "./supplyTypeThunk";

const initialState = {
  data: null,
  dataLoadingState: "idle",
  error: null,
};

const supplyTypeStore = createReducer(initialState, (builder) => {
  builder
    .addCase(CreateSupplyType.pending, (state, action) => {
      state.CreateSupplyType = "loading";
    })
    .addCase(CreateSupplyType.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.result = action.payload.data;
    })

    .addCase(CreateSupplyType.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    .addCase(GetAllSupplyTypes.pending, (state, action) => {
      state.CreateSupplyType = "loading";
    })
    .addCase(GetAllSupplyTypes.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
    })
    .addCase(GetAllSupplyTypes.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default supplyTypeStore;
