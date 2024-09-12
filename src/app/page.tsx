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
            <div className="mx-auto max-w-screen-xl w-full pt-8">
                <TodoList />
            </div>
        </main>
    );
};

export default Page;
