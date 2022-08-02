import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TGlobalState } from 'redux/types';
import { BasketDTO, Category, CategoryService, Product, ProductService, Wishlist, WishlistService } from 'swagger/services';
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

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>(
  'catalog/fetchCategories',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await CategoryService.getCategories() as unknown as { rows: Category[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const searchProducts = createAsyncThunk<
  Product[],
  { name?: string, categories: string[] },
  { rejectValue: string }
>(
  'catalog/searchProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await ProductService.getProducts(payload) as unknown as { rows: Category[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TGlobalState = {
  wishlist: null,
  categories: [],
  products: [],
  loading: false,
};

const globalSlicer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    clearSearchProducts(state) {
      state.products = [];
    },
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
      //fetchCategories
      .addCase(fetchCategories.pending, handlePending)
      .addCase(
        fetchCategories.fulfilled,
        (state, action) => {
          state.categories = action.payload.filter(category => !category.parent);
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchCategories.rejected, handleError)
      //searchProducts
      .addCase(searchProducts.pending, handlePending)
      .addCase(
        searchProducts.fulfilled,
        (state, action) => {
          state.products = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(searchProducts.rejected, handleError)
  },
});

export const { clearSearchProducts } = globalSlicer.actions;

export default globalSlicer.reducer;
