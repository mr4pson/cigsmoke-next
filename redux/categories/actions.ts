import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from 'common/axios.instance';

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await axiosInstance.get("/categories");

  return response.data;
});

export const getCategory = createAsyncThunk('categories/getCategory', async (id: number) => {
  const response = await axiosInstance.get(`/categories${id}`);

  return response.data;
});