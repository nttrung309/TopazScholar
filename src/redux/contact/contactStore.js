// @ts-nocheck
import { createReducer } from '@reduxjs/toolkit';
import { ContactGetAllMessage } from './contactThunk';

const initialState = {
  msgData: null,
  dataLoadingState: "idle",
  error: null,
};

const contactStore = createReducer(initialState, (builder) => {
  builder
    .addCase(ContactGetAllMessage.pending, (state, action) => {
      state.dataLoadingState = "loading";
    })
    .addCase(ContactGetAllMessage.fulfilled, (state, action) => {
      state.dataLoadingState = "succeeded";
      state.msgData = action.payload.data;
      console.log(action.payload.data);
    })
    .addCase(ContactGetAllMessage.rejected, (state, action) => {
      state.dataLoadingState = "failed";
      state.error = action.error.message;
    })
});

export default contactStore;
