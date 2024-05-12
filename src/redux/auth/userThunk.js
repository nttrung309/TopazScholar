// @ts-nocheck
import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const AuthLogin = createAsyncThunk(
    'userStore/AuthLogin',
    async ({email, password}) => {
      try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
          email,
          password
        });
        return response;
      } catch (error) {
        
        throw new Error(error.message);
      }
    }
);

export const AuthSignUp = createAsyncThunk(
  'userStore/AuthSignUp',
  async ({email, password}) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/sign-up', {
        email,
        password
      });
      return response;
    } catch (error) {
      
      throw new Error(error.message);
    }
  }
);
