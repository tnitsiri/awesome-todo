'use client';

import CogoToast from '@successtar/cogo-toast';
import Datetime from 'react-datetime';
import moment, { Moment } from 'moment-timezone';
import { createElement, useState } from 'react';
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    MenuItem,
    Textarea,
    IconButton,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { FormModeEnum } from '@/enum/form.enum';
import { v1 as uuidv1 } from 'uuid';
import { axios } from '@/service/api.service';
import { useAppDispatch } from '@/store/hook';
import { setTodo } from '@/store/slice/todo.slice';
import { TodoModel } from '@/model/todo.model';
import { FiEdit } from 'react-icons/fi';

/**
 * ANCHOR Props
 * @date 9/11/2024 - 11:14:28 PM
 *
 * @typedef {Props}
 */
type Props = {
    mode: FormModeEnum;
    todo?: TodoModel;
    onOpen?: (isOpen: boolean) => void;
};

/**
 * ANCHOR Input
 * @date 9/10/2024 - 11:39:09 PM
 *
 * @typedef {Input}
 */
type Input = {
    title: string;
    description: string;
    dueDate: string;
};

/**
 * ANCHOR Form
 * @date 9/12/2024 - 6:26:41 AM
 *
 * @param {Props} { mode, todo, onOpen }
 * @returns {*}
 */
const Form = ({ mode, todo, onOpen }: Props) => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [doing, setDoing] = useState<boolean>(false);

    const [titleKey, setTitleKey] = useState<string>(uuidv1());
    const [dueDate, setDueDate] = useState<Moment | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = useForm<Input>();

    /**
     * ANCHOR Submit
     * @date 9/10/2024 - 11:54:39 PM
     *
     * @async
     * @param {Input} payload
     * @returns {*}
     */
    const _submit = async (payload: Input) => {
        // due date
        if (!dueDate) {
            return;
        }

        const now: Moment = moment();

        if (now.isAfter(dueDate)) {
            CogoToast.error('Due date must not be in the past.');

            return;
        }

        setDoing(true);

        try {
            // payload
            const title: string = payload.title.trim();
            const description: string = payload.description.trim();
            const due_date: string = dueDate!.toISOString();

            if (mode == FormModeEnum.Create) {
                await axios.post('/todo/api', {
                    title,
                    description,
                    due_date,
                });

                CogoToast.success('Task created successfully.');
            } else if (mode == FormModeEnum.Update) {
                await axios.patch(`/todo/api/${todo?.id}`, {
                    title,
                    description,
                    due_date,
                });

                CogoToast.success('Task information has been updated.');
            }

            _open();

            dispatch(
                setTodo({
                    fetchListToken: uuidv1(),
                }),
            );
        } catch {
            CogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
        } finally {
            setDoing(false);
        }
    };

    /**
     * ANCHOR Open
     * @date 9/10/2024 - 11:41:37 PM
     */
    const _open = () => {
        reset();

        setIsOpen((isOpen) => {
            if (mode == FormModeEnum.Update && todo) {
                if (!isOpen) {
                    setValue('title', todo.title);
                    setValue('description', todo.description);

                    const dueDate: Moment = moment(todo.due_date);

                    setValue('dueDate', dueDate.toISOString());

                    setDueDate(dueDate);
                }
            }

            if (onOpen) {
                onOpen(!isOpen);
            }

            return !isOpen;
        });

        setTimeout(() => {
            setTitleKey(uuidv1());
        });
    };

    return (
        <>
            {mode == FormModeEnum.Create && (
                <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500"
                    onClick={(e) => {
                        e.preventDefault();
                        _open();
                    }}>
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {createElement(PlusCircleIcon, {
                            className: 'w-[22px] h-[22px]',
                        })}{' '}
                        <span className="text-gray-900"> New Task</span>
                    </MenuItem>
                </Typography>
            )}
            {mode == FormModeEnum.Update && (
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="rounded-full"
                    data-action="ignore"
                    onClick={(e) => {
                        e.preventDefault();
                        _open();
                    }}>
                    <FiEdit size={18} />
                </IconButton>
            )}
            <Dialog
                size="xs"
                open={isOpen}
                handler={_open}
                className="bg-transparent shadow-none mb-32">
                <form onSubmit={handleSubmit(_submit)}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                {mode == FormModeEnum.Create && 'New Task'}
                                {mode == FormModeEnum.Update && 'Update Task'}
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray">
                                {mode == FormModeEnum.Create &&
                                    'Thing you need to be done.'}
                                {mode == FormModeEnum.Update &&
                                    'Edit task information.'}
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Title *
                            </Typography>
                            <Input
                                key={titleKey}
                                {...register('title', {
                                    required: true,
                                    maxLength: 300,
                                    validate: (v) => !!v.trim(),
                                })}
                                label="Task title"
                                size="lg"
                                maxLength={300}
                                autoFocus={true}
                                error={!!errors.title}
                            />
                            <Typography className="-mb-2" variant="h6">
                                Description *
                            </Typography>
                            <Textarea
                                {...register('description', {
                                    required: true,
                                    maxLength: 500,
                                    validate: (v) => !!v,
                                })}
                                label="Description about your task"
                                maxLength={500}
                                error={!!errors.description}
                            />
                            <Typography className="-mb-2" variant="h6">
                                Due date *
                            </Typography>
                            <Datetime
                                value={dueDate || undefined}
                                dateFormat="DD/MMM/YYYY"
                                timeFormat="HH:mm"
                                locale="en"
                                closeOnSelect={false}
                                renderInput={(props: any) => {
                                    return (
                                        <Input
                                            {...register('dueDate', {
                                                required: true,
                                                validate: (v) => !!v.trim(),
                                            })}
                                            {...props}
                                            label="Date and time"
                                            size="lg"
                                            className="cursor-pointer"
                                            readOnly={true}
                                            error={!!errors.dueDate}
                                        />
                                    );
                                }}
                                onChange={(value: Moment | string) => {
                                    const dateTime: Moment = moment(value);

                                    setValue('dueDate', dateTime.toISOString());
                                    trigger('dueDate');

                                    setDueDate(dateTime);
                                }}
                            />
                        </CardBody>
                        <CardFooter className="flex flex-row items-center justify-end space-x-2 pt-0">
                            <Button
                                variant="text"
                                color="gray"
                                tabIndex={2}
                                disabled={doing}
                                onClick={_open}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="gradient"
                                color="gray"
                                tabIndex={1}
                                loading={doing}>
                                {mode == FormModeEnum.Create && 'Create'}
                                {mode == FormModeEnum.Update && 'Update'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    );
};

export default Form;
