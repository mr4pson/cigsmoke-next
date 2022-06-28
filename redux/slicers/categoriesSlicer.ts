import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import { axiosInstance } from "common/axios.instance";
import { Category, categoryState } from 'common/interfaces/types';

export const fetchCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
    'categoriesList/getCategories',
    async function (_, { rejectWithValue }): Promise<any> {
        try {
            const resp = await axiosInstance.get('/api/categories');

            console.log(resp.data);

            return resp.data
        } catch (error) {
            console.error(error);
        }
    }
)

const initialState: categoryState = {
    categoriesList: [],
    loading: false,
    error: null
};

const categoriesSlicer = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory(state: any, action: PayloadAction) {
            return
        },
        clearCategories(state: any, action: PayloadAction) {
            state.categoriesList = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('pending')
            })
            .addCase(fetchCategories.fulfilled, (state, action: any) => {
                state.categoriesList = action.payload;
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.error = null;
                console.log('rejected')
            })
    }
})


export const { addCategory, clearCategories } = categoriesSlicer.actions;

export default categoriesSlicer.reducer;