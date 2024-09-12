'use client';

import JSONPretty from 'react-json-pretty';
import { useEffect, useState } from 'react';
import { TableRowModel } from '@/model/table.model';

/**
 * ANCHOR Props
 * @date 9/12/2024 - 7:53:42 PM
 *
 * @typedef {Props}
 */
type Props = {
    data: any;
};

/**
 * ANCHOR Friendly
 * @date 9/12/2024 - 8:12:41 PM
 *
 * @param {Props} { data }
 * @returns {*}
 */
const Friendly = ({ data }: Props) => {
    const [rows, setRows] = useState<TableRowModel[]>([]);

    /**
     * ANCHOR Init
     * @date 9/12/2024 - 8:13:41 PM
     */
    const _init = () => {
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
        <div className="w-full overflow-x-auto">
            <h2 className="font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl lg:text-4xl">
                Friendly Data
            </h2>
            <div className="rounded-xl overflow-hidden">
                <JSONPretty data={rows} mainStyle="padding: 2em;" />
            </div>
        </div>
    );
};

export default Friendly;
