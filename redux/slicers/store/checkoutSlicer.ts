import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { TDeliveryInfo, TOrderInfo, TStoreCheckoutState } from 'redux/types';
import { Checkout, CheckoutService } from 'swagger/services';

export const fetchCheckouts = createAsyncThunk<
  Checkout[],
  undefined,
  { rejectValue: string }
>(
  'checkout/fetchCheckouts',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await CheckoutService.getCheckouts() as unknown as { rows: Checkout[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TStoreCheckoutState = {
  checkouts: [],
  deliveryInfo: null,
  orderInfo: null,
  loading: false,
};

const storeCheckoutSlicer = createSlice({
  name: 'storeCheckout',
  initialState,
  reducers: {
    setDeliveryInfo(state, action: PayloadAction<TDeliveryInfo>) {
      state.deliveryInfo = action.payload;
    },
    setOrderInfo(state, action: PayloadAction<TOrderInfo>) {
      state.orderInfo = action.payload;
    },
    clearDeliveryInfo(state) {
      state.deliveryInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCheckouts
      .addCase(fetchCheckouts.pending, handlePending)
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.checkouts = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchCheckouts.rejected, handleError)
  },
});

export const { clearDeliveryInfo, setDeliveryInfo, setOrderInfo } =
  storeCheckoutSlicer.actions;

export default storeCheckoutSlicer.reducer;
