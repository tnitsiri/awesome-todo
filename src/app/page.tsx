import Navbar from './common/navbar';
import TodoList from './todo/list';

/**
 * ANCHOR Page
 * @date 9/10/2024 - 11:08:55 PM
 *
 * @returns {*}
 */
const Page = () => {
    return (
        <main className="w-full max-w-full flex min-h-screen flex-col pt-10 pb-28 px-8">
            <Navbar />
            <div className="mx-auto max-w-screen-xl w-full pt-10">
                <div className="flex flex-col items-start">
                    <TodoList />
                </div>
            </div>
        </main>
    );
};

export default Page;
