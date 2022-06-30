import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import { axiosInstance } from "common/axios.instance";
import { Category, categoryState } from 'common/interfaces/types';
import { 
    getErrorMassage, 
    handleChangePending, 
    handlePending,
    handleError, 
    handleChangeError
    } 
    from "../../common/helpers"
import { PayloadCategory } from 'common/interfaces/payload-category.interface';

export const fetchCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
    'categoriesList/fetchCategories',
    async function (_, { rejectWithValue }): Promise<any> {
        try {
            const resp = await axiosInstance.get('/api/categories');
            return resp.data
        } catch (error: any) {
            rejectWithValue(getErrorMassage(error.status)) 
        }
    }
)
//проверить правильность исполнения функции после исправления ошибки с созданием категории!
export const createNewCategory = createAsyncThunk<Category[], PayloadCategory, { rejectValue: string }>(
    'categoriesList/createNewCategory',
    async function (payload: PayloadCategory, { rejectWithValue }): Promise<any> {
        const respError = "Возникла проблема при создании новой категории. Пожалуйста, проверьте соединение, корректность введенных данных и повторите попытку."
        try {
            const resp = await axiosInstance.post('/api/categories/', 
                {
                    "name": payload.name,
                    "url": payload.url,
                    "parentId": payload.parent
                }
            );
            console.log(resp)
            return resp.data
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(getErrorMassage(error.response.status))
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
            return resp.data
        } catch (error: any) {
            return rejectWithValue(getErrorMassage(error.status))
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

const initialState: categoryState = {
    categoriesList: [],
    loading: false,
    saveLoading: false,
};

const categoriesSlicer = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearCategories(state: categoryState) {
            state.categoriesList = []
        },
    },
    extraReducers: (builder) => {
        builder
        //fetchCategories
            .addCase(fetchCategories.pending, handlePending)
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categoriesList = action.payload;
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(fetchCategories.rejected, handleError)
        //createNewCategory ПРОВЕРИТЬ НА ПРАВИЛЬНОСТЬ ИСПОЛНЕНИЯ ПОСЛЕ ИСПРАВЛЕНИЯ ОШИБКИ С СОЗДАНИЕМ КАТЕГОРИИ!
            .addCase(createNewCategory.pending, handleChangePending)
            .addCase(createNewCategory.fulfilled, (state, action: PayloadAction<any, any, any>) => {
                // state.categoriesList.push(action.payload);
                state.saveLoading = false;
                console.log('fulfilled')
            })
            .addCase(createNewCategory.rejected, handleChangeError)
        //editCategory ПРОВЕРИТЬ НА ПРАВИЛЬНОСТЬ ИСПОЛНЕНИЯ ПОСЛЕ ИСПРАВЛЕНИЯ ОШИБКИ С СОЗДАНИЕМ КАТЕГОРИИ!
            .addCase(editCategory.pending, handlePending)
            .addCase(editCategory.fulfilled, (state, action: { payload: any}) => {
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
            .addCase(deleteCategory.fulfilled, (state, action: { payload: any}) => {
                state.categoriesList = state.categoriesList.filter(item => item.id !== action.payload);
                state.loading = false;
                console.log('fulfilled')
            })
            .addCase(deleteCategory.rejected, handleError)
    }
})


export const { clearCategories } = categoriesSlicer.actions;

export default categoriesSlicer.reducer;