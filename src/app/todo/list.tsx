'use client';

import CogoToast from '@successtar/cogo-toast';
import TodoCard from './card';
import { List as MtList, Card } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { axios } from '@/service/api.service';
import { TodoModel } from '@/model/todo.model';
import { useAppSelector } from '@/store/hook';

/**
 * ANCHOR List
 * @date 9/12/2024 - 1:04:49 AM
 *
 * @returns {*}
 */
const List = () => {
    const [todos, setTodos] = useState<TodoModel[]>([]);

    const { isAuthorized } = useAppSelector((state) => state.auth);
    const { fetchListToken } = useAppSelector((state) => state.todo);

    /**
     * ANCHOR Fetch
     * @date 9/12/2024 - 1:16:18 AM
     *
     * @async
     * @returns {*}
     */
    const _fetch = async () => {
        try {
            const { data } = await axios.get('/todo/api');

            setTodos(data.todos);
        } catch (_) {
            CogoToast.error('Unable to fetch task list.');
        }
    };

    useEffect(() => {
        _fetch();
    }, []);

    useEffect(() => {
        if (fetchListToken) {
            _fetch();
        }
    }, [fetchListToken]);

    return (
        <>
            {isAuthorized && (
                <Card className="w-96">
                    <MtList>
                        {todos.map((todo) => {
                            return (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    fetch={_fetch}
                                />
                            );
                        })}
                    </MtList>
                </Card>
            )}
        </>
    );
};

export default List;
