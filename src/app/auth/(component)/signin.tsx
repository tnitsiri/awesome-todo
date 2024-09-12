'use client';

import CogoToast from '@successtar/cogo-toast';
import axios, { AxiosError } from 'axios';
import { createElement, useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    MenuItem,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { useAppDispatch } from '@/store/hook';
import { setAuth } from '@/store/slice/auth.slice';
import { UserCircleIcon } from '@heroicons/react/24/solid';

/**
 * ANCHOR Props
 * @date 9/11/2024 - 2:41:38 AM
 *
 * @typedef {Props}
 */
type Props = {
    openToken: string | null;
    signUp: () => void;
};

/**
 * ANCHOR Input
 * @date 9/10/2024 - 11:39:09 PM
 *
 * @typedef {Input}
 */
type Input = {
    username: string;
    password: string;
};

/**
 * ANCHOR Signin
 * @date 9/11/2024 - 3:02:03 AM
 *
 * @param {Props} { openToken, signUp }
 * @returns {*}
 */
const Signin = ({ openToken, signUp }: Props) => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [doing, setDoing] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
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
        setDoing(true);

        try {
            const username: string = payload.username.trim();
            const password: string = payload.password;

            const { data } = await axios.post('/auth/api/signin', {
                username,
                password,
            });

            dispatch(
                setAuth({
                    isAuthorized: true,
                    username: data.username,
                }),
            );
        } catch (e) {
            if (
                e instanceof AxiosError &&
                e.response &&
                e.response.status &&
                e.response.status == 401
            ) {
                CogoToast.error(
                    'Your information is incorrect, please check and try again.',
                );
            } else {
                CogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
            }
        } finally {
            setDoing(false);
        }
    };

    /**
     * ANCHOR Open
     * @date 9/10/2024 - 11:41:37 PM
     */
    const _open = () => {
        setIsOpen((isOpen) => {
            return !isOpen;
        });
    };

    /**
     * ANCHOR Sign up
     * @date 9/11/2024 - 2:48:11 AM
     */
    const _signUp = () => {
        _open();
        signUp();
    };

    useEffect(() => {
        if (openToken) {
            _open();
        }
    }, [openToken]);

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
                <MenuItem className="flex items-center gap-2 rounded-full">
                    {createElement(UserCircleIcon, {
                        className: 'w-[22px] h-[22px]',
                    })}{' '}
                    <span className="text-gray-900"> Sign In / Sign Up</span>
                </MenuItem>
            </Typography>
            <Dialog
                size="xs"
                open={isOpen}
                handler={_open}
                className="bg-transparent shadow-none">
                <form onSubmit={handleSubmit(_submit)}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Sign In
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray">
                                Enter your username and password.
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Your Username
                            </Typography>
                            <Input
                                {...register('username', {
                                    required: true,
                                    validate: (v) => !!v.trim(),
                                })}
                                label="Username"
                                size="lg"
                                autoFocus={true}
                                error={!!errors.username}
                            />
                            <Typography className="-mb-2" variant="h6">
                                Your Password
                            </Typography>
                            <Input
                                {...register('password', {
                                    required: true,
                                    validate: (v) => !!v,
                                })}
                                type="password"
                                label="Password"
                                size="lg"
                                error={!!errors.password}
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                type="submit"
                                size="lg"
                                variant="gradient"
                                fullWidth={true}
                                loading={doing}>
                                Sign In
                            </Button>
                            <Typography
                                variant="small"
                                className="mt-4 flex justify-center">
                                Don&apos;t have an account?
                                <Typography
                                    as="button"
                                    type="button"
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold"
                                    onClick={_signUp}>
                                    Sign up
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    );
};

export default Signin;
