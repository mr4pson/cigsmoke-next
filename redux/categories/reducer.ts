import { createReducer } from '@reduxjs/toolkit';
import { getCategories } from './actions';

export type CategoriesState = {
  data: { categories: any[] };
  loading: boolean;
  error: boolean;
};

const initialState: CategoriesState = {
  data: { categories: [] },
  loading: false,
  error: false,
};

export const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCategories.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    })
    .addCase(getCategories.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
});

export default categoriesReducer;
