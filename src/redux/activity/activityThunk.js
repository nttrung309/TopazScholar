// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllActivity = createAsyncThunk(
  "activityStore/GetAllActivity",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/activity/");
      const promise = Promise.all(
        response.data.map(async (item) => {
          const hostResponse = await axios.get(
            "http://localhost:5000/api/host/" + item.actID,
            item.actID
          );
          return { ...item, hostName: hostResponse.data.userID };
        })
      ).then((result) => result);

      const newData = await promise;

      return { ...response, data: newData };
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
