'use client';

import CogoToast from '@successtar/cogo-toast';
import { TodoModel } from '@/model/todo.model';
import { axios } from '@/service/api.service';
import {
    Typography,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from '@material-tailwind/react';
import { useState, SetStateAction, Dispatch } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';

/**
 * ANCHOR
 * @date 9/12/2024 - 3:57:16 PM
 *
 * @typedef {Props}
 */
type Props = {
    todo: TodoModel;
    isRemoveConfirmOpen: boolean;
    setIsRemoveConfirmOpen: Dispatch<SetStateAction<boolean>>;
    onRemoved: () => void;
};

/**
 * ANCHOR Remove
 * @date 9/12/2024 - 4:05:25 PM
 *
 * @param {Props} {
    todo,
    isRemoveConfirmOpen,
    setIsRemoveConfirmOpen,
    onRemoved,
}
 * @returns {*}
 */
const Remove = ({
    todo,
    isRemoveConfirmOpen,
    setIsRemoveConfirmOpen,
    onRemoved,
}: Props) => {
    const [removing, setRemoving] = useState<boolean>(false);

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

            CogoToast.success('Task has been successfully removed.');

            setIsRemoveConfirmOpen((e) => !e);

            onRemoved();
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

    return (
        <>
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
        </>
    );
};

export default Remove;
