import { User } from "common/interfaces/user.interface";
import * as jwt from 'jsonwebtoken';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
}

export const getUserInfo = (): User | null => {
  const accessToken = localStorage.getItem("accessToken");

  return jwt.decode<User>(accessToken ?? "", "12345");
}