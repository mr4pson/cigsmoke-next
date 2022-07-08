import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TParameterState } from 'redux/types';
import { Parameter, ParameterService } from 'swagger/services';
import { PayloadParameter } from 'common/interfaces/payload-parameter.interface';

export const fetchParameters = createAsyncThunk<
  Parameter[],
  undefined,
  { rejectValue: string }
>(
  'parameters/fetchParameters',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await ParameterService.getParameters();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchChosenParameter = createAsyncThunk<
  Parameter,
  string,
  { rejectValue: string }
>(
  'parameters/fetchChosenParameter',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await ParameterService.findParameterById({ parameterId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createParameter = createAsyncThunk<
  Parameter,
  PayloadParameter,
  { rejectValue: string }
>(
  'parameters/createParameter',
  async function (payload: PayloadParameter, { rejectWithValue }): Promise<any> {
    try {
      return await ParameterService.createParameter({
        body: {
          name: payload.name,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editParameter = createAsyncThunk<
  Parameter,
  PayloadParameter,
  { rejectValue: string }
>(
  'parameters/editParameter',
  async function (payload: PayloadParameter, { rejectWithValue }): Promise<any> {
    try {
      return await ParameterService.updateParameter({
        parameterId: payload.id as string, body: {
          name: payload.name,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteParameter = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'parameters/deleteParameter',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await ParameterService.deleteParameter({ parameterId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TParameterState = {
  parameters: [],
  chosenParameter: null,
  loading: false,
  saveLoading: false,
};

const parametersSlicer = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    clearParameters(state) {
      state.parameters = [];
    },
    clearChosenParameter(state) {
      state.chosenParameter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchParameters
      .addCase(fetchParameters.pending, handlePending)
      .addCase(
        fetchParameters.fulfilled,
        (state, action) => {
          state.parameters = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchParameters.rejected, handleError)
        //fetchChosenParameter
      .addCase(fetchChosenParameter.pending, handlePending)
      .addCase(
        fetchChosenParameter.fulfilled,
        (state, action) => {
          state.chosenParameter = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchChosenParameter.rejected, handleError)
        //createParameter
      .addCase(createParameter.pending, handleChangePending)
      .addCase(
        createParameter.fulfilled,
        (state) => {
          state.saveLoading = false;
          openSuccessNotification('Параметр успешно создан');
          console.log('fulfilled');
        },
      )
      .addCase(createParameter.rejected, handleChangeError)
        //editParameter
      .addCase(editParameter.pending, handleChangePending)
      .addCase(editParameter.fulfilled, (state, action) => {
        let parameter = state.parameters.find(
          (parameter) => parameter.id === action.payload.id,
        );
        parameter = {
          ...parameter,
          ...action.payload,
        };
        openSuccessNotification('Параметр успешно обновлен');
        state.saveLoading = false;
        console.log('fulfilled');
      })
      .addCase(editParameter.rejected, handleChangeError)
        //deleteParameter
      .addCase(deleteParameter.pending, handleChangePending)
      .addCase(deleteParameter.fulfilled, (state, action) => {
        state.parameters = state.parameters.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Параметр успешно удален');
        console.log('fulfilled');
      })
      .addCase(deleteParameter.rejected, handleChangeError);
  },
});

export const { clearParameters, clearChosenParameter } = parametersSlicer.actions;

export default parametersSlicer.reducer;
