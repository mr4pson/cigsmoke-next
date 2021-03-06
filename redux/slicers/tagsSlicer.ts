import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { PayloadTag } from 'common/interfaces/payload-tags.interface';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TTagState } from 'redux/types';
import { Tag, TagService } from 'swagger/services';

export const fetchTags = createAsyncThunk<
  Tag[],
  undefined,
  { rejectValue: string }
>(
  'tags/fetchTags',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await TagService.getTags();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchTag = createAsyncThunk<
  Tag,
  string,
  { rejectValue: string }
>(
  'tags/fetchTag',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await TagService.findTagById({ tagId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createTag = createAsyncThunk<
  Tag,
  PayloadTag,
  { rejectValue: string }
>(
  'tags/createTag',
  async function (payload: PayloadTag, { rejectWithValue }): Promise<any> {
    try {
      return await TagService.createTag({
        body: {
          name: payload.name,
          url: payload.url,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editTag = createAsyncThunk<
  Tag,
  PayloadTag,
  { rejectValue: string }
>(
  'tags/editTags',
  async function (payload: PayloadTag, { rejectWithValue }): Promise<any> {
    try {
      return await TagService.updateTag({
        tagId: payload.id as string, body: {
          name: payload.name,
          url: payload.url,
        }
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteTag = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'tags/deleteTag',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await TagService.deleteTag({ tagId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TTagState = {
  tags: [],
  tag: null,
  loading: false,
  saveLoading: false,
};

const tagsSlicer = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    clearTags(state) {
      state.tags = [];
    },
    clearTag(state) {
      state.tag = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchTags
      .addCase(fetchTags.pending, handlePending)
      .addCase(
        fetchTags.fulfilled,
        (state, action) => {
          state.tags = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchTags.rejected, handleError)
      //fetchTag
      .addCase(fetchTag.pending, handlePending)
      .addCase(
        fetchTag.fulfilled,
        (state, action) => {
          state.tag = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchTag.rejected, handleError)
      //createTag
      .addCase(createTag.pending, handleChangePending)
      .addCase(
        createTag.fulfilled,
        (state) => {
          state.saveLoading = false;
          openSuccessNotification('?????? ?????????????? ????????????');
          console.log('fulfilled');
        },
      )
      .addCase(createTag.rejected, handleChangeError)
      //editTag
      .addCase(editTag.pending, handleChangePending)
      .addCase(editTag.fulfilled, (state, action) => {
        let tag = state.tags.find(
          (tag) => tag.id === action.payload.id,
        );
        tag = {
          ...tag,
          ...action.payload,
        };
        openSuccessNotification('?????? ?????????????? ????????????????');
        state.saveLoading = false;
        console.log('fulfilled');
      })
      .addCase(editTag.rejected, handleChangeError)
      //deleteTag
      .addCase(deleteTag.pending, handleChangePending)
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('?????? ?????????????? ????????????');
        console.log('fulfilled');
      })
      .addCase(deleteTag.rejected, handleChangeError);
  },
});

export const { clearTag, clearTags } = tagsSlicer.actions;

export default tagsSlicer.reducer;
