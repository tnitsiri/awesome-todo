import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slice/auth.slice';
import { todoSlice } from './slice/todo.slice';

/**
 * ANCHOR Make Store
 * @date 9/11/2024 - 1:35:20 AM
 *
 * @returns {*}
 */
export const makeStore = () => {
    return configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [todoSlice.name]: todoSlice.reducer,
        },
    });
};

/**
 * ANCHOR App Store
 * @date 9/11/2024 - 1:35:25 AM
 *
 * @export
 * @typedef {AppStore}
 */
export type AppStore = ReturnType<typeof makeStore>;

/**
 * ANCHOR Root State
 * @date 9/11/2024 - 1:35:34 AM
 *
 * @export
 * @typedef {RootState}
 */
export type RootState = ReturnType<AppStore['getState']>;

/**
 * ANCHOR App Dispatch
 * @date 9/11/2024 - 1:35:41 AM
 *
 * @export
 * @typedef {AppDispatch}
 */
export type AppDispatch = AppStore['dispatch'];
