/**
 * ANCHOR Todo Model
 * @date 9/12/2024 - 1:31:18 AM
 *
 * @export
 * @interface TodoModel
 * @typedef {TodoModel}
 */
export interface TodoModel {
    id: string;
    title: string;
    description: string;
    due_date: string;
    is_done: boolean;
    created_at: string;
    updated_at: string;
}
