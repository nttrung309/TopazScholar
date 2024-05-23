// @ts-nocheck
import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const ContactGetAllMessage = createAsyncThunk(
    'contactStore/ContactGetAllMessage',
    async ({id}) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/message/${id}`);
        console.log(response);
        return response;
      } catch (error) {
        
        throw new Error(error.message);
      }
    }
);
