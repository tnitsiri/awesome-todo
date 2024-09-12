'use client';

import CogoToast from '@successtar/cogo-toast';
import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import Update from '../form';
import Remove from '../remove';
import moment, { Moment } from 'moment-timezone';
import { TodoModel } from '@/model/todo.model';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FormModeEnum } from '@/enum/form.enum';
import { IconButton } from '@material-tailwind/react';
import { FiCheckCircle } from 'react-icons/fi';
import { axios } from '@/service/api.service';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { useAppDispatch } from '@/store/hook';
import { setTodo } from '@/store/slice/todo.slice';
import { v1 as uuidv1 } from 'uuid';

/**
 * ANCHOR Props
 * @date 9/12/2024 - 3:54:12 PM
 *
 * @typedef {Props}
 */
type Props = {
    todo: TodoModel;
};

/**
 * ANCHOR Actions
 * @date 9/12/2024 - 3:54:09 PM
 *
 * @param {Props} { todo }
 * @returns {*}
 */
const Actions = ({ todo }: Props) => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const [doing, setDoing] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(todo.is_done);
    const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] =
        useState<boolean>(false);

    /**
     * ANCHOR Done
     * @date 9/12/2024 - 8:06:22 AM
     *
     * @async
     * @returns {*}
     */
    const _done = async () => {
        if (doing) {
            return;
        }

        setDoing(true);
        setIsDone((isDone) => !isDone);

        try {
            await axios.put(`/todo/api/${todo.id}`, {
                isDone: !isDone,
            });

            _refetch();

            dispatch(
                setTodo({
                    fetchListToken: uuidv1(),
                }),
            );
        } catch {
            setIsDone((isDone) => !isDone);

            CogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
        } finally {
            setDoing(false);
        }
    };

    /**
     * ANCHOR Refetch
     * @date 9/12/2024 - 4:50:57 PM
     */
    const _refetch = () => {
        const now: Moment = moment();

        router.push(`/todo/${todo.id}?t=${now.unix()}`);
    };

    /**
     * ANCHOR Removed
     * @date 9/12/2024 - 4:07:50 PM
     */
    const _removed = () => {
        if (pathname != '/') {
            router.push('/');
        }
    };

    // due date
    const dueDate: Moment = moment(todo.due_date);

    let isDanger: boolean = false;

    if (!todo.is_done) {
        const now: Moment = moment();

        if (now.isAfter(dueDate)) {
            isDanger = true;
        }
    }

    useEffect(() => {
        setIsDone(todo.is_done);
    }, [todo]);

    return (
        <div className="flex flex-row items-center space-x-1 w-full mb-3 pb-1 border-b border-gray-300">
            <div
                className={classNames({
                    'flex-1 text-sm': true,
                    'text-gray-500': !isDanger,
                    'text-red-500': isDanger,
                })}
                style={{
                    fontSize: 12.5,
                }}>
                DUE DATE: {dueDate.format('DD/MM/YY HH:mm')}
            </div>
            <Tippy content={isDone ? 'Undone' : 'Done'} className="text-center">
                <IconButton
                    variant={isDone ? undefined : 'text'}
                    color={isDone ? 'green' : 'blue-gray'}
                    className="rounded-full"
                    data-action="ignore"
                    onClick={_done}>
                    <FiCheckCircle size={18} />
                </IconButton>
            </Tippy>
            <Update
                mode={FormModeEnum.Update}
                todo={todo}
                onUpdated={_refetch}
            />
            <Remove
                todo={todo}
                isRemoveConfirmOpen={isRemoveConfirmOpen}
                setIsRemoveConfirmOpen={setIsRemoveConfirmOpen}
                onRemoved={_removed}
            />
        </div>
    );
};

export default Actions;
