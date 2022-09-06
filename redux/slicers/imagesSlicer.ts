import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from 'common/axios.instance';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { PayloadCreateImage, TImageState } from 'redux/types';

import {
  getErrorMassage,
  handleError,
  handlePending,
} from '../../common/helpers';

export const createImage = createAsyncThunk<
  string,
  PayloadCreateImage,
  { rejectValue: string }
>(
  'images/createImage',
  async function (
    payload: PayloadCreateImage,
    { rejectWithValue },
  ): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('files', payload.file as any);
      const resp = await axiosInstance.post(
        '/images',
        formData,
        payload.config,
      );
      return resp.data[0];
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TImageState = {
  imageList: [],
  loading: false,
};

const imageSlicer = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setDefaultImageList(state, action) {
      if (action.payload.slideNum) {
        state.imageList = [...state.imageList, { name: action.payload.file.name as string, uid: action.payload.slideNum as number }];
      } else {
        state.imageList = [...state.imageList, action.payload];
      }
    },
    removeImageFromList(state, action) {
      state.imageList = state.imageList.filter(
        (item: any) => item.name !== action.payload,
      );
    },
    clearImageList(state) {
      state.imageList = initialState.imageList;
    },
  },
  extraReducers: (builder) => {
    builder
      //createImage
      .addCase(createImage.pending, handlePending)
      .addCase(createImage.fulfilled, (state, action) => {
        state.loading = false;
        const file = state.imageList.find(
          (item: any) => item.name === action.meta.arg.file.name,
        ) as any;
        if (file) {
          file.url = `/api/images/${action.payload}`;
          file.name = action.payload
        } else {
          state.imageList.push(action.payload as any);
        }
        openSuccessNotification('Изображение успешно загружено');
        console.log('fulfilled');
      })
      .addCase(createImage.rejected, handleError);
  },
});

export const { setDefaultImageList, removeImageFromList, clearImageList } =
  imageSlicer.actions;

export default imageSlicer.reducer;
