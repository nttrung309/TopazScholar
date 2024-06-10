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
            "http://localhost:5000/api/host/" + item.actID
          );
          return {
            ...item,
            hostName: hostResponse.data.userID,
            regStatus: hostResponse.data.regStatus,
            regDate: hostResponse.data.regDate,
            denyReason: hostResponse.data.denyReason,
            adminNote: hostResponse.data.adminNote,
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

export const GetNumberCategories = createAsyncThunk(
  "activityStore/GetNumberCategories",
  async (data) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/activity/get-number-categories/?firstDay=" +
          data.firstDay +
          "&lastDay=" +
          data.lastDay
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const GetRecentActivities = createAsyncThunk(
  "activityStore/GetRecentActivities",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/activity/recent"
      );
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const GetActivityByActID = createAsyncThunk(
  "activityStore/GetActivityByActID",
  async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/activity/" + id
      );

      const hostResponse = await axios.get(
        "http://localhost:5000/api/host/" + id
      );
      const newData = {
        ...response.data,
        hostName: hostResponse.data.userID,
        regStatus: hostResponse.data.regStatus,
        regDate: hostResponse.data.regDate,
      };

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

export const UpdateActivity = createAsyncThunk(
  "activityStore/UpdateActivity",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/activity/update",
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const UpdateHaft = createAsyncThunk(
  "activityStore/UpdateHaft",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/activity/haflUpdate",
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
