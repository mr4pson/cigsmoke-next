import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import { axiosInstance } from "common/axios.instance";
import { Category, categoryState } from 'common/interfaces/types';

interface PayloadCategory {
    name: string,
    url: string,
    parent?: string,
    id?: string
}

export const fetchCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
    'categoriesList/fetchCategories',
    async function (_, { rejectWithValue }): Promise<any> {
        try {
            const resp = await axiosInstance.get('/api/categories');
            return resp.data
        } catch (error) {
            return rejectWithValue("Возникла проблема при загрузке данных с сервера. Пожалуйста, проверьте соединение и повторите попытку.")
        }
    }
)
//проверить правильность исполнения функции после исправления ошибки с созданием категории!
export const createNewCategory = createAsyncThunk<Category[], PayloadCategory, { rejectValue: string }>(
    'categoriesList/createNewCategory',
    async function (payload: PayloadCategory, { rejectWithValue }): Promise<any> {
        const respError = "Возникла проблема при создании новой категории. Пожалуйста, проверьте соединение, корректность введенных данных и повторите попытку."
        try {
            const resp = await axiosInstance.post('/api/categories', 
                {
                    "name": payload.name,
                    "url": payload.url,
                    "parentId": payload.parent
                }
            );
            if(resp.statusText !== "OK") {
                return rejectWithValue(respError)
            }
            return resp.data
        } catch (error) {
            return rejectWithValue(respError)
        }
    }
)
//проверить правильность исполнения функции после исправления ошибки с созданием категории!
export const editCategory = createAsyncThunk<Category[], PayloadCategory, { rejectValue: string }>(
    'categoriesList/editCategory',
    async function (payload: PayloadCategory, { rejectWithValue }): Promise<any> {
        const respError = "Возникла проблема при редактировании категории. Пожалуйста, проверьте соединение, корректность введенных данных и повторите попытку."
        try {
            const resp = await axiosInstance.put(`/api/categories/${payload.id}`, 
                {
                    "name": payload.name,
                    "url": payload.url,
                }
            );
            if(resp.statusText !== "OK") {
                return rejectWithValue(respError)
            }
            return resp.data
        } catch (error) {
            return rejectWithValue(respError)
        }
    }
)

export const deleteCategory = createAsyncThunk<Category[], string, { rejectValue: string }>(
    'categoriesList/deleteCategory',
    async function (id, { rejectWithValue }): Promise<any> {
        const respError = "Возникла проблема при удалении категории. Пожалуйста, проверьте соединение и повторите попытку."
        try {
            const resp = await axiosInstance.delete(`/api/categories/${id}`);
            console.log(resp)
            if(resp.statusText !== "OK") {
                return rejectWithValue(respError)
            }
            return id
        } catch (error) {
            return rejectWithValue(respError)
        }
    }
)

const handlePending = (state) => {
    state.loading = true;
    state.error = null;
    console.log('pending')
}

const handleError = (state, action: any) => {
    state.loading = false;
    state.error = action.payload;
    console.log('rejected')
}

const initialState: categoryState = {
    categoriesList: [{
        id: '1',
        name: 'test',
        url: 'test'
    }],
    loading: false,
    error: null
};

const categoriesSlicer = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        // setCategories(state: categoryState, action: PayloadAction<Category[]>) {
        //     state.categoriesList = action.payload
        // },
        clearCategories(state: categoryState, action: PayloadAction) {
            state.categoriesList = []
        },
        disableError(state: categoryState, action: PayloadAction) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        //fetchCategories
            .addCase(fetchCategories.pending, handlePending)
            .addCase(fetchCategories.fulfilled, (state, action: any) => {
                state.categoriesList = action.payload;
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(fetchCategories.rejected, handleError)
        //createNewCategory ПРОВЕРИТЬ НА ПРАВИЛЬНОСТЬ ИСПОЛНЕНИЯ ПОСЛЕ ИСПРАВЛЕНИЯ ОШИБКИ С СОЗДАНИЕМ КАТЕГОРИИ!
            .addCase(createNewCategory.pending, handlePending)
            .addCase(createNewCategory.fulfilled, (state, action: any) => {
                state.categoriesList.push(action.payload);
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(createNewCategory.rejected, handleError)
        //editCategory ПРОВЕРИТЬ НА ПРАВИЛЬНОСТЬ ИСПОЛНЕНИЯ ПОСЛЕ ИСПРАВЛЕНИЯ ОШИБКИ С СОЗДАНИЕМ КАТЕГОРИИ!
            .addCase(editCategory.pending, handlePending)
            .addCase(editCategory.fulfilled, (state, action: any) => {
                let category = state.categoriesList.find(category => category.id === action.payload.id);
                category = {
                    ...category,
                    ...action.payload
                }
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(editCategory.rejected, handleError)
        //deleteCategory
            .addCase(deleteCategory.pending, handlePending)
            .addCase(deleteCategory.fulfilled, (state, action: any) => {
                state.categoriesList = state.categoriesList.filter(item => item.id !== action.payload);
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(deleteCategory.rejected, handleError)
    }
})


export const { clearCategories, disableError } = categoriesSlicer.actions;

export default categoriesSlicer.reducer;