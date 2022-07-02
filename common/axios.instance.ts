import axios from "axios";
import { serviceOptions } from "swagger/services/serviceOptions";
import { getAccessToken } from "./helpers/jwtToken.helpers";

const defaultOptions = {
  baseURL: "/api"
};

// Create instance
export const axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(async function (config) {
  if (typeof window !== "undefined") {
    const token = await getAccessToken();
    config.headers!.Authorization = token ? `Bearer ${token}` : "";
  }

  if (config.data === null) {
    config.data = {};
  }

  return config;
});

serviceOptions.axios = axiosInstance;