// @ts-nocheck
import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetAllUsersData = createAsyncThunk(
    'accountManageStore/GetAllUsersData',
    async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/');
        return response;
      } catch (error) {
        
        throw new Error(error.message);
      }
    }
);

export const UpdateUserData = createAsyncThunk(
  'accountManageStore/UpdateUserData',
  async ({email, password, name, phone}) => {
    try {
      console.log(email);
      const response = await axios.post('http://localhost:5000/api/user/update', {
        email: email,
        password: password,
        name: name,
        phone: phone
      });
      return response;
    } catch (error) {
      
      throw new Error(error.message);
    }
  }
);

export const ChangeActiveState = createAsyncThunk(
  'accountManageStore/ChangeActiveState',
  async ({email, active}) => {
    try {
      console.log(email, active);
      const response = await axios.post('http://localhost:5000/api/user/update', {
        email: email,
        active: !active
      });
      return response;
    } catch (error) {
      
      throw new Error(error.message);
    }
  }
);
