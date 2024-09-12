'use client';

import { TableHeadModel, TableRowModel } from '@/model/table.model';
import { useEffect, useState } from 'react';

/**
 * ANCHOR Props
 * @date 9/12/2024 - 8:43:20 PM
 *
 * @typedef {Props}
 */
type Props = {
    data: any;
};

/**
 * ANCHOR Table
 * @date 9/12/2024 - 8:44:10 PM
 *
 * @param {Props} { data }
 * @returns {*}
 */
const Table = ({ data }: Props) => {
    const [heads, setHeads] = useState<TableHeadModel[]>([]);
    const [rows, setRows] = useState<TableRowModel[]>([]);

    /**
     * ANCHOR Init
     * @date 9/12/2024 - 8:13:41 PM
     */
    const _init = () => {
        // rows
        const heads: TableHeadModel[] = [];

        data['columns'].map((column: any) => {
            if (column['name']) {
                const head: TableHeadModel = {
                    key: column['key'],
                    name: column['name'],
                };

                heads.push(head);
            }
        });

        setHeads(heads);

        // rows
        const rows: TableRowModel[] = [];

        data['data'].map((e: any) => {
            const payload: any = {};

            data['columns'].map((column: any, index: number) => {
                payload[column['key']] = e[index];
            });

            const row: TableRowModel = payload;

            rows.push(row);
        });

        setRows(rows);
    };

    useEffect(() => {
        _init();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 space-y-5 lg:space-y-0 mx-auto max-w-screen-xl w-full pt-10">
            <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            {heads.map((head) => {
                                return (
                                    <th
                                        key={head.key}
                                        className="p-4 border-b border-slate-600 bg-slate-700">
                                        <p className="text-sm font-semibold leading-none text-slate-300">
                                            {head.name}
                                        </p>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => {
                            return (
                                <tr key={row.id} className="hover:bg-slate-700">
                                    <td className="p-4 border-b border-slate-700 bg-slate-900">
                                        <p className="text-sm text-slate-100">
                                            {row.no}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-slate-700 bg-slate-800">
                                        <p className="text-sm text-slate-300">
                                            {row.title}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-slate-700 bg-slate-900">
                                        <p className="text-sm text-slate-300">
                                            {row.desc}
                                        </p>
                                    </td>
                                    <td className="p-4 border-b border-slate-700 bg-slate-800">
                                        <p className="text-sm text-slate-300">
                                            {row.date}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
