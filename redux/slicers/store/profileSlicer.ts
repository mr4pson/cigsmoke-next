import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TProfileState } from 'redux/types';
import { Review, ReviewService } from 'swagger/services';
import {
  getErrorMassage, handleError, handlePending
} from '../../../common/helpers';

export const fetchUserReviews = createAsyncThunk<
  { rows: Review[] },
  string,
  { rejectValue: string }
>(
  'profile/fetchUserReviews',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await ReviewService.getReviews({ userId: payload, limit: '1000' }) as unknown as { rows: Review[] };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TProfileState = {
  reviews: [],
  loading: false,
  saveLoading: false,
};

const profileSlicer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //fetchUserReviews
      .addCase(fetchUserReviews.pending, handlePending)
      .addCase(
        fetchUserReviews.fulfilled,
        (state, action) => {
          state.reviews = action.payload.rows;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchUserReviews.rejected, handleError)
  },
});

export const { } = profileSlicer.actions;

export default profileSlicer.reducer;
