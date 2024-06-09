// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllSupplies = createAsyncThunk(
  "supplyStore/GetAllSupplies",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/supply/");
      const promise = Promise.all(
        response.data.map(async (item) => {
          const typeResponse = await axios.get(
            "http://localhost:5000/api/supply/type/" + item.typeID
          );
          return {
            ...item,
            typeName: typeResponse.data.name,
          };
        })
      ).then((result) => result);
      const newData = await promise;
      console.log(newData);
      return { ...response, data: newData };
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

export const UpdateSupply = createAsyncThunk(
  "supplyStore/UpdateSupply",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/supply/update",
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
