import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDeliveryInfo, TOrderInfo, TStoreCheckoutState } from 'redux/types';

// export const fetchWishlist = createAsyncThunk<
//   Wishlist,
//   string,
//   { rejectValue: string }
// >(
//   'global/fetchWishlist',
//   async function (payload, { rejectWithValue }): Promise<any> {
//     // const userId = localStorage.getItem('userId');
//     try {
//       return await WishlistService.findWishlistById({ wishlistId: payload });
//     } catch (error: any) {
//       return rejectWithValue(getErrorMassage(error.response.status));
//     }
//   },
// );

const initialState: TStoreCheckoutState = {
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
    builder;
    //fetchWishlist
    // .addCase(fetchWishlist.pending, handlePending)
    // .addCase(fetchWishlist.fulfilled, (state, action) => {
    //   state.deliveryInfo = action.payload;
    //   state.loading = false;
    //   console.log('fulfilled');
    // })
    // .addCase(fetchWishlist.rejected, handleError)
  },
});

export const { clearDeliveryInfo, setDeliveryInfo, setOrderInfo } =
  storeCheckoutSlicer.actions;

export default storeCheckoutSlicer.reducer;
