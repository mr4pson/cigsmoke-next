import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TBrandState } from 'redux/types';
import { Brand, BrandService } from 'swagger/services';
import { PayloadBrand } from 'common/interfaces/payload-brand.interface';
import { useAppDispatch } from 'redux/hooks';
import { setDefaultImageList } from './imagesSlicer';

export const fetchBrands = createAsyncThunk<
  Brand[],
  undefined,
  { rejectValue: string }
>(
  'brands/fetchBrands',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await BrandService.getBrands() as unknown as { rows: Brand[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchChosenBrand = createAsyncThunk<
  Brand,
  string,
  { rejectValue: string }
>(
  'brands/fetchChosenBrand',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.findBrandById({ brandId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createBrand = createAsyncThunk<
  Brand,
  PayloadBrand,
  { rejectValue: string }
>(
  'brands/createBrand',
  async function (payload: PayloadBrand, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.createBrand({
        body: {
          name: payload.name,
          image: payload.image,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editBrand = createAsyncThunk<
  Brand,
  PayloadBrand,
  { rejectValue: string }
>(
  'brands/editBrand',
  async function (payload: PayloadBrand, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.updateBrand({
        brandId: payload.id as string, body: {
          name: payload.name,
          image: payload.image,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteBrand = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'brands/deleteBrand',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.deleteBrand({ brandId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TBrandState = {
  brands: [],
  chosenBrand: null,
  loading: false,
  saveLoading: false,
};

const brandsSlicer = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearBrands(state) {
      state.brands = [];
    },
    clearChosenBrand(state) {
      state.chosenBrand = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      //fetchBrand
      .addCase(fetchChosenBrand.pending, handlePending)
      .addCase(
        fetchChosenBrand.fulfilled,
        (state, action) => {
          state.chosenBrand = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchChosenBrand.rejected, handleError)
      //createBrand
      .addCase(createBrand.pending, handleChangePending)
      .addCase(
        createBrand.fulfilled,
        (state) => {
          state.saveLoading = false;
          openSuccessNotification('Бренд успешно создан');
          console.log('fulfilled');
        },
      )
      .addCase(createBrand.rejected, handleChangeError)
      //editBrand
      .addCase(editBrand.pending, handleChangePending)
      .addCase(editBrand.fulfilled, (state, action) => {
        let brand = state.brands.find(
          (brand) => brand.id === action.payload.id,
        );
        brand = {
          ...brand,
          ...action.payload,
        };
        openSuccessNotification('Бренд успешно обновлен');
        state.saveLoading = false;
        console.log('fulfilled');
      })
      .addCase(editBrand.rejected, handleChangeError)
      //deleteColor
      .addCase(deleteBrand.pending, handleChangePending)
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Бренд успешно удален');
        console.log('fulfilled');
      })
      .addCase(deleteBrand.rejected, handleChangeError);
  },
});

export const { clearBrands, clearChosenBrand } = brandsSlicer.actions;

export default brandsSlicer.reducer;
