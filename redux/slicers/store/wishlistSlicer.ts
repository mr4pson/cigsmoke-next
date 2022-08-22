import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { TWishlistState } from 'redux/types';
import { Product, WishlistService } from 'swagger/services';

export const fetchWishlistProducts = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>(
  'wishlist/fetchWishlistProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await WishlistService.findWishlistProducts({ wishlistId: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TWishlistState = {
  products: [],
  loading: false,
};

const wishlistSlicer = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchWishlistProducts
      .addCase(fetchWishlistProducts.pending, handlePending)
      .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchWishlistProducts.rejected, handleError);
  },
});

export const { } = wishlistSlicer.actions;

export default wishlistSlicer.reducer;
