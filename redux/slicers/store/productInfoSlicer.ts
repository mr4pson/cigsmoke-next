import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TProductInfoState } from 'redux/types';
import { Product, ProductService } from 'swagger/services';
import {
  getErrorMassage, handleError, handlePending
} from '../../../common/helpers';

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'productInfo/fetchProduct',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.findProductByUrl({ url: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TProductInfoState = {
  product: undefined,
  loading: false,
};

const productInfoSlicer = createSlice({
  name: 'productInfo',
  initialState,
  reducers: {
    clearProductInfo(state) {
      state.product = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchProduct.pending, handlePending)
      .addCase(
        fetchProduct.fulfilled,
        (state, action) => {
          state.product = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchProduct.rejected, handleError)
  },
});

export const { clearProductInfo } = productInfoSlicer.actions;

export default productInfoSlicer.reducer;
