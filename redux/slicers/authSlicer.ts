import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HttpStatus } from 'common/enums/httpStatus.enum';
import { Role } from 'common/enums/roles.enum';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TAuthState } from 'redux/types';
import { AuthService, User } from 'swagger/services';
import {
  getErrorMassage,
  handlePending,
  handleError,
} from '../../common/helpers';

export const signin = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/signin', async function (payload, { rejectWithValue }): Promise<any> {
  try {
    const resp = await AuthService.signin({
      body: payload,
    });

    if (resp.user.role !== Role.Admin) {
      return rejectWithValue(getErrorMassage(HttpStatus.FORBIDDEN));
    }

    return resp;
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

export const userSignin = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/userSignin',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await AuthService.signin({
        body: payload,
      });

      if (response.user.role !== Role.User) {
        return rejectWithValue(getErrorMassage(HttpStatus.FORBIDDEN));
      }

      return response;
    } catch (error: any) {
      // return rejectWithValue(getErrorMassage(error.response.status));
      return rejectWithValue(error.response.status);
    }
  },
);

export const signup = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  },
  { rejectValue: string }
>('auth/signup', async function (payload, { rejectWithValue }): Promise<any> {
  try {
    const repsonse = await AuthService.signup({
      body: payload,
    });

    return repsonse;
  } catch (error: any) {
    // return rejectWithValue(getErrorMassage(error.response.status));
    return rejectWithValue(error.response.status);
  }
});

const initialState: TAuthState = {
  user: null,
  loading: false,
  serverErr: undefined,
};

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout(state: TAuthState) {
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setUser(state: TAuthState, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    clearServerErr(state: TAuthState) {
      state.serverErr = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(signin.pending, handlePending)
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Вы успешно авторизованы!');
        console.log('fulfilled');
      })
      .addCase(signin.rejected, handleError)
      //userSignin
      .addCase(userSignin.pending, handlePending)
      .addCase(userSignin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Вы успешно авторизованы!');
        state.serverErr = undefined;
        console.log('fulfilled');
      })
      .addCase(
        userSignin.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          state.loading = false;
          state.serverErr = action.payload;
          console.log('rejected');
        },
      )
      //signup
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        openSuccessNotification(
          'Письмо с подтверждение аккаунта отправлено вам на почту',
        );
        state.serverErr = undefined;
        console.log('fulfilled');
      })
      .addCase(
        signup.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          state.loading = false;
          state.serverErr = action.payload;
          console.log('rejected');
        },
      );
  },
});

export const { signout, setUser, clearServerErr } = authSlicer.actions;

export default authSlicer.reducer;
