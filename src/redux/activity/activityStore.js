// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";
import {
  GetActivityByActID,
  GetAllActivity,
  GetNumberCategories,
  GetRecentActivities,
  HostActivity,
  UpdateActivity,
  UpdateHaft,
} from "./activityThunk";

const initialState = {
  data: null,
  dataLoadingState: "idle",
  error: null,
};

const activityStore = createReducer(initialState, (builder) => {
  builder
    //Get all activities
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

    //Get number activities of category
    .addCase(GetNumberCategories.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetNumberCategories.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetNumberCategories.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Get recent activities
    .addCase(GetRecentActivities.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetRecentActivities.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetRecentActivities.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Get Activity by ActID
    .addCase(GetActivityByActID.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(GetActivityByActID.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.data = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(GetActivityByActID.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Host new activity
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

    //Update with keys in edit page
    .addCase(UpdateActivity.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(UpdateActivity.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
    })
    .addCase(UpdateActivity.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })

    //Update with some keys props
    .addCase(UpdateHaft.pending, (state, _action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(UpdateHaft.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      console.log(action.payload.data);
      const updateData = state.data.map((data) =>
        data.actID === action.payload.data.actID
          ? { ...action.payload.data }
          : data
      );
      state.data = updateData;
    })
    .addCase(UpdateHaft.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    });
});

export default activityStore;
