import axios from "axios";
export const API_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  function (config: any) {
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
