import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * ANCHOR Auth State
 * @date 9/11/2024 - 1:34:17 AM
 *
 * @export
 * @interface AuthState
 * @typedef {AuthState}
 */
export interface AuthState {
    isAuthorized: boolean;
    username: string | null;
    accessToken: string | null;
}

/**
 * ANCHOR Initial State
 * @date 9/11/2024 - 1:34:23 AM
 *
 * @type {AuthState}
 */
const initialState: AuthState = {
    isAuthorized: false,
    username: null,
    accessToken: null,
};

/**
 * ANCHOR Auth Slice
 * @date 9/11/2024 - 1:34:28 AM
 *
 * @type {*}
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setAuth } = authSlice.actions;
