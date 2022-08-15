import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { FetchPayload, RequestResponse, TBannerState } from 'redux/types';
import { Advertisement, Slide, AdvertisementService, SlideService, SlideDTO } from 'swagger/services';
import { PayloadSlide } from 'common/interfaces/payload-slide.interface';

export const fetchAdvertisement = createAsyncThunk<
  RequestResponse,
  undefined,
  { rejectValue: string }
>(
  'banners/fetchAdvertisement',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await AdvertisementService.getAdvertisements();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateAdvertisement = createAsyncThunk<
  Advertisement,
  Advertisement,
  { rejectValue: string }
>(
  'banners/updateAdvertisement',
  async function (payload: Advertisement, { rejectWithValue }): Promise<any> {
    try {
      return await AdvertisementService.updateAdvertisement({
        advertisementId: payload.id!,
        body: {
          image: payload.image,
          description: payload.description,
          link: payload.link
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchSlides = createAsyncThunk<
  RequestResponse,
  undefined,
  { rejectValue: string }
>(
  'banners/fetchSlides',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await SlideService.getSlides();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateSlides = createAsyncThunk<
  Slide,
  PayloadSlide,
  { rejectValue: string }
>(
  'banners/updateSlides',
  async function (payload: PayloadSlide, { rejectWithValue }): Promise<any> {
    try {
      return await SlideService.updateSlides({
        body: payload.body,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TBannerState = {
  data: [],
  loading: false,
  saveLoading: false,
};

const bannersSlicer = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    clearBanners(state) {
      console.log('Banners cleared!')
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchAdvertisement
      .addCase(fetchAdvertisement.pending, handlePending)
      .addCase(fetchAdvertisement.fulfilled, (state, action) => {
        state.data = action.payload as unknown as Advertisement[];
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchAdvertisement.rejected, handleError)
      //updateAdvertisement
      .addCase(updateAdvertisement.pending, handlePending)
      .addCase(updateAdvertisement.fulfilled, (state, action) => {
        state.data = action.payload as unknown as Advertisement[];
        state.saveLoading = false;
        openSuccessNotification('Баннер успешно обновлен');
        console.log('fulfilled');
      })
      .addCase(updateAdvertisement.rejected, handleChangeError)
      //fetchSlides
      .addCase(fetchSlides.pending, handlePending)
      .addCase(fetchSlides.fulfilled, (state, action) => {
        state.data = action.payload as unknown as Slide[];
        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(fetchSlides.rejected, handleError)
      //updateSlides
      .addCase(updateSlides.pending, handlePending)
      .addCase(updateSlides.fulfilled, (state, action) => {
        state.data = action.payload as unknown as Slide[];
        state.saveLoading = false;
        openSuccessNotification('Баннер успешно обновлен');
        console.log('fulfilled');
      })
      .addCase(updateSlides.rejected, handleChangeError)
  },
});

export const { clearBanners } = bannersSlicer.actions;

export default bannersSlicer.reducer;