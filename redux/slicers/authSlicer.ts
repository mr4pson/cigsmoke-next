import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from 'common/axios.instance';
import { HttpStatus } from 'common/enums/httpStatus.enum';
import { Role } from 'common/enums/roles.enum';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TAuthState } from 'redux/types';
import { User } from 'swagger/services';
import {
  getErrorMassage,
  handlePending,
  handleError,
} from '../../common/helpers';

export const signin = createAsyncThunk<
  { user: User, accessToken: string, refreshToken: string },
  { email: string, password: string },
  { rejectValue: string }
>(
  'auth/signin',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const resp = await axiosInstance.post('/auth/signin', payload);

      if (resp.data.user.role !== Role.Admin) {
        return rejectWithValue(getErrorMassage(HttpStatus.FORBIDDEN));
      }

      return resp.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TAuthState = {
  user: null,
  loading: false,
};

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout(state: TAuthState) {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setUser(state: TAuthState, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(signin.pending, handlePending)
      .addCase(
        signin.fulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.loading = false;
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          openSuccessNotification('Вы успешно авторизованы!');
          console.log('fulfilled');
        },
      )
      .addCase(signin.rejected, handleError)
  },
});

export const { signout, setUser } = authSlicer.actions;

export default authSlicer.reducer;
