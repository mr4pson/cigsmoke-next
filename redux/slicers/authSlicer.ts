import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HttpStatus } from 'common/enums/httpStatus.enum';
import { Role } from 'common/enums/roles.enum';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';
import { TAuthState } from 'redux/types';
import { AuthService, User, UserService } from 'swagger/services';
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

      // if (response.user.role !== Role.User || response.user.role !== Role.SuperUser) {
      //   return rejectWithValue(getErrorMassage(HttpStatus.FORBIDDEN));
      // }

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

export const authorizeUser = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  string,
  { rejectValue: string }
>(
  'auth/authorizeUser',
  async function (token, { rejectWithValue }): Promise<any> {
    try {
      const repsonse = await AuthService.confirmEmailByToken({
        token,
      });

      return repsonse;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const resetPswByToken = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  {
    token: string;
    userPassword: string;
  },
  { rejectValue: string }
>(
  'auth/resetPswByToken',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const repsonse = await AuthService.updatePwd({
        body: payload,
      });

      return repsonse;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const fetchUserById = createAsyncThunk<
  { user: User },
  {
    userId: string;
  },
  { rejectValue: string }
>(
  'auth/fetchUserById',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await UserService.findUserById({
        userId: payload.userId,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

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
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification(
          'Письмо с подтверждение аккаунта отправлено вам на почту',
        );
        openSuccessNotification('Вы успешно авторизованы!');
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
      )
      //authorize user
      .addCase(authorizeUser.pending, handlePending)
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Вы успешно авторизованы!');
        state.serverErr = undefined;
        console.log('fulfilled');
      })
      .addCase(
        authorizeUser.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          state.loading = false;
          state.serverErr = action.payload;
          console.log('rejected');
        },
      )
      //reset password by token
      .addCase(resetPswByToken.pending, handlePending)
      .addCase(resetPswByToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Ваш пароль был сброшен!');
        state.serverErr = undefined;
        console.log('fulfilled');
      })
      .addCase(
        resetPswByToken.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          state.loading = false;
          state.serverErr = action.payload;
          console.log('rejected');
        },
      )
      //check for token session
      .addCase(fetchUserById.pending, handlePending)
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.serverErr = undefined;
        console.log('fulfilled');
      })
      .addCase(
        fetchUserById.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          openErrorNotification(getErrorMassage(action.payload));
          state.serverErr = action.payload;
          state.user = null;
          state.loading = false;
          console.log('rejected');
        },
      );
  },
});

export const { signout, setUser, clearServerErr } = authSlicer.actions;

export default authSlicer.reducer;
