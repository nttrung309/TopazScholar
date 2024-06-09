// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import { CreateSupply, GetAllSupplies, UpdateSupply } from "./SupplyThunk";

const initialState = {
  data: [],
  dataLoadingState: "idle",
  error: null,
  result: "",
};

const supplyStore = createReducer(initialState, (builder) => {
  builder
    .addCase(GetAllSupplies.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetAllSupplies.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      console.log(action.payload.data);
      state.data = action.payload.data;
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
      state.result = action.payload.data.status;
      state.data.push(action.payload.data.supply);
      console.log(state.data);
    })
    .addCase(CreateSupply.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    .addCase(UpdateSupply.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(UpdateSupply.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.result = action.payload.data.status;
      const updateData = state.data.map((item) => {
        if (item.supplyID === action.payload.data.supply.supplyID)
          return action.payload.data.supply;
        else return { ...item };
      });
      state.data = updateData;
    })
    .addCase(UpdateSupply.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default supplyStore;
