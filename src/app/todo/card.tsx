import $ from 'jquery';
import CogoToast from '@successtar/cogo-toast';
import Truncate from 'react-truncate';
import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import Update from './form';
import Remove from './remove';
import moment, { Moment } from 'moment-timezone';
import { TodoModel } from '@/model/todo.model';
import {
    ListItem,
    Typography,
    ListItemSuffix,
    IconButton,
} from '@material-tailwind/react';
import { useState, MouseEvent } from 'react';
import { axios } from '@/service/api.service';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { FormModeEnum } from '@/enum/form.enum';
import { useRouter } from 'next/navigation';
import { startProgress } from 'next-nprogress-bar';
import { GiCheckMark } from 'react-icons/gi';

/**
 * ANCHOR Props
 * @date 9/12/2024 - 4:50:55 AM
 *
 * @typedef {Props}
 */
type Props = {
    todo: TodoModel;
    isSidebar?: boolean;
    fetch: () => Promise<void>;
};

/**
 * ANCHOR Card
 * @date 9/12/2024 - 3:31:18 PM
 *
 * @param {Props} { todo, isSidebar, fetch }
 * @returns {*}
 */
const Card = ({ todo, isSidebar, fetch }: Props) => {
    const router = useRouter();

    const [doing, setDoing] = useState<boolean>(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);

    const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] =
        useState<boolean>(false);

    const [isDone, setIsDone] = useState<boolean>(todo.is_done);

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

            await fetch();
        } catch {
            setIsDone((isDone) => !isDone);

            CogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
        } finally {
            setDoing(false);
        }
    };

    /**
     * ANCHOR Update form open
     * @date 9/12/2024 - 6:30:43 AM
     *
     * @param {boolean} isOpen
     */
    const _updateFormOpen = (isOpen: boolean) => {
        setTimeout(() => {
            setIsUpdateFormOpen(isOpen);
        });
    };

    /**
     * ANCHOR View
     * @date 9/12/2024 - 9:19:29 AM
     *
     * @param {MouseEvent<HTMLDivElement>} e
     */
    const _view = (e: MouseEvent<HTMLDivElement>) => {
        if (
            $(e.target).closest('[data-action="ignore"]').length < 1 &&
            $(e.target).closest('[data-floating-ui-portal]').length < 1
        ) {
            startProgress();

            if (isSidebar) {
                const now: Moment = moment();

                router.push(`/todo/${todo.id}?t=${now.unix()}`);
            } else {
                router.push(`/todo/${todo.id}`);
            }
        }
    };

    // due date
    const dueDate: Moment = moment(todo.due_date);

    let isDanger: boolean = false;

    if (!isDone) {
        const now: Moment = moment();

        if (now.isAfter(dueDate)) {
            isDanger = true;
        }
    }

    return (
        <ListItem
            ripple={!isUpdateFormOpen && !isRemoveConfirmOpen}
            className="flex flex-row items-center py-2 group"
            onClick={_view}>
            {!isSidebar && (
                <Tippy
                    content={isDone ? 'Undone' : 'Done'}
                    className="text-center">
                    <IconButton
                        color={isDone ? 'green' : undefined}
                        variant={isDone ? undefined : 'outlined'}
                        size="sm"
                        className="rounded-full mr-4"
                        data-action="ignore"
                        onClick={_done}>
                        <GiCheckMark
                            size={14}
                            className={classNames({
                                'text-white': true,
                                ['opacity-0']: !isDone,
                            })}
                        />
                    </IconButton>
                </Tippy>
            )}
            <div className="flex-1 flex flex-col space-y-2">
                <div>
                    <Typography variant="h6" color="blue-gray">
                        <Truncate lines={2}>{todo.title}</Truncate>
                    </Typography>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal">
                        <Truncate lines={3}>{todo.description}</Truncate>
                    </Typography>
                </div>
                <div
                    className={classNames({
                        'text-sm': true,
                        'text-gray-500': !isDanger,
                        'text-red-500': isDanger,
                    })}
                    style={{
                        fontSize: 12.5,
                    }}>
                    DUE DATE: {dueDate.format('DD/MM/YY HH:mm')}
                </div>
            </div>
            {!isSidebar && (
                <ListItemSuffix className="flex flex-row items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300">
                    <Update
                        mode={FormModeEnum.Update}
                        todo={todo}
                        onOpen={_updateFormOpen}
                    />
                    <Remove
                        todo={todo}
                        isRemoveConfirmOpen={isRemoveConfirmOpen}
                        setIsRemoveConfirmOpen={setIsRemoveConfirmOpen}
                        onRemoved={fetch}
                    />
                </ListItemSuffix>
            )}
        </ListItem>
    );
};

export default Card;
0;
