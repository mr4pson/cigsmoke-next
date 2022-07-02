import axios from "axios";
import { getAccessToken } from "./helpers/jwtToken.helpers";

const defaultOptions = {
  baseURL: "/"
};

// Create instance
export const axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(async function (config) {
  if (typeof window !== "undefined") {
    const token = await getAccessToken();
    console.log(token, 'TOKEN');
    config.headers!.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
});
