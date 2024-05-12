// @ts-nocheck
import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetAllActivity = createAsyncThunk(
    'activityStore/GetAllActivity',
    async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/activity/');
        return response;
      } catch (error) {
        
        throw new Error(error.message);
      }
    }
);
