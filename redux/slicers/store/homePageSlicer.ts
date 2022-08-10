import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { THomePageState } from 'redux/types';
import {
  BrandResponse,
  BrandService,
  ReviewResponse,
  ReviewService,
} from 'swagger/services';

export const fetchReviews = createAsyncThunk<
  ReviewResponse,
  undefined,
  { rejectValue: string }
>(
  'homePage/fetchReviews',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await ReviewService.getReviews({
        showOnMain: true,
        limit: '8',
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchBrands = createAsyncThunk<
  BrandResponse,
  undefined,
  { rejectValue: string }
>(
  'homePage/fetchBrands',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await BrandService.getBrands({
        showOnMain: true,
        limit: '8',
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: THomePageState = {
  reviews: [],
  brands: [],
  loading: false,
};

const homePageSlicer = createSlice({
  name: 'homePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchReviews
      .addCase(fetchReviews.pending, handlePending)
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.rows!;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchReviews.rejected, handleError)
      //fetchBrands
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload.rows!;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchBrands.rejected, handleError);
  },
});

export const {} = homePageSlicer.actions;

export default homePageSlicer.reducer;
