// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import { NotifyGetAllData, UpdateReadNotify } from "./notifyThunk";
import {} from "./notifyAction";

const initialState = {
  data: [],
  dataLoadingState: "idle",
  error: null,
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

    .addCase(UpdateReadNotify.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(UpdateReadNotify.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";

      if (action.payload.data.type === "all") {
        console.log(action.payload.data.type);
        state.data = action.payload.data.updatedNotify;
      } else {
        console.log(action.payload.data.type);
        const updatedNotifyData = state.data.map((data) =>
          data.notifyID === action.payload.data.updatedNotify.notifyID
            ? { ...data, isRead: true }
            : data
        );
        state.data = updatedNotifyData;
      }
    })
    .addCase(UpdateReadNotify.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default notifyStore;
