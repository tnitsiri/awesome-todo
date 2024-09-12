/**
 * ANCHOR Table Head Model
 * @date 9/12/2024 - 8:51:19 PM
 *
 * @export
 * @interface TableHeadModel
 * @typedef {TableHeadModel}
 */
export interface TableHeadModel {
    key: string;
    name: string;
}

/**
 * ANCHOR Table Row Model
 * @date 9/12/2024 - 8:40:47 PM
 *
 * @export
 * @interface TableRowModel
 * @typedef {TableRowModel}
 */
export interface TableRowModel {
    id: string;
    no: number;
    title: string;
    desc: string;
    date: string;
}
