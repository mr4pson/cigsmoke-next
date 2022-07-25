import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TGlobalState } from 'redux/types';
import { BasketDTO, Wishlist, WishlistService } from 'swagger/services';
import {
  getErrorMassage, handleError, handlePending
} from '../../../common/helpers';

export const fetchWishlist = createAsyncThunk<
  Wishlist,
  string,
  { rejectValue: string }
>(
  'global/fetchWishlist',
  async function (payload, { rejectWithValue }): Promise<any> {
    // const userId = localStorage.getItem('userId');
    try {
      return await WishlistService.findWishlistById({ wishlistId: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createWishlist = createAsyncThunk<
  Wishlist,
  undefined,
  { rejectValue: string }
>(
  'global/createWishlist',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await WishlistService.createWishlist();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateWishlist = createAsyncThunk<
  Wishlist,
  Wishlist,
  { rejectValue: string }
>(
  'global/updateWishlist',
  async function (payload: BasketDTO, { rejectWithValue }): Promise<any> {
    try {
      const wishlistId = localStorage.getItem('wishlistId') ?? '';

      return await WishlistService.updateWishlist({ wishlistId, body: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TGlobalState = {
  wishlist: null,
  loading: false,
};

const brandsSlicer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // clearBrands(state) {
    //   state.brands = [];
    // },
  },
  extraReducers: (builder) => {
    builder
      //fetchWishlist
      .addCase(fetchWishlist.pending, handlePending)
      .addCase(
        fetchWishlist.fulfilled,
        (state, action) => {
          state.wishlist = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchWishlist.rejected, handleError)
      // createWishlist
      .addCase(createWishlist.pending, handlePending)
      .addCase(
        createWishlist.fulfilled,
        (state, action) => {
          state.wishlist = action.payload;
          localStorage.setItem('wishlistId', action.payload.id!);
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(createWishlist.rejected, handleError)
      //updateWishlist
      .addCase(updateWishlist.pending, handlePending)
      .addCase(
        updateWishlist.fulfilled,
        (state, action) => {
          state.wishlist = action.payload;
          localStorage.setItem('wishlistId', action.payload.id!);
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(updateWishlist.rejected, handleError)
  },
});

export const { } = brandsSlicer.actions;

export default brandsSlicer.reducer;
