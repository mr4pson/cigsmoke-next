import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import {
  FetchPayload,
  RequestResponse,
  TCheckoutState,
} from '../../redux/types';
import {
  Checkout,
  CheckoutService,
  CheckoutAllService,
} from 'swagger/services';
import { handlePaginationDataFormatter } from 'redux/helpers';

export const fetchCheckouts = createAsyncThunk<
  RequestResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'checkouts/fetchCheckouts',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutService.getCheckouts({
        limit: payload?.limit,
        offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchCheckoutsAll = createAsyncThunk<
  RequestResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'checkouts/fetchCheckouts',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutAllService.getCheckoutsAll({
        limit: payload?.limit,
        offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteCheckout = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'checkouts/deleteCheckout',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutService.deleteCheckout({ checkoutId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TCheckoutState = {
  checkouts: [],
  loading: false,
  saveLoading: false,
};

const checkoutsSlicer = createSlice({
  name: 'checkouts',
  initialState,
  reducers: {
    clearCheckouts(state) {
      state.checkouts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCheckouts
      .addCase(fetchCheckouts.pending, handlePending)
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.checkouts = handlePaginationDataFormatter(action);
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchCheckouts.rejected, handleError)
      //deleteCheckout
      .addCase(deleteCheckout.pending, handleChangePending)
      .addCase(deleteCheckout.fulfilled, (state, action) => {
        state.checkouts = state.checkouts.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Заказ успешно удален');
        console.log('fulfilled');
      })
      .addCase(deleteCheckout.rejected, handleChangeError);
  },
});

export const { clearCheckouts } = checkoutsSlicer.actions;

export default checkoutsSlicer.reducer;
