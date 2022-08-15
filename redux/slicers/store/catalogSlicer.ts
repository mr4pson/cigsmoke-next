import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { TCatalogState, TFilters } from 'redux/types';
import {
  Brand,
  BrandService,
  Category,
  CategoryService,
  Color,
  ColorService,
  PriceRange,
  Product,
  ProductService,
} from 'swagger/services';

export const fetchParentCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>(
  'catalog/fetchParentCategories',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await CategoryService.getCategories();
      return response.rows?.filter((category) => !category.parent);
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchSubCategories = createAsyncThunk<
  Category[],
  string,
  { rejectValue: string }
>(
  'catalog/fetchSubCategories',
  async function (categoryUrl, { rejectWithValue }): Promise<any> {
    try {
      const response = (await CategoryService.getCategories({
        parent: categoryUrl,
      })) as unknown as { rows: Category[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchBrands = createAsyncThunk<
  Brand[],
  { category?: string; parent?: string },
  { rejectValue: string }
>(
  'catalog/fetchBrands',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await BrandService.getBrands(payload);
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchColors = createAsyncThunk<
  Color[],
  { category?: string; parent?: string },
  { rejectValue: string }
>(
  'catalog/fetchColors',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await ColorService.getColors(payload)) as unknown as {
        rows: Color[];
      };
      return response.rows;
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
      const response = (await ProductService.getProducts(
        payload,
      )) as unknown as { rows: Product[] };
      return response.rows;
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
  subCategories: [],
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
    clearSubCategories(state) {
      state.subCategories = initialState.subCategories;
    },
    clearBrands(state) {
      state.brands = initialState.brands;
    },
    clearColors(state) {
      state.colors = initialState.colors;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCategories
      .addCase(fetchParentCategories.pending, handlePending)
      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchParentCategories.rejected, handleError)
      //fetchSubCategories
      .addCase(fetchSubCategories.pending, handlePending)
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.subCategories = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchSubCategories.rejected, handleError)
      //fetchBrands
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchBrands.rejected, handleError)
      //fetchColors
      .addCase(fetchColors.pending, handlePending)
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.colors = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchColors.rejected, handleError)
      //fetchPriceRange
      .addCase(fetchPriceRange.pending, handlePending)
      .addCase(fetchPriceRange.fulfilled, (state, action) => {
        state.priceRange = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchPriceRange.rejected, handleError)
      //fetchProducts
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchProducts.rejected, handleError);
  },
});

export const { clearSubCategories, clearBrands, clearColors } =
  cartSlicer.actions;

export default cartSlicer.reducer;
