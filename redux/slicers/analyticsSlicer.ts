import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AnalyticsBrand,
  AnalyticsCategory,
  AnalyticsProduct,
  AnalyticsUser,
} from 'common/interfaces/data-analytics.interfaces';
import { TAnalyticsState } from 'redux/types';
import { AnalyticsService } from 'swagger/services';

import { getErrorMassage, handleError, handlePending, openErrorNotification } from '../../common/helpers';

interface AnalyticsPayload {
    updatedFrom?: string,
    updatedTo?: string,
    groupBy?: string
}

export const fetchAnalytics = createAsyncThunk<
  { data: AnalyticsCategory[] | AnalyticsBrand[] | AnalyticsProduct[] | AnalyticsUser[]},
  AnalyticsPayload,
  { rejectValue: string }
>(
  'analytics/fetchAnalytics',
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
  analyticsData: [],
  loading: false,
};

const analyticsSlicer = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalytics(state) {
      state.analyticsData = []
    },
  },
  extraReducers: (builder) => {
    builder
      //Categories
      .addCase(fetchAnalytics.pending, handlePending)
      .addCase(
        fetchAnalytics.fulfilled,
        (state, action) => {
          state.analyticsData = action.payload.data;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchAnalytics.rejected, handleError)
  },
});

export const { clearAnalytics } = analyticsSlicer.actions;

export default analyticsSlicer.reducer;