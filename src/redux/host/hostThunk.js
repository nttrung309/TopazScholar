// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetHostByActId = createAsyncThunk(
  "hostStore/GetHostById",
  async ({ actID }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/host/" + actID,
        actID
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const UpdateHostByActId = createAsyncThunk(
  "hostStore/UpdateHostByActId",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/host/update",
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
