'use client';

import CogoToast from '@successtar/cogo-toast';
import TodoCard from './card';
import {
    List as MtList,
    Card,
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel,
} from '@material-tailwind/react';
import { createElement, useEffect, useState } from 'react';
import { axios } from '@/service/api.service';
import { TodoModel } from '@/model/todo.model';
import { useAppSelector } from '@/store/hook';
import {
    Square3Stack3DIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/solid';

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

    const data = [
        {
            label: 'Dashboard',
            value: 'dashboard',
            icon: Square3Stack3DIcon,
            desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
        },
        {
            label: 'Profile',
            value: 'profile',
            icon: UserCircleIcon,
            desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: 'Settings',
            value: 'settings',
            icon: Cog6ToothIcon,
            desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
    ];

    return (
        <>
            <Tabs value="dashboard">
                <TabsHeader>
                    {data.map(({ label, value, icon }) => (
                        <Tab key={value} value={value}>
                            <div className="flex items-center gap-2">
                                {createElement(icon, {
                                    className: 'w-5 h-5',
                                })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
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
