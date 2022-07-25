import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getErrorMassage, handleError, handlePending } from "common/helpers";
import { TCatalogState, TFilters } from "redux/types";
import { Brand, BrandService, Category, CategoryService, Color, ColorService, PriceRange, Product, ProductService } from "swagger/services";

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>(
  'catalog/fetchCategories',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await CategoryService.getCategories();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchBrands = createAsyncThunk<
  Brand[],
  undefined,
  { rejectValue: string }
>(
  'catalog/fetchBrands',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.getBrands();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchColors = createAsyncThunk<
  Color[],
  undefined,
  { rejectValue: string }
>(
  'catalog/fetchColors',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await ColorService.getColors();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchProducts = createAsyncThunk<
  Product[],
  TFilters,
  { rejectValue: string }
>(
  'catalog/fetchProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.getProducts(payload);
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchPriceRange = createAsyncThunk<
  PriceRange,
  TFilters,
  { rejectValue: string }
>(
  'catalog/fetchPiceRange',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.getPriceRange(payload);
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TCatalogState = {
  categories: [],
  brands: [],
  colors: [],
  priceRange: {
    minPrice: 0,
    maxPrice: 0,
  },
  products: [],
  filters: {},
  loading: false,
};

const cartSlicer = createSlice({
  name: 'catalog',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      //fetchCategories
      .addCase(fetchCategories.pending, handlePending)
      .addCase(
        fetchCategories.fulfilled,
        (state, action) => {
          state.categories = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchCategories.rejected, handleError)
      //fetchBrands
      .addCase(fetchBrands.pending, handlePending)
      .addCase(
        fetchBrands.fulfilled,
        (state, action) => {
          state.brands = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchBrands.rejected, handleError)
      //fetchColors
      .addCase(fetchColors.pending, handlePending)
      .addCase(
        fetchColors.fulfilled,
        (state, action) => {
          state.colors = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchColors.rejected, handleError)
      //fetchPriceRange
      .addCase(fetchPriceRange.pending, handlePending)
      .addCase(
        fetchPriceRange.fulfilled,
        (state, action) => {
          state.priceRange = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchPriceRange.rejected, handleError)
      //fetchProducts
      .addCase(fetchProducts.pending, handlePending)
      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.products = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchProducts.rejected, handleError)
  },
});

export const { } = cartSlicer.actions;

export default cartSlicer.reducer;
