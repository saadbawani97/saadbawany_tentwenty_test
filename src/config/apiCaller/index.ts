import axios from 'axios';
import { Constants } from '..';

export const CLIENT_AXIOS = axios.create({
  baseURL: Constants.BASE_URL,
});

CLIENT_AXIOS.interceptors.response.use(
  response => {
    console.log('response from interceptor', response);
    return Promise.resolve(response?.data);
  },

  error => {
    console.log('error from interceptor', error);

    if (!error.response && error.code === 'ERR_NETWORK') {
      return Promise.reject('This might be a network connectivity issue.');
    }

    return Promise.reject(error?.response?.data);
  },
);
