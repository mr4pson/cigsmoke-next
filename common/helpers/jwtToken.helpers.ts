import * as jwt from 'jsonwebtoken';
import { User } from 'swagger/services';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getUserInfo = (): (User & { iat: number }) | null => {
  const { NEXT_PUBLIC_ACCESS_SECRET_TOKEN } = process.env;
  const accessToken = localStorage.getItem('accessToken');

  return jwt.decode<User>(accessToken ?? '', NEXT_PUBLIC_ACCESS_SECRET_TOKEN ?? '');
};
