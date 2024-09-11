import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        config.baseURL = process.env.NEXT_PUBLIC_API_URL;
        config.timeout = 300000;
        config.withCredentials = true;

        return config;
    },
);

export { axios };
