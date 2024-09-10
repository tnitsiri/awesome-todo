declare global {
    export namespace NodeJS {
        export interface ProcessEnv {
            NODE_ENV: 'test' | 'development' | 'production';
            ENV_NAME: 'localhost' | 'development' | 'production';
            NEXT_PUBLIC_ENV_NAME: 'localhost' | 'development' | 'production';

            NEXT_PUBLIC_BRAND: string;

            NEXT_PUBLIC_API_URL: string;
        }
    }
}

export default global;