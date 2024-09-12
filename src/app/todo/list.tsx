'use client';

import CogoToast from '@successtar/cogo-toast';
import TodoCard from './card';
import {
    List as MtList,
    Card,
    Typography,
    Menu,
    MenuHandler,
    Button,
    MenuList,
    MenuItem,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { axios } from '@/service/api.service';
import { TodoModel } from '@/model/todo.model';
import { useAppSelector } from '@/store/hook';
import { TodoFilterEnum } from '@/enum/todo.enum';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

/**
 * ANCHOR Props
 * @date 9/12/2024 - 3:29:52 PM
 *
 * @typedef {Props}
 */
type Props = {
    isSidebar?: boolean;
};

/**
 * ANCHOR List
 * @date 9/12/2024 - 3:30:09 PM
 *
 * @param {Props} { isSidebar }
 * @returns {*}
 */
const List = ({ isSidebar }: Props) => {
    const [items, setItems] = useState<TodoModel[]>([]);
    const [filter, setFilter] = useState<TodoFilterEnum>(TodoFilterEnum.All);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

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

            setItems(data.todos);
        } catch (_) {
            CogoToast.error('Unable to fetch task list.');
        }
    };

    /**
     * ANCHOR Filter text
     * @date 9/12/2024 - 2:52:03 PM
     *
     * @param {TodoFilterEnum} filter
     * @returns {string}
     */
    const _filterText = (filter: TodoFilterEnum): string => {
        switch (filter) {
            case TodoFilterEnum.All:
                return 'All Tasks';

            case TodoFilterEnum.Undone:
                return 'Undone';

            case TodoFilterEnum.Done:
                return 'Done';
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

    // todos
    let todos: TodoModel[] = items;

    if (filter != TodoFilterEnum.All) {
        todos = items.filter((e) => {
            if (filter == TodoFilterEnum.Undone) {
                return !e.is_done;
            } else if (filter == TodoFilterEnum.Done) {
                return e.is_done;
            }

            return false;
        });
    }

    return (
        <>
            <div className="flex flex-row items-center mb-4">
                <div className="flex-1">
                    <Typography variant="h5">
                        {isSidebar ? 'Tasks' : 'Todo Tasks'} ({todos.length})
                    </Typography>
                </div>
                <Menu open={isFilterOpen} handler={setIsFilterOpen}>
                    <MenuHandler>
                        <Button
                            variant="text"
                            size="sm"
                            className="flex items-center gap-3 text-base font-normal capitalize tracking-normal">
                            {_filterText(filter)}{' '}
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3.5 w-3.5 transition-transform ${
                                    isFilterOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </Button>
                    </MenuHandler>
                    <MenuList>
                        {Object.values(TodoFilterEnum).map((value) => {
                            return (
                                <MenuItem
                                    key={value}
                                    onClick={() => {
                                        setFilter(value);
                                    }}>
                                    {_filterText(value)}
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
            </div>
            {todos.length > 0 && (
                <Card>
                    <MtList>
                        {todos.map((todo) => {
                            return (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    isSidebar={isSidebar}
                                    fetch={_fetch}
                                />
                            );
                        })}
                    </MtList>
                </Card>
            )}
            {todos.length < 1 && (
                <div className="pt-1 text-sm text-gray-600">
                    <em>You don&apos;t have a task at the moment</em>
                </div>
            )}
        </>
    );
};

export default List;
