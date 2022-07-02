import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'common/axios.instance';
import { TCategory, TCategoryState } from 'common/interfaces/types';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { PayloadCategory } from 'common/interfaces/payload-category.interface';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';

export const fetchCategories = createAsyncThunk<
  TCategory[],
  undefined,
  { rejectValue: string }
>(
  'categories/fetchCategories',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const resp = await axiosInstance.get('/api/categories');
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchCategory = createAsyncThunk<
  TCategory,
  string,
  { rejectValue: string }
>(
  'categories/fetchCategory',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const resp = await axiosInstance.get(`/api/categories/${id}`);
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

//проверить правильность исполнения функции после исправления ошибки с созданием категории!
export const createNewCategory = createAsyncThunk<
  TCategory[],
  PayloadCategory,
  { rejectValue: string }
>(
  'categories/createNewCategory',
  async function (payload: PayloadCategory, { rejectWithValue }): Promise<any> {
    try {
      const resp = await axiosInstance.post('/api/categories/', {
        name: payload.name,
        url: payload.url,
        parentId: payload.parent,
      });
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);
//проверить правильность исполнения функции после исправления ошибки с созданием категории!
export const editCategory = createAsyncThunk<
  TCategory[],
  PayloadCategory,
  { rejectValue: string }
>(
  'categories/editCategory',
  async function (payload: PayloadCategory, { rejectWithValue }): Promise<any> {
    try {
      const resp = await axiosInstance.put(`/api/categories/${payload.id}`, {
        name: payload.name,
        url: payload.url,
        parentId: payload.parent,
      });
      console.log(resp);
      return resp.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteCategory = createAsyncThunk<
  TCategory[],
  string,
  { rejectValue: string }
>(
  'categories/deleteCategory',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const resp = await axiosInstance.delete(`/api/categories/${id}`);
      console.log(resp);
      return id;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TCategoryState = {
  categories: [],
  category: null,
  loading: false,
  saveLoading: false,
};

const categoriesSlicer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories(state: TCategoryState) {
      state.categories = [];
    },
    clearCategory(state: TCategoryState) {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCategories
      .addCase(fetchCategories.pending, handlePending)
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<TCategory[]>) => {
          state.categories = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchCategories.rejected, handleError)
      //fetchCategory
      .addCase(fetchCategory.pending, handlePending)
      .addCase(
        fetchCategory.fulfilled,
        (state, action: PayloadAction<TCategory>) => {
          state.category = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchCategory.rejected, handleError)
      //createCategory
      .addCase(createNewCategory.pending, handleChangePending)
      .addCase(
        createNewCategory.fulfilled,
        (state, action: PayloadAction<any, any, any>) => {
          // state.categories.push(action.payload);
          state.saveLoading = false;
          openSuccessNotification('Категория успешно создана');
          console.log('fulfilled');
        },
      )
      .addCase(createNewCategory.rejected, handleChangeError)
      //editCategory
      .addCase(editCategory.pending, handleChangePending)
      .addCase(editCategory.fulfilled, (state, action: { payload: any }) => {
        let category = state.categories.find(
          (category) => category.id === action.payload.id,
        );
        category = {
          ...category,
          ...action.payload,
        };
        openSuccessNotification('Категория успешно обновлена');
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(editCategory.rejected, handleChangeError)
      //deleteCategory
      .addCase(deleteCategory.pending, handleChangePending)
      .addCase(deleteCategory.fulfilled, (state, action: { payload: any }) => {
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload,
        );
        state.loading = false;
        openSuccessNotification('Категория успешно удалена');
        console.log('fulfilled');
      })
      .addCase(deleteCategory.rejected, handleChangeError);
  },
});

export const { clearCategories, clearCategory } = categoriesSlicer.actions;

export default categoriesSlicer.reducer;
