import $ from 'jquery';
import CogoToast from '@successtar/cogo-toast';
import classNames from 'classnames';
import UpdateTodo from '../todo/form';
import { TodoModel } from '@/model/todo.model';
import {
    ListItem,
    Typography,
    ListItemSuffix,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from '@material-tailwind/react';
import { useState, MouseEvent } from 'react';
import { FiTrash2 } from 'react-icons/fi';
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
    fetch: () => Promise<void>;
};

/**
 * ANCHOR Card
 * @date 9/12/2024 - 5:12:56 AM
 *
 * @param {Props} { todo, fetch }
 * @returns {*}
 */
const Card = ({ todo, fetch }: Props) => {
    const router = useRouter();

    const [doing, setDoing] = useState<boolean>(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);

    const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] =
        useState<boolean>(false);
    const [removing, setRemoving] = useState<boolean>(false);

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
     * ANCHOR Remove
     * @date 9/12/2024 - 4:59:36 AM
     *
     * @async
     * @returns {*}
     */
    const _remove = async () => {
        if (removing) {
            return;
        }

        setRemoving(true);

        try {
            await axios.delete(`/todo/api/${todo.id}`);

            await fetch();

            CogoToast.success('Task has been successfully removed.');

            setIsRemoveConfirmOpen((e) => !e);
        } catch {
            CogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
        } finally {
            setRemoving(false);
        }
    };

    /**
     * ANCHOR Remove confirm open handler
     * @date 9/12/2024 - 4:58:29 AM
     */
    const _removeConfirmOpenHandler = () => {
        if (removing) {
            return;
        }

        setIsRemoveConfirmOpen((e) => !e);
    };

    /**
     * ANCHOR View
     * @date 9/12/2024 - 6:22:56 AM
     *
     * @param {MouseEvent<HTMLAnchorElement>} e
     */
    const _view = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (
            $(e.target).closest('[data-action="ignore"]').length < 1 &&
            $(e.target).closest('[data-floating-ui-portal]').length < 1
        ) {
            startProgress();

            router.push(`/todo/${todo.id}`);
        }
    };

    return (
        <a
            href={`/todo/${todo.id}`}
            data-prevent-nprogress={true}
            onClick={_view}>
            <ListItem ripple={!isUpdateFormOpen && !isRemoveConfirmOpen}>
                <IconButton
                    color={isDone ? 'green' : undefined}
                    variant={isDone ? undefined : 'outlined'}
                    size="sm"
                    className="rounded-full mr-3"
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
                <div className="flex-1">
                    <Typography variant="h6" color="blue-gray">
                        {todo.title}
                    </Typography>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal ">
                        {todo.description}
                    </Typography>
                </div>
                <ListItemSuffix>
                    <UpdateTodo
                        mode={FormModeEnum.Update}
                        todo={todo}
                        onOpen={_updateFormOpen}
                    />
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="rounded-full"
                        data-action="ignore"
                        onClick={_removeConfirmOpenHandler}>
                        <FiTrash2 size={18} />
                    </IconButton>
                    <Dialog
                        open={isRemoveConfirmOpen}
                        handler={_removeConfirmOpenHandler}
                        size="xs">
                        <DialogHeader className="flex flex-col items-start">
                            <Typography className="mb-1" variant="h4">
                                Remove Task
                            </Typography>
                        </DialogHeader>
                        <DialogBody>
                            <Typography className="-mt-7 " color="gray">
                                Are you sure you want to remove this task?
                            </Typography>
                        </DialogBody>
                        <DialogFooter className="space-x-2">
                            <Button
                                variant="text"
                                color="gray"
                                tabIndex={2}
                                disabled={removing}
                                onClick={_removeConfirmOpenHandler}>
                                Cancel
                            </Button>
                            <Button
                                variant="gradient"
                                color="gray"
                                tabIndex={1}
                                loading={removing}
                                onClick={_remove}>
                                Remove Task
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </ListItemSuffix>
            </ListItem>
        </a>
    );
};

export default Card;
0;
