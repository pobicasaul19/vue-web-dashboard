import { type InternalAxiosRequestConfig, type AxiosRequestHeaders, } from 'axios'
import { useAuthStore } from "@/stores/useAuthStore";

const authStore = useAuthStore();
const axiosConfig = {
  baseURL: `http://localhost:5000/api/`,
};

// Token injector function to dynamically get the token
const tokenInjector = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = authStore.token;
  config.headers = config.headers || {} as AxiosRequestHeaders;
  if (token) {
    (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export { axiosConfig, tokenInjector };
