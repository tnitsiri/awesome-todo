import StoreProvider from '@/store/provider';
import Root from './common/root';
import './globals.css';
import '@/asset/style/app.scss';
import 'react-datetime/css/react-datetime.css';
import type { Metadata } from 'next';
import { Poppins, Prompt } from 'next/font/google';
import { LayoutProps } from '@/type/common.type';

/**
 * ANCHOR Poppins
 * @date 9/10/2024 - 8:51:28 PM
 *
 * @type {*}
 */
const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
    preload: true,
});

/**
 * ANCHOR Prompt
 * @date 9/10/2024 - 8:51:33 PM
 *
 * @type {*}
 */
const prompt = Prompt({
    subsets: ['thai'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
    preload: true,
});

/**
 * ANCHOR Generate Metadata
 * @date 9/10/2024 - 8:52:41 PM
 *
 * @export
 * @async
 * @returns {Promise<Metadata>}
 */
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: process.env.NEXT_PUBLIC_BRAND,
    };
}

/**
 * ANCHOR Layout
 * @date 9/10/2024 - 8:52:11 PM
 *
 * @async
 * @param {LayoutProps} { children }
 * @returns {unknown}
 */
const Layout = async ({ children }: LayoutProps) => {
    // font family
    const fontFamily: string = [
        poppins.style.fontFamily,
        prompt.style.fontFamily,
    ].join(', ');

    return (
        <html
            lang="th"
            style={{
                fontFamily,
                fontStyle: poppins.style.fontStyle,
            }}>
            <body>
                <StoreProvider>
                    <Root>{children}</Root>
                </StoreProvider>
            </body>
        </html>
    );
};

export default Layout;
