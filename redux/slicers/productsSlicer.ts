import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TProductState } from 'redux/types';
import { Product, ProductService } from 'swagger/services';
import { PayloadProduct } from 'common/interfaces/payload-product.interface';

export const fetchProducts = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>(
  'products/fetchProducts',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.getProducts();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchChosenProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'products/fetchChosenProduct',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.findProductById({ productId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createProduct = createAsyncThunk<
  Product,
  PayloadProduct,
  { rejectValue: string }
>(
  'products/createProduct',
  async function (payload: PayloadProduct, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.createProduct({
        body: {
          name: payload.name,
          price: payload.price,
          available: payload.available,
          colors: payload.colors,
          category: payload.category,
          brand: payload.brand,
          url: payload.url,
          desc: payload.desc,
          images: payload.images,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editProduct = createAsyncThunk<
  Product,
  PayloadProduct,
  { rejectValue: string }
>(
  'products/editProduct',
  async function (payload: PayloadProduct, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.updateProduct({
        productId: payload.id as string, body: {
          name: payload.name,
          price: payload.price,
          available: payload.available,
          colors: payload.colors,
          category: payload.category,
          brand: payload.brand,
          url: payload.url,
          desc: payload.desc,
          images: payload.images,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'products/deleteProduct',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.deleteProduct({ productId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TProductState = {
  products: [],
  chosenProduct: null,
  loading: false,
  saveLoading: false,
};

const productsSlicer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts(state) {
      state.products = [];
    },
    clearChosenProduct(state) {
      state.chosenProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
        //fetchChosenProduct
      .addCase(fetchChosenProduct.pending, handlePending)
      .addCase(
        fetchChosenProduct.fulfilled,
        (state, action) => {
          state.chosenProduct = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchChosenProduct.rejected, handleError)
        //createProduct
      .addCase(createProduct.pending, handleChangePending)
      .addCase(
        createProduct.fulfilled,
        (state) => {
          state.saveLoading = false;
          openSuccessNotification('Продукт успешно создан');
          console.log('fulfilled');
        },
      )
      .addCase(createProduct.rejected, handleChangeError)
        //editProduct
      .addCase(editProduct.pending, handleChangePending)
      .addCase(editProduct.fulfilled, (state, action) => {
        let product = state.products.find(
          (product) => product.id === action.payload.id,
        );
        product = {
          ...product,
          ...action.payload,
        };
        openSuccessNotification('Продукт успешно обновлен');
        state.saveLoading = false;
        console.log('fulfilled');
      })
      .addCase(editProduct.rejected, handleChangeError)
        //deleteProduct
      .addCase(deleteProduct.pending, handleChangePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Продукт успешно удален');
        console.log('fulfilled');
      })
      .addCase(deleteProduct.rejected, handleChangeError);
  },
});

export const { clearChosenProduct, clearProducts } = productsSlicer.actions;

export default productsSlicer.reducer;
