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
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { FormModeEnum } from '@/enum/form.enum';
import { v1 as uuidv1 } from 'uuid';
import { axios } from '@/service/api.service';

/**
 * ANCHOR Props
 * @date 9/11/2024 - 11:14:28 PM
 *
 * @typedef {Props}
 */
type Props = {
    mode: FormModeEnum;
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
 * @date 9/11/2024 - 11:15:57 PM
 *
 * @param {Props} { mode }
 * @returns {*}
 */
const Form = ({ mode }: Props) => {
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
                await axios.post('/todo/api/create', {
                    title,
                    description,
                    due_date,
                });

                CogoToast.success('Task created successfully.');
                _open();
            }
        } catch (e) {
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
            return !isOpen;
        });

        setTimeout(() => {
            setTitleKey(uuidv1());
        });
    };

    return (
        <>
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
            <Dialog
                size="xs"
                open={isOpen}
                handler={_open}
                className="bg-transparent shadow-none mb-24">
                <form onSubmit={handleSubmit(_submit)}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                New Task
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray">
                                Thing you need to be done.
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
