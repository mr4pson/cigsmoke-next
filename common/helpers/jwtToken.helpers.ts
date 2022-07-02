import * as jwt from 'jsonwebtoken';
import { User } from 'swagger/services';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
}

export const getUserInfo = (): User | null => {
  const accessToken = localStorage.getItem("accessToken");

  return jwt.decode<User>(accessToken ?? "", "12345");
}