import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import { axiosInstance } from "common/axios.instance";

type Category = {
    id: string,
    categoryName: string,
    description: string 
}

type categoryState = {
    categotiesList: Category[],
    loading: boolean,
    error: string | null
}

export const fetchCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
    'categotiesList/getCategories',
    async function (_, { rejectWithValue }): Promise<any> {
        try {
            const resp = await axiosInstance.get('/data');

            console.log(resp.data);

            return resp.data
        } catch (error) {
            console.error(error);
        }
    }
)

const initialState: categoryState = {
    categotiesList: [],
    loading: false,
    error: null
};

const categoriesSlicer = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory(state: any, action: PayloadAction) {
            return
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
                state.categotiesList = action.payload;
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.error = null;
                console.log('rejected')
            })
    }
})


export const { addCategory } = categoriesSlicer.actions;

export default categoriesSlicer.reducer;