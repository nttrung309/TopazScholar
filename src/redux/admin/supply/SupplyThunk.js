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

      const typeResponse = await axios
        .get(
          "http://localhost:5000/api/supply/type/" + response.data.supply.typeID
        )
        .then((data) => data);

      const newData = {
        ...response.data.supply,
        typeName: typeResponse.data.name,
      };
      return { ...response, data: { ...response.data, supply: newData } };
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

      const typeResponse = await axios
        .get(
          "http://localhost:5000/api/supply/type/" + response.data.supply.typeID
        )
        .then((data) => data);

      const newData = {
        ...response.data.supply,
        typeName: typeResponse.data.name,
      };
      return { ...response, data: { ...response.data, supply: newData } };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
