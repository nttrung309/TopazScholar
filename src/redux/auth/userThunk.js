// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AuthLogin = createAsyncThunk(
  "userStore/AuthLogin",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const AuthSignUp = createAsyncThunk(
  "userStore/AuthSignUp",
  async ({ email, password, name }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/sign-up",
        {
          email,
          password,
          name,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const AutoLogin = createAsyncThunk("userStore/AutoLogin", async () => {
  try {
    const req = {
      token: localStorage.getItem("token"),
      uid: localStorage.getItem("uid"),
    };

    const response = await axios.post(
      "http://localhost:5000/api/user/check-auto-login",
      req
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const AttendActivity = createAsyncThunk(
  "userStore/AttendActivity",
  async ({ actID, userID }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/attend",
        {
          actID,
          userID
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
