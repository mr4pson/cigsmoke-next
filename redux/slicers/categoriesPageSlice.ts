import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "common/axios.instance";

// import { TypeDispatch } from "redux/ReduxStore";

// Deprecated

const categoriesPageSlice = createSlice({
  name: "categoriesPage",
  initialState: {
    categories: [] as any[],
    category: {} as any,
    loading: false,
  },
  reducers: {
    setCategories: (state, action: PayloadAction<any[]>) => ({
      ...state,
      categories: action.payload,
    }),
    setCategory: (state, action: PayloadAction<any>) => ({
      ...state,
      category: action.payload,
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const categoriesThunks = {
  getCategories: () => async (dispatch: any) => {
    dispatch(setLoading(true));
    const response = await axiosInstance.get("/categories");
    dispatch(setCategories(response?.data));
    dispatch(setLoading(false));
  },
  getCategory: (id: number) => async (dispatch: any) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    dispatch(setCategory(response?.data));
    dispatch(setLoading(false));
  },
  clearCategory: () => (dispatch: any) => {
    dispatch(setCategory({} as any));
  },
  clearCategories: () => (dispatch: any) => {
    dispatch(setCategories([]));
  },
  removeCategory: (id: number) => async (dispatch: any) => {
    await axiosInstance.delete(`/categories/${id}`);
    dispatch(categoriesThunks.getCategories());
  },
};

export const { setCategories, setCategory, setLoading } = categoriesPageSlice.actions;
export default categoriesPageSlice.reducer;
