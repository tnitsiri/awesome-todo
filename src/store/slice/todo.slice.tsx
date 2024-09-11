import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * ANCHOR Todo State
 * @date 9/12/2024 - 4:44:50 AM
 *
 * @export
 * @interface TodoState
 * @typedef {TodoState}
 */
export interface TodoState {
    fetchListToken: string | null;
}

/**
 * ANCHOR Initial State
 * @date 9/12/2024 - 4:44:15 AM
 *
 * @type {TodoState}
 */
const initialState: TodoState = {
    fetchListToken: null,
};

/**
 * ANCHOR Todo Slice
 * @date 9/12/2024 - 4:43:53 AM
 *
 * @type {*}
 */
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo: (state, action: PayloadAction<Partial<TodoState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setTodo } = todoSlice.actions;
