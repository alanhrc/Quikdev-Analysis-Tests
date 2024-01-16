import axios from 'axios';
import Cookies from 'js-cookie';

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

baseApi.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("token");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseApi;
