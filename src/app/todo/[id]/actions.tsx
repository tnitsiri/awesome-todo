'use client';

import classNames from 'classnames';
import Update from '../form';
import Remove from '../remove';
import moment, { Moment } from 'moment-timezone';
import { TodoModel } from '@/model/todo.model';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FormModeEnum } from '@/enum/form.enum';

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
    const pathname = usePathname();
    const router = useRouter();

    const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] =
        useState<boolean>(false);

    /**
     * ANCHOR Updated
     * @date 9/12/2024 - 4:14:27 PM
     */
    const _updated = () => {
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
            <Update
                mode={FormModeEnum.Update}
                todo={todo}
                onUpdated={_updated}
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
