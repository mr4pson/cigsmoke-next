import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
//CHANGE IT
import { PayloadImage } from 'common/interfaces/payload-image.interface';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TImageState } from 'redux/types';
import { Image, ImageService } from 'swagger/services';

export const fetchImage = createAsyncThunk<
  Image,
  string,
  { rejectValue: string }
>(
  'images/fetchImage',
  async function (fileName, { rejectWithValue }): Promise<any> {
    try {
      return await ImageService.findImageByFileName({ fileName });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createImage = createAsyncThunk<
  Image,
  PayloadImage,
  { rejectValue: string }
>(
  'images/createImage',
  async function (payload: any, { rejectWithValue }): Promise<any> {
    try {
      return await ImageService.createImage({ body: {...payload} });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TImageState = {
  image: null,
  loading: false,
  saveLoading: false,
};

const imagesSlicer = createSlice({
  name: 'images',
  initialState,
  reducers: {
    clearImage(state) {
      state.image = null
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchImage
      .addCase(fetchImage.pending, handlePending)
      .addCase(
        fetchImage.fulfilled,
        (state, action) => {
          state.image = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchImage.rejected, handleError)
      //createImage
      .addCase(createImage.pending, handleChangePending)
      .addCase(
        createImage.fulfilled,
        (state) => {
          state.saveLoading = false;
          openSuccessNotification('Изображение успешно создано');
          console.log('fulfilled');
        },
      )
      .addCase(createImage.rejected, handleChangeError)
  },
});

export const { clearImage } = imagesSlicer.actions;

export default imagesSlicer.reducer;
