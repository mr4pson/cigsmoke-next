import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
  openErrorNotification,
} from '../../common/helpers';
import { TAnalyticsState } from 'redux/types';
import { AnalyticsService } from 'swagger/services';
import { AnalyticsBrand, AnalyticsCategory, AnalyticsProduct, AnalyticsUser } from 'common/interfaces/data-analytics.interfaces';

interface AnalyticsPayload {
    updatedFrom?: string,
    updatedTo?: string,
    groupBy?: string
}

export const fetchAnalyticsCategories = createAsyncThunk<
  { data: AnalyticsCategory[] },
  AnalyticsPayload,
  { rejectValue: string }
>(
  'analytics/fetchAnalyticsCategories',
  async function (payload: AnalyticsPayload, { rejectWithValue }): Promise<any> {
    try {
      return await AnalyticsService.getAnalytics({
        updatedFrom: payload?.updatedFrom,
        updatedTo: payload?.updatedTo,
        groupBy: payload?.groupBy});
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchAnalyticsBrands = createAsyncThunk<
  { data: AnalyticsBrand[] },
  AnalyticsPayload,
  { rejectValue: string }
>(
  'analytics/fetchAnalyticsBrands',
  async function (payload: AnalyticsPayload, { rejectWithValue }): Promise<any> {
    try {
      return await AnalyticsService.getAnalytics({
        updatedFrom: payload?.updatedFrom,
        updatedTo: payload?.updatedTo,
        groupBy: payload?.groupBy});
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchAnalyticsProducts = createAsyncThunk<
  { data: AnalyticsProduct[] },
  AnalyticsPayload,
  { rejectValue: string }
>(
  'analytics/fetchAnalyticsProducts',
  async function (payload: AnalyticsPayload, { rejectWithValue }): Promise<any> {
    try {
      return await AnalyticsService.getAnalytics({
        updatedFrom: payload?.updatedFrom,
        updatedTo: payload?.updatedTo,
        groupBy: payload?.groupBy});
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchAnalyticsUsers = createAsyncThunk<
  { data: AnalyticsUser[] },
  AnalyticsPayload,
  { rejectValue: string }
>(
  'analytics/fetchAnalyticsUsers',
  async function (payload: AnalyticsPayload, { rejectWithValue }): Promise<any> {
    try {
      return await AnalyticsService.getAnalytics({
        updatedFrom: payload?.updatedFrom,
        updatedTo: payload?.updatedTo,
        groupBy: payload?.groupBy});
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TAnalyticsState = {
  categories: [],
  brands: [],
  products: [],
  users: [],
  categoriesLoading: false,
  brandsLoading: false,
  productsLoading: false,
  usersLoading: false,
};

const analyticsSlicer = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalytics(state) {
      state.categories = [];
      state.brands = [];
      state.products = [];
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //Categories
      .addCase(fetchAnalyticsCategories.pending, 
        (state) => {
        state.categoriesLoading = true;
        console.log('pending')
      })
      .addCase(
        fetchAnalyticsCategories.fulfilled,
        (state, action) => {
          state.categories = action.payload.data;
          state.categoriesLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchAnalyticsBrands.rejected, 
        (state, action) => {
        state.categoriesLoading = false;
        openErrorNotification(action.payload as string)
        console.log('rejected')
      })
      //Brands
      .addCase(fetchAnalyticsBrands.pending, (state) => {
        state.brandsLoading = true;
        console.log('pending')
      })
      .addCase(
        fetchAnalyticsBrands.fulfilled,
        (state, action) => {
          state.brands = action.payload.data;
          state.brandsLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchAnalyticsCategories.rejected, 
        (state, action) => {
        state.brandsLoading = false;
        openErrorNotification(action.payload as string)
        console.log('rejected')
      })
      //Products
      .addCase(fetchAnalyticsProducts.pending, (state) => {
        state.productsLoading = true;
        console.log('pending')
      })
      .addCase(
        fetchAnalyticsProducts.fulfilled,
        (state, action) => {
          state.products = action.payload.data;
          state.productsLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchAnalyticsProducts.rejected, 
        (state, action) => {
        state.productsLoading = false;
        openErrorNotification(action.payload as string)
        console.log('rejected')
      })
      //Users
      .addCase(fetchAnalyticsUsers.pending, (state) => {
        state.usersLoading = true;
        console.log('pending')
      })
      .addCase(
        fetchAnalyticsUsers.fulfilled,
        (state, action) => {
          state.users = action.payload.data;
          state.usersLoading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchAnalyticsUsers.rejected, 
        (state, action) => {
        state.usersLoading = false;
        openErrorNotification(action.payload as string)
        console.log('rejected')
      })
  },
});

export const { clearAnalytics } = analyticsSlicer.actions;

export default analyticsSlicer.reducer;