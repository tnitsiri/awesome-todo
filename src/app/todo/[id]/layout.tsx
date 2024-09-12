import TodoList from '../list';
import { LayoutProps } from '@/type/common.type';

/**
 * ANCHOR Layout
 * @date 9/12/2024 - 3:43:02 PM
 *
 * @async
 * @param {LayoutProps} { children }
 * @returns {unknown}
 */
const Layout = async ({ children }: LayoutProps) => {
    return (
        <main className="w-full max-w-full flex min-h-screen flex-col pt-10 pb-28 px-8">
            <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:space-x-8 mx-auto max-w-screen-xl w-full pt-10">
                <div className="w-full lg:w-2/6">
                    <TodoList isSidebar={true} />
                </div>
                {children}
            </div>
        </main>
    );
};

export default Layout;
