import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TCheckoutState } from 'redux/types';
import { Checkout, CheckoutService } from 'swagger/services';

export const fetchCheckouts = createAsyncThunk<
  Checkout[],
  undefined,
  { rejectValue: string }
>(
  'checkouts/fetchCheckouts',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const resp = await CheckoutService.getCheckouts() as unknown as { rows: Checkout[] };
      return resp.rows
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
  saveLoading: false
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
      .addCase(
        fetchCheckouts.fulfilled,
        (state, action) => {
          state.checkouts = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
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
