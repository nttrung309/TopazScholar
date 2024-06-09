// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllSupplies = createAsyncThunk(
  "supplyStore/GetAllSupplies",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/supply/");
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const CreateSupply = createAsyncThunk(
  "supplyStore/CreateSupply",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/supply/add",
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
