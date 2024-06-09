// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import { CreateSupply, GetAllSupplies } from "./SupplyThunk";

const initialState = {
  data: null,
  dataLoadingState: "idle",
  error: null,
};

const supplyStore = createReducer(initialState, (builder) => {
  builder
    .addCase(GetAllSupplies.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetAllSupplies.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetAllSupplies.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    .addCase(CreateSupply.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(CreateSupply.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.result = action.payload.data;
    })
    .addCase(CreateSupply.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default supplyStore;
