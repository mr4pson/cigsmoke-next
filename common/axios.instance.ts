import axios from "axios";

const defaultOptions = {
  baseURL: "/",
};

// Create instance
export const axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(async function (config) {
  // const token = await getJwtPair();
  // config.headers!.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
