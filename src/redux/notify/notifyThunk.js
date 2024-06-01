// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const NotifyGetAllData = createAsyncThunk(
    'contactStore/NotifyGetAllData',
    async ({id}) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notify/${id}`);
        return response;
      } catch (error) {
        throw new Error(error.message);
      }
    }
);

export const UpdateReadNotify = createAsyncThunk(
  'contactStore/UpdateReadNotify',
  async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notify/mark-read', 
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
