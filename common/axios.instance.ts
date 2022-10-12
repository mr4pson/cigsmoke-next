import axios from 'axios';
import { AuthService } from 'swagger/services';
import { serviceOptions } from 'swagger/services/serviceOptions';
import {
  getAccessToken,
  getRefreshToken,
  getUserInfo,
} from './helpers/jwtToken.helpers';

const defaultOptions = {
  baseURL: '/api',
};

// Create instance
export const axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(async function (config) {
  if (typeof window !== 'undefined') {
    let token = getAccessToken();
    const refreshToken = getRefreshToken();

    if (token === null || refreshToken === null) {
      return config;
    }
    const userInfo = getUserInfo();
    const creationDate = new Date(userInfo?.iat! * 1000);
    const expirationDate = new Date(
      creationDate.setTime(creationDate.getTime() + 2 * 60 * 60 * 1000),
    ); // plus 2 hours
    const now = new Date();
    let response: any;
    // check for refresh token session
    try {
      response = await axios.post(`/api/auth/token`, {
        token: refreshToken,
      });
    } catch (error: any) {
      if (error.response.status === 403) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return config;
      }
    }

    // check for access token session if ended prolong it
    if (now > expirationDate) {
      console.log('TOKEN EXPIRED! Refreshing', now, expirationDate);
      localStorage.setItem('accessToken', response.data.accessToken);
      token = response.data.accessToken;
    }

    config.headers!.Authorization = token ? `Bearer ${token}` : '';
  }

  if (config.data === null) {
    config.data = {};
  }

  return config;
});

serviceOptions.axios = axiosInstance;
