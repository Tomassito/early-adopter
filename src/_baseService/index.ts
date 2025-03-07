import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.petfinder.com/v2/',
  timeout: 1000 * 30,
});

export const setToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axiosInstance;
