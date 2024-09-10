import { ReactNode } from 'react';

/**
 * ANCHOR Layout Props
 * @date 9/10/2024 - 8:53:48 PM
 *
 * @export
 * @typedef {LayoutProps}
 */
export type LayoutProps = {
    children: ReactNode;
};

/**
 * ANCHOR Page Params
 * @date 9/10/2024 - 8:53:42 PM
 *
 * @export
 * @typedef {PageParams}
 * @template P
 * @template SP
 */
export type PageParams<P = {}, SP = {}> = {
    params: P;
    searchParams?: { [key: string]: string } & SP;
};

/**
 * ANCHOR Page Props
 * @date 9/10/2024 - 8:53:36 PM
 *
 * @export
 * @typedef {PageProps}
 * @template P
 * @template SP
 */
export type PageProps<P = {}, SP = {}> = PageParams<P, SP>;
