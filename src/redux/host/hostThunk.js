// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetHostById = createAsyncThunk(
  "hostStore/GetHostById",
  async ({ actId }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/host/" + actId,
        actId
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
