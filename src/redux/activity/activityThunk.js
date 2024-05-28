// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllActivity = createAsyncThunk(
  "activityStore/GetAllActivity",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/activity/");
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const HostActivity = createAsyncThunk(
  "activityStore/HostActivity",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/activity/host",
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
