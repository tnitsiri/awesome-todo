'use client';

import TodoList from '../../todo/(component)/list';
import Welcome from './welcome';
import { useAppSelector } from '@/store/hook';

/**
 * ANCHOR Content
 * @date 9/12/2024 - 5:01:43 PM
 *
 * @returns {*}
 */
const Content = () => {
    const { isAuthorized } = useAppSelector((state) => state.auth);

    return (
        <div className="mx-auto max-w-screen-xl w-full pt-8">
            {isAuthorized ? <TodoList /> : <Welcome />}
        </div>
    );
};

export default Content;
