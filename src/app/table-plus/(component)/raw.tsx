'use client';

import JSONPretty from 'react-json-pretty';

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
 * ANCHOR Raw
 * @date 9/12/2024 - 8:05:49 PM
 *
 * @param {Props} { data }
 * @returns {*}
 */
const Raw = ({ data }: Props) => {
    return (
        <div className="w-full overflow-x-auto">
            <h2 className="font-bold leading-snug tracking-normal text-slate-800 mx-auto my-6 w-full text-2xl lg:text-4xl">
                Raw Data
            </h2>
            <div className="rounded-xl overflow-hidden">
                <JSONPretty data={data} mainStyle="padding: 2em;" />
            </div>
        </div>
    );
};

export default Raw;
