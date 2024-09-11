import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { AUTH_ACCESS_TOKEN_NAME_CONSTANT } from '@/constant/auth.constant';

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        config.timeout = 300000;
        config.withCredentials = true;

        config.headers.Authorization = `Bearer ${sessionStorage.getItem(AUTH_ACCESS_TOKEN_NAME_CONSTANT)}`;

        return config;
    },
);

export { axios };
