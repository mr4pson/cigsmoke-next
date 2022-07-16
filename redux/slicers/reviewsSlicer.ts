import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TReviewState } from 'redux/types';
import { Review, ReviewService } from 'swagger/services';

export const fetchReviews = createAsyncThunk<
  Review[],
  undefined,
  { rejectValue: string }
>(
  'reviews/fetchReviews',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await ReviewService.getReviews();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);



export const deleteReview = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'reviews/deleteReview',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await ReviewService.deleteReview({ reviewId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TReviewState = {
  reviews: [],
  loading: false,
  saveLoading: false
};

const reviewsSlicer = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews(state) {
      state.reviews = [];
    },
},
    extraReducers: (builder) => {
    builder
      //fetchReviews
      .addCase(fetchReviews.pending, handlePending)
      .addCase(
        fetchReviews.fulfilled,
        (state, action) => {
          state.reviews = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchReviews.rejected, handleError)
      //deleteReview
      .addCase(deleteReview.pending, handleChangePending)
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Комментарий успешно удален');
        console.log('fulfilled');
      })
      .addCase(deleteReview.rejected, handleChangeError);
  },
});

export const { clearReviews } = reviewsSlicer.actions;

export default reviewsSlicer.reducer;
