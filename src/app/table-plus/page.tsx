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
        <main className="w-full max-w-full flex min-h-screen flex-col pt-10 pb-28 px-8"></main>
    );
};

export default Page;
