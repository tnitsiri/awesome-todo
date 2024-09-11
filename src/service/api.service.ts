import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        config.timeout = 300000;
        config.withCredentials = true;

        return config;
    },
);

export { axios };
