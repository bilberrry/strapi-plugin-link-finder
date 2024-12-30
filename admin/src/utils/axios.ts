import axios, { AxiosInstance } from 'axios';

// eslint-disable-next-line no-restricted-imports
import pluginId from '../pluginId';

const instance: AxiosInstance = axios.create({
  baseURL: `/${pluginId}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
