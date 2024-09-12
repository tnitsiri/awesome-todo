import Friendly from './(component)/friendly';
import Raw from './(component)/raw';
import Table from './(component)/table';
import data from './(data)/data.json';
import { titleUtil } from '@/util/common.util';
import { Metadata } from 'next';

/**
 * ANCHOR Generate Metadata
 * @date 9/12/2024 - 7:30:09 PM
 *
 * @export
 * @async
 * @returns {Promise<Metadata>}
 */
export async function generateMetadata(): Promise<Metadata> {
    // title
    const title: string = titleUtil('Table Plus');

    return {
        title,
    };
}

/**
 * ANCHOR Page
 * @date 9/12/2024 - 7:09:41 PM
 *
 * @returns {*}
 */
const Page = () => {
    return (
        <main className="w-full max-w-full flex min-h-screen flex-col pt-10 pb-28 px-8">
            <Table data={data} />
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 space-y-5 lg:space-y-0 mx-auto max-w-screen-xl w-full pt-5">
                <Raw data={data} />
                <Friendly data={data} />
            </div>
        </main>
    );
};

export default Page;
