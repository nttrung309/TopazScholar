// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllSupplyTypes = createAsyncThunk(
  "supplyTypeStore/GetAllSupplyTypes",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/supply/type");
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const GetSupplyType = createAsyncThunk(
  "supplyTypeStore/GetSupplyType",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/supply/type/:id"
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const CreateSupplyType = createAsyncThunk(
  "supplyTypeStore/CreateSupplyType",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/supply/addType",
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
